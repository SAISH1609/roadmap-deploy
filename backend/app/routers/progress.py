from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.schemas.schemas import UserProgress, ProgressSummary, TopicProgressBase
from app.routers.auth import get_current_user
from app.models.models import User
from app.crud import progress as crud_progress

router = APIRouter()

@router.get("/", response_model=List[ProgressSummary])
def get_user_progress(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's progress on all roadmaps"""
    return crud_progress.get_user_progress_summary(db=db, user_id=current_user.id)

@router.get("/{roadmap_id}", response_model=UserProgress)
def get_roadmap_progress(
    roadmap_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's detailed progress for a specific roadmap"""
    progress = crud_progress.get_user_roadmap_progress(db=db, user_id=current_user.id, roadmap_id=roadmap_id)
    if not progress:
        # Create initial progress if doesn't exist
        progress = crud_progress.create_user_progress(db=db, user_id=current_user.id, roadmap_id=roadmap_id)
    return progress

@router.post("/{roadmap_id}/topics/{topic_id}")
def update_topic_progress(
    roadmap_id: int,
    topic_id: int,
    topic_progress: TopicProgressBase,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update progress for a specific topic"""
    # Get or create user progress for roadmap
    user_progress = crud_progress.get_user_roadmap_progress(db=db, user_id=current_user.id, roadmap_id=roadmap_id)
    if not user_progress:
        user_progress = crud_progress.create_user_progress(db=db, user_id=current_user.id, roadmap_id=roadmap_id)
    
    # Update topic progress
    crud_progress.update_topic_progress(
        db=db, 
        user_progress_id=user_progress.id, 
        topic_id=topic_id, 
        is_completed=topic_progress.is_completed
    )
    
    # Update overall progress
    crud_progress.recalculate_progress(db=db, user_progress_id=user_progress.id)
    
    # Log activity
    crud_progress.log_progress_activity(
        db=db, 
        user_id=current_user.id, 
        roadmap_id=roadmap_id, 
        topic_id=topic_id, 
        is_completed=topic_progress.is_completed
    )
    
    return {"message": "Progress updated successfully"}
