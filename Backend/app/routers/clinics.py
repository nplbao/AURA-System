# AURA Backend - Clinic management (admin)
from typing import Annotated, Optional

from fastapi import APIRouter, Depends, HTTPException, Query

from app.database import users_db
from app.deps import require_roles
from app.models import UserRole, ClinicStatus, ClinicResponse, ClinicActionResponse

router = APIRouter(prefix="/clinics", tags=["clinics"])


@router.get("", response_model=list[ClinicResponse])
def list_clinics(
    user: Annotated[dict, Depends(require_roles([UserRole.admin]))],
    search: Optional[str] = Query(None),
    status: Optional[ClinicStatus] = Query(None),
):
    doctors_count = len([u for u in users_db.values() if u.get("role") == UserRole.doctor])
    user_count = len([u for u in users_db.values() if u.get("role") == UserRole.user])
    out = []
    for u in users_db.values():
        if u.get("role") != UserRole.clinic:
            continue
        st = u.get("clinic_status", "pending")
        if status and st != status:
            continue
        if search and search.lower() not in (u.get("name", "") + u.get("email", "")).lower():
            continue
        out.append({
            "id": u["id"],
            "name": u["name"],
            "email": u["email"],
            "doctors": doctors_count,
            "patients": user_count,
            "status": st,
        })
    return out


@router.patch("/{clinic_id}/approve", response_model=ClinicActionResponse)
def approve_clinic(
    clinic_id: str,
    user: Annotated[dict, Depends(require_roles([UserRole.admin]))],
):
    u = users_db.get(clinic_id)
    if not u or u.get("role") != UserRole.clinic:
        raise HTTPException(404, "Clinic not found")
    u["clinic_status"] = "approved"
    return {"id": clinic_id, "status": "approved"}


@router.patch("/{clinic_id}/suspend", response_model=ClinicActionResponse)
def suspend_clinic(
    clinic_id: str,
    user: Annotated[dict, Depends(require_roles([UserRole.admin]))],
):
    u = users_db.get(clinic_id)
    if not u or u.get("role") != UserRole.clinic:
        raise HTTPException(404, "Clinic not found")
    u["clinic_status"] = "suspended"
    return {"id": clinic_id, "status": "suspended"}
