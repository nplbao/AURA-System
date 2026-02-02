# AURA Backend - Retinal image upload (user)
from datetime import datetime
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form

from app.database import images_db, results_db, users_db, gen_id
from app.deps import get_current_user, require_roles
from app.models import UserRole, RetinalImageResponse

router = APIRouter(prefix="/images", tags=["images"])


@router.post("/upload", response_model=list[RetinalImageResponse])
async def upload_images(
    user: Annotated[dict, Depends(require_roles([UserRole.user]))],
    image_type: str = Form("Fundus"),
    files: list[UploadFile] = File(...),
):
    if image_type not in ("Fundus", "OCT"):
        raise HTTPException(400, "image_type must be Fundus or OCT")
    credits = users_db.get(user["id"], {}).get("credits", 0)
    if len(files) > credits:
        raise HTTPException(402, f"Not enough credits. You have {credits}, need {len(files)}")
    out = []
    for f in files:
        if not f.content_type or not f.content_type.startswith("image/"):
            continue
        img_id = gen_id()
        images_db[img_id] = {
            "id": img_id,
            "user_id": user["id"],
            "filename": f.filename or "image.jpg",
            "upload_date": datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),
            "type": image_type,
            "status": "completed",
        }
        # Deduct credit
        users_db[user["id"]]["credits"] = credits - 1
        credits -= 1
        # Mock result
        res_id = gen_id()
        results_db[res_id] = {
            "id": res_id,
            "image_id": img_id,
            "user_id": user["id"],
            "risk_level": "low",
            "findings": ["No significant abnormalities"],
            "created_at": datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),
        }
        out.append(
            RetinalImageResponse(
                id=img_id,
                filename=images_db[img_id]["filename"],
                upload_date=images_db[img_id]["upload_date"],
                type=image_type,
                status="completed",
            )
        )
    return out


@router.get("", response_model=list[RetinalImageResponse])
def my_images(user: Annotated[dict, Depends(get_current_user)]):
    out = []
    for img in images_db.values():
        if img["user_id"] != user["id"]:
            continue
        out.append(
            RetinalImageResponse(
                id=img["id"],
                filename=img["filename"],
                upload_date=img["upload_date"],
                type=img["type"],
                status=img["status"],
            )
        )
    out.sort(key=lambda x: x.upload_date, reverse=True)
    return out
