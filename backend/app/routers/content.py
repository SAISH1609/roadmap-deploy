from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.schemas import Guide, Video, GuideCreate, VideoCreate
from app.crud.content import (
    get_guides, get_videos, create_guide, create_video,
    get_guide_by_id, get_video_by_id, update_guide, update_video,
    delete_guide, delete_video
)

router = APIRouter(tags=["Content"])

@router.get("/guides", response_model=List[Guide])
def get_all_guides(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Get all active guides"""
    return get_guides(db, skip=skip, limit=limit)

@router.get("/videos", response_model=List[Video])
def get_all_videos(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Get all active videos"""
    return get_videos(db, skip=skip, limit=limit)

@router.get("/guides/{guide_id}", response_model=Guide)
def get_guide(guide_id: int, db: Session = Depends(get_db)):
    """Get a specific guide by ID"""
    guide = get_guide_by_id(db, guide_id)
    if not guide:
        raise HTTPException(status_code=404, detail="Guide not found")
    return guide

@router.get("/videos/{video_id}", response_model=Video)
def get_video(video_id: int, db: Session = Depends(get_db)):
    """Get a specific video by ID"""
    video = get_video_by_id(db, video_id)
    if not video:
        raise HTTPException(status_code=404, detail="Video not found")
    return video

@router.post("/guides", response_model=Guide)
def create_new_guide(guide: GuideCreate, db: Session = Depends(get_db)):
    """Create a new guide"""
    return create_guide(db, guide)

@router.post("/videos", response_model=Video)
def create_new_video(video: VideoCreate, db: Session = Depends(get_db)):
    """Create a new video"""
    return create_video(db, video)

@router.put("/guides/{guide_id}", response_model=Guide)
def update_existing_guide(
    guide_id: int,
    guide_update: GuideCreate,
    db: Session = Depends(get_db)
):
    """Update an existing guide"""
    updated_guide = update_guide(db, guide_id, guide_update)
    if not updated_guide:
        raise HTTPException(status_code=404, detail="Guide not found")
    return updated_guide

@router.put("/videos/{video_id}", response_model=Video)
def update_existing_video(
    video_id: int,
    video_update: VideoCreate,
    db: Session = Depends(get_db)
):
    """Update an existing video"""
    updated_video = update_video(db, video_id, video_update)
    if not updated_video:
        raise HTTPException(status_code=404, detail="Video not found")
    return updated_video

@router.delete("/guides/{guide_id}")
def delete_existing_guide(guide_id: int, db: Session = Depends(get_db)):
    """Delete a guide (soft delete)"""
    success = delete_guide(db, guide_id)
    if not success:
        raise HTTPException(status_code=404, detail="Guide not found")
    return {"message": "Guide deleted successfully"}

@router.delete("/videos/{video_id}")
def delete_existing_video(video_id: int, db: Session = Depends(get_db)):
    """Delete a video (soft delete)"""
    success = delete_video(db, video_id)
    if not success:
        raise HTTPException(status_code=404, detail="Video not found")
    return {"message": "Video deleted successfully"}
