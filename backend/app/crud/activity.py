from sqlalchemy.orm import Session
from sqlalchemy import func, and_, desc
from datetime import datetime, timedelta
from typing import List, Optional

from app.models.models import (
    User, UserProgress, TopicProgress, UserActivity, 
    Roadmap, RoadmapTopic
)
from app.schemas.schemas import (
    ActivityStats, RoadmapProgress, TopicActivityItem, 
    ActivityDashboard
)

def update_user_progress(db: Session, user_id: int, roadmap_id: int):
    total_topics = db.query(RoadmapTopic).filter(
        RoadmapTopic.roadmap_id == roadmap_id
    ).count()
    
    # Get or create user progress record
    user_progress = db.query(UserProgress).filter(
        and_(
            UserProgress.user_id == user_id,
            UserProgress.roadmap_id == roadmap_id
        )
    ).first()
    
    if not user_progress:
        user_progress = UserProgress(
            user_id=user_id,
            roadmap_id=roadmap_id,
            total_topics=total_topics
        )
        db.add(user_progress)
        db.commit()
        db.refresh(user_progress)
    
    completed_topics = db.query(TopicProgress).filter(
        and_(
            TopicProgress.user_progress_id == user_progress.id,
            TopicProgress.status == 'done'
        )
    ).count()
    
    progress_percentage = int((completed_topics / total_topics) * 100) if total_topics > 0 else 0
    
    # Update user progress
    user_progress.completed_topics = completed_topics
    user_progress.total_topics = total_topics
    user_progress.progress_percentage = progress_percentage
    user_progress.last_updated = datetime.utcnow()
    
    db.commit()
    db.refresh(user_progress)
    return user_progress

def update_topic_progress(db: Session, user_id: int, topic_id: int, status: str):
    if status not in ['done', 'in_progress', 'skip', 'not_started']:
        raise ValueError("Invalid status. Must be one of: done, in_progress, skip, not_started")
    
    # Get topic and roadmap info
    topic = db.query(RoadmapTopic).filter(RoadmapTopic.id == topic_id).first()
    if not topic:
        return None
    
    # Get or create user progress for this roadmap
    user_progress = db.query(UserProgress).filter(
        and_(
            UserProgress.user_id == user_id,
            UserProgress.roadmap_id == topic.roadmap_id
        )
    ).first()
    
    if not user_progress:
        user_progress = update_user_progress(db, user_id, topic.roadmap_id)
    
    # Get or create topic progress
    topic_progress = db.query(TopicProgress).filter(
        and_(
            TopicProgress.user_progress_id == user_progress.id,
            TopicProgress.topic_id == topic_id
        )
    ).first()
    
    if not topic_progress:
        topic_progress = TopicProgress(
            user_progress_id=user_progress.id,
            topic_id=topic_id,
            status=status,
            completed_at=datetime.utcnow() if status == 'done' else None
        )
        db.add(topic_progress)
    else:
        topic_progress.status = status
        topic_progress.completed_at = datetime.utcnow() if status == 'done' else None
    
    db.commit()
    
    update_user_streak(db, user_id)
    
    activity_type = f"{status}_topic"
    log_user_activity(db, user_id, activity_type, f"Topic: {topic.title}", None)
    
    # Recalculate roadmap progress
    update_user_progress(db, user_id, topic.roadmap_id)
    
    return topic_progress

def update_user_streak(db: Session, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return
    
    today = datetime.utcnow().date()
    
    if user.last_activity_date:
        last_activity = user.last_activity_date.date()
        
        if last_activity == today:
            return
        elif last_activity == today - timedelta(days=1):
            user.current_streak += 1
        else:
            # Gap in activity, reset streak
            user.current_streak = 1
    else:
        # First activity
        user.current_streak = 1
    
    user.last_activity_date = datetime.utcnow()
    db.commit()

def log_user_activity(db: Session, user_id: int, activity_type: str, description: str, team_id: Optional[int] = None):
    activity = UserActivity(
        user_id=user_id,
        team_id=team_id,
        activity_type=activity_type,
        description=description,
        activity_metadata=None
    )
    db.add(activity)
    db.commit()

def get_activity_stats(db: Session, user_id: int) -> ActivityStats:
    # Total topics completed across all roadmaps
    total_completed = db.query(TopicProgress).join(UserProgress).filter(
        and_(
            UserProgress.user_id == user_id,
            TopicProgress.status == 'done'
        )
    ).count()
    
    # Currently learning fetches all roadmap with progress between 0-100
    currently_learning = db.query(UserProgress).filter(
        and_(
            UserProgress.user_id == user_id,
            UserProgress.progress_percentage > 0,
            UserProgress.progress_percentage < 100
        )
    ).count()
    
    # Get user's current streak
    user = db.query(User).filter(User.id == user_id).first()
    visit_streak = user.current_streak if user and user.current_streak else 0
    
    return ActivityStats(
        topics_completed=total_completed,
        currently_learning=currently_learning,
        visit_streak=visit_streak
    )

def get_continue_following(db: Session, user_id: int) -> List[RoadmapProgress]:
    user_progress_list = db.query(UserProgress).join(Roadmap).filter(
        and_(
            UserProgress.user_id == user_id,
            UserProgress.progress_percentage > 0,
            UserProgress.progress_percentage < 100
        )
    ).order_by(desc(UserProgress.last_updated)).all()

    # --- Deduplication Logic ---
    # Use a dictionary to store the most recent progress for each roadmap title
    latest_progress = {}
    for up in user_progress_list:
        # If we haven't seen this title, or if the current one is more recent, update it
        if up.roadmap.title not in latest_progress or up.last_updated > latest_progress[up.roadmap.title].last_updated:
            latest_progress[up.roadmap.title] = up

    # Convert the dictionary values back to a list and limit to 10
    deduplicated_list = list(latest_progress.values())[:10]
    
    result = []
    for up in deduplicated_list:
        result.append(RoadmapProgress(
            roadmap_id=up.roadmap_id,
            roadmap_title=up.roadmap.title,
            roadmap_slug=up.roadmap.slug,
            progress_percentage=up.progress_percentage,
            completed_topics=up.completed_topics,
            total_topics=up.total_topics,
            last_updated=up.last_updated
        ))
    
    return result

def get_learning_activity(db: Session, user_id: int, limit: int = 20) -> List[TopicActivityItem]:
    activities = db.query(UserActivity).filter(
        and_(
            UserActivity.user_id == user_id,
            UserActivity.activity_type.in_(['done_topic', 'in_progress_topic', 'skip_topic'])
        )
    ).order_by(desc(UserActivity.created_at)).limit(limit).all()
    
    result = []
    for activity in activities:
        # Extract topic info from activity
        action = activity.activity_type.replace('_topic', '')
        
        result.append(TopicActivityItem(
            topic_id=0,  
            topic_title=activity.description.replace("Topic: ", ""),
            roadmap_title="",  
            roadmap_slug="",   
            action=action,
            timestamp=activity.created_at,
            status=action
        ))
    
    return result

def get_activity_dashboard(db: Session, user_id: int) -> ActivityDashboard:
    stats = get_activity_stats(db, user_id)
    continue_following = get_continue_following(db, user_id)
    learning_activity = get_learning_activity(db, user_id)
    
    return ActivityDashboard(
        stats=stats,
        continue_following=continue_following,
        learning_activity=learning_activity
    )
