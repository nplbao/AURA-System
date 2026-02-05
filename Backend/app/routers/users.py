# AURA Backend - User management (admin + profile)
from typing import Annotated, Optional

from fastapi import APIRouter, Depends, HTTPException, Query

from app.database import users_db
from app.deps import get_current_user, require_roles
from app.models import (
    UserRole,
    UserListResponse,
    UserUpdate,
    UserStatusUpdate,
    UserResponse,
    UserStatusActionResponse,
)

router = APIRouter(prefix="/users", tags=["users"])


def user_to_response(u: dict) -> UserResponse:
    return UserResponse(
        id=u["id"],
        email=u["email"],
        name=u["name"],
        role=u["role"],
        avatar=u.get("avatar"),
    )


@router.get("/me", response_model=UserResponse)
def get_me(user: Annotated[dict, Depends(get_current_user)]):
    return user_to_response(user)


@router.patch("/me", response_model=UserResponse)
def update_me(user: Annotated[dict, Depends(get_current_user)], body: UserUpdate):
    u = users_db.get(user["id"])
    if not u:
        raise HTTPException(404, "User not found")
    if body.name is not None:
        u["name"] = body.name
    if body.email is not None:
        u["email"] = body.email
    if body.phone is not None:
        u["phone"] = body.phone
    if body.date_of_birth is not None:
        u["date_of_birth"] = body.date_of_birth
    if body.medical_history is not None:
        u["medical_history"] = body.medical_history
    if body.allergies is not None:
        u["allergies"] = body.allergies
    return user_to_response(u)


# Admin: list users
@router.get("", response_model=list[UserListResponse])
def list_users(
    user: Annotated[dict, Depends(require_roles([UserRole.admin]))],
    search: Optional[str] = Query(None),
    role: Optional[UserRole] = Query(None),
    status: Optional[str] = Query(None),
):
    out = []
    for u in users_db.values():
        r = u.get("role")
        s = u.get("status", "active")
        if search and search.lower() not in (u.get("name", "") + u.get("email", "")).lower():
            continue
        if role and r != role:
            continue
        if status and s != status:
            continue
        out.append(
            UserListResponse(
                id=u["id"],
                name=u["name"],
                email=u["email"],
                role=r,
                status=s,
            )
        )
    return out


# Admin: toggle user status
@router.patch("/{user_id}/status", response_model=UserStatusActionResponse)
def update_user_status(
    user_id: str,
    body: UserStatusUpdate,
    admin: Annotated[dict, Depends(require_roles([UserRole.admin]))],
):
    u = users_db.get(user_id)
    if not u:
        raise HTTPException(404, "User not found")
    u["status"] = body.status
    return {"id": user_id, "status": body.status}
