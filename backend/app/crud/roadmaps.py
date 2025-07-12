from sqlalchemy.orm import Session
from sqlalchemy import and_
from typing import Optional, List
from app.models.models import Roadmap, RoadmapTopic, TopicResource, user_bookmarks

def get_roadmaps(db: Session, skip: int = 0, limit: int = 100, category: Optional[str] = None):
    query = db.query(Roadmap)
    if category:
        query = query.filter(Roadmap.category == category)
    return query.filter(Roadmap.is_public == True).offset(skip).limit(limit).all()

def get_roadmap_by_id(db: Session, roadmap_id: int):
    return db.query(Roadmap).filter(Roadmap.id == roadmap_id).first()

def get_roadmap_by_slug(db: Session, slug: str):
    return db.query(Roadmap).filter(Roadmap.slug == slug).first()

def get_topic_by_id(db: Session, topic_id: int, roadmap_id: int):
    return db.query(RoadmapTopic).filter(
        and_(RoadmapTopic.id == topic_id, RoadmapTopic.roadmap_id == roadmap_id)
    ).first()

def is_roadmap_bookmarked(db: Session, user_id: int, roadmap_id: int) -> bool:
    result = db.query(user_bookmarks).filter(
        and_(user_bookmarks.c.user_id == user_id, user_bookmarks.c.roadmap_id == roadmap_id)
    ).first()
    return result is not None

def add_bookmark(db: Session, user_id: int, roadmap_id: int):
    # Check if already bookmarked
    if not is_roadmap_bookmarked(db, user_id, roadmap_id):
        stmt = user_bookmarks.insert().values(user_id=user_id, roadmap_id=roadmap_id)
        db.execute(stmt)
        db.commit()

def remove_bookmark(db: Session, user_id: int, roadmap_id: int):
    stmt = user_bookmarks.delete().where(
        and_(user_bookmarks.c.user_id == user_id, user_bookmarks.c.roadmap_id == roadmap_id)
    )
    db.execute(stmt)
    db.commit()

def get_user_bookmarked_roadmaps(db: Session, user_id: int) -> List[Roadmap]:
    return db.query(Roadmap).join(
        user_bookmarks, Roadmap.id == user_bookmarks.c.roadmap_id
    ).filter(user_bookmarks.c.user_id == user_id).all()
