from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.schemas.schemas import Roadmap, RoadmapSummary, RoadmapTopic, TopicResource
from app.routers.auth import get_current_user
from app.models.models import User
from app.crud import roadmaps as crud_roadmaps

router = APIRouter()

@router.get("/", response_model=List[RoadmapSummary])
def get_roadmaps(
    skip: int = 0,
    limit: int = 100,
    category: str = None,
    db: Session = Depends(get_db)
):
    """Get all roadmaps with optional category filter (public endpoint)"""
    roadmaps = crud_roadmaps.get_roadmaps(db, skip=skip, limit=limit, category=category)
    
    # Return roadmaps without bookmark status (public endpoint)
    roadmap_summaries = []
    for roadmap in roadmaps:
        roadmap_summary = RoadmapSummary(
            id=roadmap.id,
            title=roadmap.title,
            slug=roadmap.slug,
            description=roadmap.description,
            category=roadmap.category,
            total_topics=roadmap.total_topics,
            is_bookmarked=False  # Public endpoint, no bookmark status
        )
        roadmap_summaries.append(roadmap_summary)
    
    return roadmap_summaries

@router.get("/bookmarked", response_model=List[RoadmapSummary])
def get_bookmarked_roadmaps(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's bookmarked roadmaps"""
    roadmaps = crud_roadmaps.get_user_bookmarked_roadmaps(db, user_id=current_user.id)
    
    roadmap_summaries = []
    for roadmap in roadmaps:
        roadmap_summary = RoadmapSummary(
            id=roadmap.id,
            title=roadmap.title,
            slug=roadmap.slug,
            description=roadmap.description,
            category=roadmap.category,
            total_topics=roadmap.total_topics,
            is_bookmarked=True
        )
        roadmap_summaries.append(roadmap_summary)
    
    return roadmap_summaries

@router.get("/{roadmap_slug}", response_model=Roadmap)
def get_roadmap_detail(
    roadmap_slug: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get detailed roadmap with topics and resources"""
    roadmap = crud_roadmaps.get_roadmap_by_slug(db, slug=roadmap_slug)
    if not roadmap:
        raise HTTPException(status_code=404, detail="Roadmap not found")
    
    return roadmap

@router.get("/{roadmap_id}/topics/{topic_id}", response_model=RoadmapTopic)
def get_topic_detail(
    roadmap_id: int,
    topic_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get detailed topic information with resources"""
    topic = crud_roadmaps.get_topic_by_id(db, topic_id=topic_id, roadmap_id=roadmap_id)
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")
    
    return topic

@router.post("/{roadmap_id}/bookmark")
def toggle_bookmark(
    roadmap_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Toggle bookmark status for a roadmap"""
    roadmap = crud_roadmaps.get_roadmap_by_id(db, roadmap_id=roadmap_id)
    if not roadmap:
        raise HTTPException(status_code=404, detail="Roadmap not found")
    
    is_bookmarked = crud_roadmaps.is_roadmap_bookmarked(db, user_id=current_user.id, roadmap_id=roadmap_id)
    
    if is_bookmarked:
        crud_roadmaps.remove_bookmark(db, user_id=current_user.id, roadmap_id=roadmap_id)
        return {"message": "Bookmark removed", "is_bookmarked": False}
    else:
        crud_roadmaps.add_bookmark(db, user_id=current_user.id, roadmap_id=roadmap_id)
        return {"message": "Bookmark added", "is_bookmarked": True}
