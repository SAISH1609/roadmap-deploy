from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.models import Guide, Video
from app.schemas.schemas import GuideCreate, VideoCreate

def create_guide(db: Session, guide: GuideCreate) -> Guide:
    """Create a new guide with order conflict management"""
    
    # Handle order index conflicts - push existing items down
    existing_guide = db.query(Guide).filter(
        Guide.order_index >= guide.order_index,
        Guide.is_active == True
    ).all()
    
    # Push down all guides with same or higher order_index
    for existing in existing_guide:
        existing.order_index += 1
    
    db_guide = Guide(
        title=guide.title,
        description=guide.description,
        type=guide.type,
        link=guide.link,
        order_index=guide.order_index,
        is_active=True
    )
    db.add(db_guide)
    db.commit()
    db.refresh(db_guide)
    return db_guide

def get_guides(db: Session, skip: int = 0, limit: int = 100, active_only: bool = True) -> List[Guide]:
    """Get all guides with optional filtering"""
    query = db.query(Guide)
    if active_only:
        query = query.filter(Guide.is_active == True)
    return query.order_by(Guide.order_index, Guide.created_at).offset(skip).limit(limit).all()

def get_guide_by_id(db: Session, guide_id: int) -> Optional[Guide]:
    """Get a guide by ID"""
    return db.query(Guide).filter(Guide.id == guide_id).first()

def update_guide(db: Session, guide_id: int, guide_update: GuideCreate) -> Optional[Guide]:
    """Update an existing guide with order conflict management"""
    db_guide = db.query(Guide).filter(Guide.id == guide_id).first()
    if not db_guide:
        return None
    
    old_order = db_guide.order_index
    new_order = guide_update.order_index
    
    # Handle order index change
    if old_order != new_order:
        # If moving to a position that's occupied, push other items down
        existing_guide = db.query(Guide).filter(
            Guide.order_index >= new_order,
            Guide.is_active == True,
            Guide.id != guide_id  # Exclude current guide
        ).all()
        
        # Push down all guides with same or higher order_index
        for existing in existing_guide:
            existing.order_index += 1
    
    # Update guide fields
    db_guide.title = guide_update.title
    db_guide.description = guide_update.description
    db_guide.type = guide_update.type
    db_guide.link = guide_update.link
    db_guide.order_index = guide_update.order_index
    
    db.commit()
    db.refresh(db_guide)
    return db_guide

def delete_guide(db: Session, guide_id: int) -> bool:
    """Delete a guide (hard delete for admin)"""
    db_guide = db.query(Guide).filter(Guide.id == guide_id).first()
    if db_guide:
        # Get the order_index of the deleted guide
        deleted_order = db_guide.order_index
        
        # Hard delete the guide
        db.delete(db_guide)
        
        # Reorder remaining guides - move up all guides with higher order_index
        remaining_guides = db.query(Guide).filter(
            Guide.order_index > deleted_order,
            Guide.is_active == True
        ).all()
        
        for guide in remaining_guides:
            guide.order_index -= 1
            
        db.commit()
        return True
    return False

def create_video(db: Session, video: VideoCreate) -> Video:
    """Create a new video with order conflict management"""
    
    # Handle order index conflicts - push existing items down
    existing_videos = db.query(Video).filter(
        Video.order_index >= video.order_index,
        Video.is_active == True
    ).all()
    
    # Push down all videos with same or higher order_index
    for existing in existing_videos:
        existing.order_index += 1
    
    # Convert duration to "X Minutes" format if it's a number
    duration_str = video.duration
    if isinstance(video.duration, (int, float)):
        duration_str = f"{int(video.duration)} Minutes"
    elif video.duration and not video.duration.endswith("Minutes"):
        try:
            duration_num = int(video.duration)
            duration_str = f"{duration_num} Minutes"
        except ValueError:
            duration_str = video.duration
    
    db_video = Video(
        title=video.title,
        description=video.description,
        link=video.link,
        duration=duration_str,
        order_index=video.order_index,
        is_active=True
    )
    db.add(db_video)
    db.commit()
    db.refresh(db_video)
    return db_video

def get_videos(db: Session, skip: int = 0, limit: int = 100, active_only: bool = True) -> List[Video]:
    """Get all videos with optional filtering"""
    query = db.query(Video)
    if active_only:
        query = query.filter(Video.is_active == True)
    return query.order_by(Video.order_index, Video.created_at).offset(skip).limit(limit).all()

def get_video_by_id(db: Session, video_id: int) -> Optional[Video]:
    """Get a video by ID"""
    return db.query(Video).filter(Video.id == video_id).first()

def update_video(db: Session, video_id: int, video_update: VideoCreate) -> Optional[Video]:
    """Update an existing video with order conflict management"""
    db_video = db.query(Video).filter(Video.id == video_id).first()
    if not db_video:
        return None
    
    old_order = db_video.order_index
    new_order = video_update.order_index
    
    # Handle order index change
    if old_order != new_order:
        # If moving to a position that's occupied, push other items down
        existing_videos = db.query(Video).filter(
            Video.order_index >= new_order,
            Video.is_active == True,
            Video.id != video_id  # Exclude current video
        ).all()
        
        # Push down all videos with same or higher order_index
        for existing in existing_videos:
            existing.order_index += 1
    
    # Convert duration to "X Minutes" format if it's a number
    duration_str = video_update.duration
    if isinstance(video_update.duration, (int, float)):
        duration_str = f"{int(video_update.duration)} Minutes"
    elif video_update.duration and not video_update.duration.endswith("Minutes"):
        try:
            duration_num = int(video_update.duration)
            duration_str = f"{duration_num} Minutes"
        except ValueError:
            duration_str = video_update.duration
    
    # Update video fields
    db_video.title = video_update.title
    db_video.description = video_update.description
    db_video.link = video_update.link
    db_video.duration = duration_str
    db_video.order_index = video_update.order_index
    
    db.commit()
    db.refresh(db_video)
    return db_video

def delete_video(db: Session, video_id: int) -> bool:
    """Delete a video (hard delete for admin)"""
    db_video = db.query(Video).filter(Video.id == video_id).first()
    if db_video:
        # Get the order_index of the deleted video
        deleted_order = db_video.order_index
        
        # Hard delete the video
        db.delete(db_video)
        
        # Reorder remaining videos - move up all videos with higher order_index
        remaining_videos = db.query(Video).filter(
            Video.order_index > deleted_order,
            Video.is_active == True
        ).all()
        
        for video in remaining_videos:
            video.order_index -= 1
            
        db.commit()
        return True
    return False
