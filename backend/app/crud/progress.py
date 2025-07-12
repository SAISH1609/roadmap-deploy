from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List
from datetime import datetime
from app.models.models import UserProgress, TopicProgress, RoadmapTopic, Roadmap, UserActivity

def get_user_progress_summary(db: Session, user_id: int):
    """Get summary of user's progress across all roadmaps"""
    return db.query(
        UserProgress.roadmap_id,
        Roadmap.title.label('roadmap_title'),
        UserProgress.completed_topics,
        UserProgress.total_topics,
        UserProgress.progress_percentage
    ).join(Roadmap, UserProgress.roadmap_id == Roadmap.id).filter(
        UserProgress.user_id == user_id
    ).all()

def get_user_roadmap_progress(db: Session, user_id: int, roadmap_id: int):
    """Get detailed progress for a specific roadmap"""
    return db.query(UserProgress).filter(
        UserProgress.user_id == user_id,
        UserProgress.roadmap_id == roadmap_id
    ).first()

def create_user_progress(db: Session, user_id: int, roadmap_id: int):
    """Create initial progress record for a roadmap"""
    # Get total topics count
    total_topics = db.query(func.count(RoadmapTopic.id)).filter(
        RoadmapTopic.roadmap_id == roadmap_id
    ).scalar()
    
    user_progress = UserProgress(
        user_id=user_id,
        roadmap_id=roadmap_id,
        completed_topics=0,
        total_topics=total_topics,
        progress_percentage=0
    )
    
    db.add(user_progress)
    db.commit()
    db.refresh(user_progress)
    return user_progress

def update_topic_progress(db: Session, user_progress_id: int, topic_id: int, is_completed: bool):
    """Update progress for a specific topic"""
    topic_progress = db.query(TopicProgress).filter(
        TopicProgress.user_progress_id == user_progress_id,
        TopicProgress.topic_id == topic_id
    ).first()
    
    if topic_progress:
        topic_progress.is_completed = is_completed
        if is_completed:
            topic_progress.completed_at = datetime.utcnow()
        else:
            topic_progress.completed_at = None
    else:
        topic_progress = TopicProgress(
            user_progress_id=user_progress_id,
            topic_id=topic_id,
            is_completed=is_completed,
            completed_at=datetime.utcnow() if is_completed else None
        )
        db.add(topic_progress)
    
    db.commit()

def recalculate_progress(db: Session, user_progress_id: int):
    """Recalculate overall progress percentage"""
    user_progress = db.query(UserProgress).filter(UserProgress.id == user_progress_id).first()
    if not user_progress:
        return
    
    completed_count = db.query(func.count(TopicProgress.id)).filter(
        TopicProgress.user_progress_id == user_progress_id,
        TopicProgress.is_completed == True
    ).scalar()
    
    user_progress.completed_topics = completed_count
    if user_progress.total_topics > 0:
        user_progress.progress_percentage = int((completed_count / user_progress.total_topics) * 100)
    else:
        user_progress.progress_percentage = 0
    
    user_progress.last_updated = datetime.utcnow()
    db.commit()

def log_progress_activity(db: Session, user_id: int, roadmap_id: int, topic_id: int, is_completed: bool):
    """Log user activity for progress updates"""
    # Get topic and roadmap names for description
    topic = db.query(RoadmapTopic).filter(RoadmapTopic.id == topic_id).first()
    roadmap = db.query(Roadmap).filter(Roadmap.id == roadmap_id).first()
    
    if topic and roadmap:
        activity_type = "completed_topic" if is_completed else "started_topic"
        description = f"{'Completed' if is_completed else 'Started'} {topic.title} in {roadmap.title}"
        
        activity = UserActivity(
            user_id=user_id,
            activity_type=activity_type,
            description=description,
            metadata=f'{{"roadmap_id": {roadmap_id}, "topic_id": {topic_id}}}'
        )
        
        db.add(activity)
        db.commit()

def get_team_progress(db: Session, team_id: int):
    """Get progress summary for all team members on team roadmaps"""
    # This would return progress for all team members on team roadmaps
    # For now, returning a placeholder structure
    pass
