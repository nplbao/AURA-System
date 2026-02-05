# AURA Backend - Alerts (clinic)
from typing import Annotated

from fastapi import APIRouter, Depends

from app.deps import require_roles
from app.models import UserRole, AlertResponse

router = APIRouter(prefix="/alerts", tags=["alerts"])


@router.get("", response_model=list[AlertResponse])
def list_alerts(
    user: Annotated[dict, Depends(require_roles([UserRole.clinic]))],
):
    # Mock alerts; can later be stored in alerts_db
    return [
        {"id": "1", "title": "High Risk Patient Detected", "message": "Patient John Doe - Analysis #1234 shows critical findings", "level": "high-risk", "created_at": "2 hours ago"},
        {"id": "2", "title": "Bulk Upload Completed", "message": "50 images successfully analyzed", "level": "medium-risk", "created_at": "1 day ago"},
    ]
