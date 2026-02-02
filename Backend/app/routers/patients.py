# AURA Backend - Patients list (doctor / clinic)
from typing import Annotated, Optional

from fastapi import APIRouter, Depends, Query

from app.database import users_db, results_db
from app.deps import require_roles
from app.models import UserRole

router = APIRouter(prefix="/patients", tags=["patients"])


@router.get("", response_model=list[dict])
def list_patients(
    user: Annotated[dict, Depends(require_roles([UserRole.doctor, UserRole.clinic]))],
    search: Optional[str] = Query(None),
    risk_level: Optional[str] = Query(None),
):
    # Patients = users with role=user who have at least one result
    patient_ids = set()
    last_analysis = {}
    risk_by_user = {}
    for r in results_db.values():
        uid = r.get("user_id")
        patient_ids.add(uid)
        date = (r.get("created_at") or "")[:10]
        if not last_analysis.get(uid) or date > last_analysis[uid]:
            last_analysis[uid] = date
        risk_by_user[uid] = r.get("risk_level", "low")

    out = []
    for uid in patient_ids:
        u = users_db.get(uid)
        if not u or u.get("role") != UserRole.user:
            continue
        risk = risk_by_user.get(uid, "low")
        if risk_level and risk != risk_level:
            continue
        if search and search.lower() not in (u.get("name", "") + u.get("email", "")).lower():
            continue
        out.append({
            "id": u["id"],
            "name": u["name"],
            "email": u["email"],
            "risk_level": risk,
            "last_analysis": last_analysis.get(uid),
        })
    out.sort(key=lambda x: (x["last_analysis"] or ""), reverse=True)
    return out
