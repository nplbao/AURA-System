# AURA Backend - Service packages (public list + admin CRUD + purchase)
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException

from app.database import packages_db, payments_db, users_db, gen_id, init_seed_data
from app.deps import get_current_user, require_roles
from app.models import (
    UserRole,
    ServicePackageResponse,
    ServicePackageAdminResponse,
    ServicePackageCreate,
    ServicePackageUpdate,
    PaymentHistoryResponse,
    PurchaseRequest,
    PackagePurchaseResponse,
    CreditsResponse,
)

router = APIRouter(prefix="/packages", tags=["packages"])


def pkg_to_response(p: dict, include_active: bool = False) -> dict:
    out = {
        "id": p["id"],
        "name": p["name"],
        "price": p["price"],
        "image_credits": p["image_credits"],
        "duration": p["duration"],
    }
    if include_active:
        out["active"] = p.get("active", True)
    return out


@router.get("", response_model=list[ServicePackageResponse])
def list_packages(active_only: bool = True):
    init_seed_data()
    out = []
    for p in packages_db.values():
        if active_only and not p.get("active", True):
            continue
        out.append(ServicePackageResponse(**pkg_to_response(p)))
    return out


# Admin: list all packages (including inactive)
@router.get("/admin", response_model=list[ServicePackageAdminResponse])
def admin_list_packages(
    user: Annotated[dict, Depends(require_roles([UserRole.admin]))],
):
    init_seed_data()
    return [pkg_to_response(p, include_active=True) for p in packages_db.values()]


# Admin: create package
@router.post("", response_model=ServicePackageResponse)
def create_package(
    body: ServicePackageCreate,
    user: Annotated[dict, Depends(require_roles([UserRole.admin]))],
):
    init_seed_data()
    pid = gen_id()
    packages_db[pid] = {
        "id": pid,
        "name": body.name,
        "price": body.price,
        "image_credits": body.image_credits,
        "duration": body.duration,
        "active": True,
    }
    return ServicePackageResponse(**pkg_to_response(packages_db[pid]))


# Admin: update package
@router.patch("/{package_id}", response_model=ServicePackageResponse)
def update_package(
    package_id: str,
    body: ServicePackageUpdate,
    user: Annotated[dict, Depends(require_roles([UserRole.admin]))],
):
    p = packages_db.get(package_id)
    if not p:
        raise HTTPException(404, "Package not found")
    if body.name is not None:
        p["name"] = body.name
    if body.price is not None:
        p["price"] = body.price
    if body.image_credits is not None:
        p["image_credits"] = body.image_credits
    if body.duration is not None:
        p["duration"] = body.duration
    if body.active is not None:
        p["active"] = body.active
    return ServicePackageResponse(**pkg_to_response(p))


# User/Clinic: purchase package
@router.post("/purchase", response_model=PackagePurchaseResponse)
def purchase_package(
    body: PurchaseRequest,
    user: Annotated[dict, Depends(require_roles([UserRole.user, UserRole.clinic]))],
):
    init_seed_data()
    p = packages_db.get(body.package_id)
    if not p or not p.get("active", True):
        raise HTTPException(404, "Package not found")
    from datetime import datetime
    pay_id = gen_id()
    pkg_name = p["name"]
    amount = p["price"]
    users_db[user["id"]]["credits"] = users_db[user["id"]].get("credits", 0) + p["image_credits"]
    payments_db[pay_id] = {
        "id": pay_id,
        "user_id": user["id"],
        "package_id": body.package_id,
        "amount": amount,
        "date": datetime.utcnow().strftime("%Y-%m-%d"),
        "package_name": pkg_name,
        "status": "completed",
    }
    return {
        "id": pay_id,
        "amount": amount,
        "date": payments_db[pay_id]["date"],
        "package_name": pkg_name,
        "status": "completed",
        "credits_added": p["image_credits"],
    }


# User: payment history
@router.get("/payments", response_model=list[PaymentHistoryResponse])
def my_payments(user: Annotated[dict, Depends(require_roles([UserRole.user, UserRole.clinic]))]):
    out = []
    for pay in payments_db.values():
        if pay["user_id"] != user["id"]:
            continue
        out.append(
            PaymentHistoryResponse(
                id=pay["id"],
                amount=pay["amount"],
                date=pay["date"],
                package_name=pay["package_name"],
                status=pay["status"],
            )
        )
    out.sort(key=lambda x: x.date, reverse=True)
    return out


# User: remaining credits
@router.get("/credits", response_model=CreditsResponse)
def my_credits(user: Annotated[dict, Depends(get_current_user)]):
    return {"credits": users_db.get(user["id"], {}).get("credits", 0)}
