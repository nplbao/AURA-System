# AURA Backend - Dashboard stats per role
from typing import Annotated

from fastapi import APIRouter, Depends

from app.database import users_db, images_db, results_db, payments_db
from app.deps import get_current_user
from app.models import (
    UserRole,
    DashboardUserStatsResponse,
    DashboardClinicStatsResponse,
    DashboardAdminStatsResponse,
    DashboardDoctorStatsResponse,
)

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get(
    "/stats",
    response_model=(
        DashboardUserStatsResponse
        | DashboardClinicStatsResponse
        | DashboardAdminStatsResponse
        | DashboardDoctorStatsResponse
    ),
)
def dashboard_stats(user: Annotated[dict, Depends(get_current_user)]):
    role = user.get("role")
    uid = user["id"]

    if role == UserRole.user:
        my_images = [i for i in images_db.values() if i.get("user_id") == uid]
        my_results = [r for r in results_db.values() if r.get("user_id") == uid]
        high_risk = sum(1 for r in my_results if r.get("risk_level") in ("high", "critical"))
        pending = sum(1 for i in my_images if i.get("status") in ("pending", "processing"))
        credits = users_db.get(uid, {}).get("credits", 0)
        recent = []
        for r in list(my_results)[:5]:
            img = images_db.get(r.get("image_id"), {})
            recent.append({
                "id": r["id"],
                "image_name": img.get("filename", "image"),
                "upload_date": img.get("upload_date", "")[:10],
                "risk_level": r.get("risk_level", "low"),
            })
        return {
            "role": "user",
            "remaining_credits": credits,
            "total_analyses": len(my_results),
            "high_risk_cases": high_risk,
            "pending_results": pending,
            "recent_results": recent,
        }

    if role == UserRole.clinic:
        clinic_users = [u for u in users_db.values() if u.get("role") == UserRole.user]
        doctors = [u for u in users_db.values() if u.get("role") == UserRole.doctor]
        all_results = list(results_db.values())
        high_risk = sum(1 for r in all_results if r.get("risk_level") in ("high", "critical"))
        return {
            "role": "clinic",
            "total_doctors": len(doctors),
            "total_patients": len(clinic_users),
            "images_analyzed": len(images_db),
            "remaining_credits": 250,
            "high_risk_patients": high_risk,
            "recent_alerts": [
                {"id": "1", "title": "High Risk Patient Detected", "message": "Patient - Analysis shows critical findings", "level": "high-risk", "created_at": "2 hours ago"},
                {"id": "2", "title": "Bulk Upload Completed", "message": "50 images successfully analyzed", "level": "medium-risk", "created_at": "1 day ago"},
            ],
        }

    if role == UserRole.admin:
        total_users = len([u for u in users_db.values() if u.get("role") == UserRole.user])
        total_doctors = len([u for u in users_db.values() if u.get("role") == UserRole.doctor])
        total_clinics = len([u for u in users_db.values() if u.get("role") == UserRole.clinic])
        revenue = sum(p.get("amount", 0) for p in payments_db.values())
        return {
            "role": "admin",
            "total_users": total_users,
            "total_doctors": total_doctors,
            "total_clinics": total_clinics,
            "total_images": len(images_db),
            "revenue": revenue,
            "ai_accuracy": 94.5,
            "risk_distribution": {"low": 65, "medium": 22, "high": 10, "critical": 3},
            "recent_activity": [
                {"message": "New clinic registered", "time": "1 hour ago"},
                {"message": "1000 images analyzed today", "time": "3 hours ago"},
            ],
        }

    # doctor
    all_results = list(results_db.values())
    high_risk = sum(1 for r in all_results if r.get("risk_level") in ("high", "critical"))
    return {
        "role": "doctor",
        "total_patients": len(users_db),
        "images_analyzed": len(images_db),
        "high_risk_cases": high_risk,
    }
