# AURA Backend - Diagnostic results (user) & history
from typing import Annotated, Optional

from fastapi import APIRouter, Depends, HTTPException, Query

from app.database import results_db, images_db
from app.deps import get_current_user, require_roles
from app.models import UserRole, DiagnosticResultResponse

router = APIRouter(prefix="/results", tags=["results"])


@router.get("", response_model=list[dict])
def my_results(
    user: Annotated[dict, Depends(require_roles([UserRole.user]))],
    risk_level: Optional[str] = Query(None),
    image_type: Optional[str] = Query(None),
):
    out = []
    for r in results_db.values():
        if r["user_id"] != user["id"]:
            continue
        img = images_db.get(r["image_id"], {})
        if risk_level and r.get("risk_level") != risk_level:
            continue
        if image_type and img.get("type") != image_type:
            continue
        out.append({
            "id": r["id"],
            "image_id": r["image_id"],
            "image_name": img.get("filename", "image"),
            "upload_date": img.get("upload_date", "")[:10],
            "risk_level": r.get("risk_level", "low"),
            "status": "completed",
            "findings": r.get("findings", []),
        })
    out.sort(key=lambda x: x["upload_date"], reverse=True)
    return out


@router.get("/history", response_model=list[dict])
def my_history(
    user: Annotated[dict, Depends(require_roles([UserRole.user]))],
    type_filter: Optional[str] = Query(None, alias="type"),
    risk: Optional[str] = Query(None),
):
    out = []
    for r in results_db.values():
        if r["user_id"] != user["id"]:
            continue
        img = images_db.get(r["image_id"], {})
        if type_filter and img.get("type") != type_filter:
            continue
        if risk and r.get("risk_level") != risk:
            continue
        out.append({
            "id": r["id"],
            "date": img.get("upload_date", "")[:10],
            "type": img.get("type", "Fundus"),
            "risk": r.get("risk_level", "low"),
            "status": "completed",
        })
    out.sort(key=lambda x: x["date"], reverse=True)
    return out


@router.get("/{result_id}", response_model=dict)
def get_result(
    result_id: str,
    user: Annotated[dict, Depends(get_current_user)],
):
    r = results_db.get(result_id)
    if not r or r["user_id"] != user["id"]:
        raise HTTPException(404, "Result not found")
    img = images_db.get(r["image_id"], {})
    return {
        "id": r["id"],
        "image_id": r["image_id"],
        "image_name": img.get("filename"),
        "upload_date": img.get("upload_date", "")[:10],
        "risk_level": r.get("risk_level", "low"),
        "findings": r.get("findings", []),
        "created_at": r.get("created_at"),
        "doctor_notes": r.get("doctor_notes"),
        "doctor_validated": r.get("doctor_validated"),
    }
