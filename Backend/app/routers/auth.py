# AURA Backend - Auth routes
from fastapi import APIRouter, Depends, HTTPException, status
from typing import Annotated

from app.database import users_db, gen_id, init_seed_data
from app.auth_utils import verify_password, get_password_hash, create_access_token, get_user_by_email
from app.deps import get_current_user
from app.models import LoginRequest, RegisterRequest, AuthResponse, UserResponse

router = APIRouter(prefix="/auth", tags=["auth"])


def user_to_response(u: dict) -> UserResponse:
    return UserResponse(
        id=u["id"],
        email=u["email"],
        name=u["name"],
        role=u["role"],
        avatar=u.get("avatar"),
    )


@router.post("/login", response_model=AuthResponse)
def login(req: LoginRequest):
    init_seed_data()
    user = get_user_by_email(req.email)
    if not user or not verify_password(req.password, user.get("hashed_password", "")):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    if user.get("status") == "disabled":
        raise HTTPException(status_code=403, detail="Account is disabled")
    token = create_access_token(data={"sub": user["id"], "role": user["role"]})
    return AuthResponse(user=user_to_response(user), token=token)


@router.post("/register", response_model=AuthResponse)
def register(req: RegisterRequest):
    init_seed_data()
    if get_user_by_email(req.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    if req.role not in ("user", "doctor", "clinic"):
        raise HTTPException(status_code=400, detail="Invalid role for registration")
    uid = gen_id()
    users_db[uid] = {
        "id": uid,
        "email": req.email,
        "hashed_password": get_password_hash(req.password),
        "name": req.name,
        "role": req.role,
        "status": "active",
        "avatar": None,
        "credits": 0,
        "phone": None,
        "date_of_birth": None,
        "medical_history": None,
        "allergies": None,
        "clinic_status": "pending" if req.role == "clinic" else None,
    }
    user = users_db[uid]
    token = create_access_token(data={"sub": uid, "role": user["role"]})
    return AuthResponse(user=user_to_response(user), token=token)


@router.get("/me", response_model=UserResponse)
def me(user: Annotated[dict, Depends(get_current_user)]):
    return user_to_response(user)
