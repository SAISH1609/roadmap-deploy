from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.schemas import (
    User, ActivityDashboard, TopicProgressBase, 
    TopicProgress as TopicProgressSchema
)
from app.routers.auth import get_current_user
from app.crud import activity as crud_activity

router = APIRouter()

@router.get("/dashboard", response_model=ActivityDashboard)
def get_activity_dashboard(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return crud_activity.get_activity_dashboard(db, current_user.id)

@router.post("/topic-progress", response_model=dict)
def update_topic_progress(
    progress_data: TopicProgressBase,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        topic_progress = crud_activity.update_topic_progress(
            db=db,
            user_id=current_user.id,
            topic_id=progress_data.topic_id,
            status=progress_data.status
        )
        
        if not topic_progress:
            raise HTTPException(status_code=404, detail="Topic not found")
        
        return {
            "message": "Topic progress updated successfully",
            "topic_id": progress_data.topic_id,
            "status": progress_data.status
        }
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/stats")
def get_activity_stats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return crud_activity.get_activity_stats(db, current_user.id)

@router.get("/continue-following")
def get_continue_following(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return crud_activity.get_continue_following(db, current_user.id)

@router.get("/learning-activity")
def get_learning_activity(
    limit: int = 20,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return crud_activity.get_learning_activity(db, current_user.id, limit)

@router.get("/today-completed-count", response_model=int)
def get_today_completed_count(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return crud_activity.get_completed_today_count(db, current_user.id)
