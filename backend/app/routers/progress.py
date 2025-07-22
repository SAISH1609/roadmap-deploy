from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.schemas.schemas import UserProgress, ProgressSummary, TopicProgressBase
from app.routers.auth import get_current_user
from app.models.models import User
from app.crud import progress as crud_progress
from app.crud import activity as crud_activity
from app.crud.teams import get_team_members

router = APIRouter()

@router.get("/", response_model=List[ProgressSummary])
def get_user_progress(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's progress on all roadmaps"""
    return crud_progress.get_user_progress_summary(db=db, user_id=current_user.id)

@router.get("/{user_id}/summary", response_model=List[ProgressSummary])
def get_user_progress_summary_for_user(
    user_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get a specific user's progress summary across all roadmaps"""
    # Optional: Add authorization logic here to ensure the current_user has permission
    # to view the progress of the user with user_id. For example, if they are in the same team.
    return crud_progress.get_user_progress_summary(db=db, user_id=user_id)


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
    try:
        crud_activity.update_topic_progress(
            db=db,
            user_id=current_user.id,
            topic_id=topic_id,
            status=topic_progress.status
        )
        
        return {
            "message": "Topic progress updated successfully",
            "topic_id": topic_id,
            "status": topic_progress.status
        }
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
