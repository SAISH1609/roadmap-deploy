from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.models import Roadmap, RoadmapTopic, TopicResource, User, user_bookmarks, team_roadmaps, UserProgress
from app.schemas.schemas import AdminRoadmapCreate, AdminTopicCreate, AdminResourceCreate

def create_roadmap_with_topics(db: Session, roadmap_data: AdminRoadmapCreate, topics: List[AdminTopicCreate] = None):
    """Create a roadmap with optional topics"""
    # Create roadmap
    db_roadmap = Roadmap(
        title=roadmap_data.title,
        slug=roadmap_data.slug,
        description=roadmap_data.description,
        category=roadmap_data.category,
        is_public=roadmap_data.is_public,
        total_topics=roadmap_data.total_topics
    )
    db.add(db_roadmap)
    db.commit()
    db.refresh(db_roadmap)
    
    # Create topics if provided
    if topics:
        for topic_data in topics:
            db_topic = RoadmapTopic(
                roadmap_id=db_roadmap.id,
                title=topic_data.title,
                description=topic_data.description,
                position_x=topic_data.position_x,
                position_y=topic_data.position_y,
                order_index=topic_data.order_index,
                is_optional=topic_data.is_optional
            )
            db.add(db_topic)
        
        db.commit()
        # Update total_topics count
        actual_topic_count = db.query(RoadmapTopic).filter(RoadmapTopic.roadmap_id == db_roadmap.id).count()
        db_roadmap.total_topics = actual_topic_count
        db.commit()
    
    return db_roadmap

def add_topic_to_roadmap(db: Session, roadmap_id: int, topic_data: AdminTopicCreate):
    """Add a topic to an existing roadmap"""
    db_topic = RoadmapTopic(
        roadmap_id=roadmap_id,
        title=topic_data.title,
        description=topic_data.description,
        order_index=topic_data.order_index,
        is_required=topic_data.is_required
    )
    db.add(db_topic)
    db.commit()
    db.refresh(db_topic)
    
    # Update roadmap total_topics count
    roadmap = db.query(Roadmap).filter(Roadmap.id == roadmap_id).first()
    if roadmap:
        topic_count = db.query(RoadmapTopic).filter(RoadmapTopic.roadmap_id == roadmap_id).count()
        roadmap.total_topics = topic_count
        db.commit()
    
    return db_topic

def add_resource_to_topic(db: Session, topic_id: int, resource_data: AdminResourceCreate):
    """Add a resource to a topic"""
    db_resource = TopicResource(
        topic_id=topic_id,
        title=resource_data.title,
        url=resource_data.url,
        resource_type=resource_data.resource_type,
        is_free=resource_data.is_free,
        description=resource_data.description,
        order_index=resource_data.order_index
    )
    db.add(db_resource)
    db.commit()
    db.refresh(db_resource)
    return db_resource

def update_roadmap(db: Session, roadmap_id: int, roadmap_data: AdminRoadmapCreate):
    """Update an existing roadmap"""
    roadmap = db.query(Roadmap).filter(Roadmap.id == roadmap_id).first()
    if roadmap:
        for field, value in roadmap_data.dict().items():
            setattr(roadmap, field, value)
        db.commit()
        db.refresh(roadmap)
    return roadmap

def delete_roadmap(db: Session, roadmap_id: int):
    """Delete a roadmap and all its topics/resources"""
    roadmap = db.query(Roadmap).filter(Roadmap.id == roadmap_id).first()
    if roadmap:
        # Delete all resources first
        topics = db.query(RoadmapTopic).filter(RoadmapTopic.roadmap_id == roadmap_id).all()
        for topic in topics:
            db.query(TopicResource).filter(TopicResource.topic_id == topic.id).delete()
        
        # Delete all topics
        db.query(RoadmapTopic).filter(RoadmapTopic.roadmap_id == roadmap_id).delete()
        
        # Delete user bookmarks
        db.execute(user_bookmarks.delete().where(user_bookmarks.c.roadmap_id == roadmap_id))
        
        # Delete team roadmaps
        db.execute(team_roadmaps.delete().where(team_roadmaps.c.roadmap_id == roadmap_id))
        
        # Delete user progress
        db.query(UserProgress).filter(UserProgress.roadmap_id == roadmap_id).delete()
        
        # Delete roadmap
        db.delete(roadmap)
        db.commit()
        return True
    return False

def delete_topic(db: Session, topic_id: int):
    """Delete a topic and all its resources"""
    topic = db.query(RoadmapTopic).filter(RoadmapTopic.id == topic_id).first()
    if topic:
        roadmap_id = topic.roadmap_id
        
        # Delete all resources
        db.query(TopicResource).filter(TopicResource.topic_id == topic_id).delete()
        
        # Delete topic
        db.delete(topic)
        db.commit()
        
        # Update roadmap total_topics count
        roadmap = db.query(Roadmap).filter(Roadmap.id == roadmap_id).first()
        if roadmap:
            topic_count = db.query(RoadmapTopic).filter(RoadmapTopic.roadmap_id == roadmap_id).count()
            roadmap.total_topics = topic_count
            db.commit()
        
        return True
    return False

def delete_resource(db: Session, resource_id: int):
    """Delete a resource"""
    resource = db.query(TopicResource).filter(TopicResource.id == resource_id).first()
    if resource:
        db.delete(resource)
        db.commit()
        return True
    return False

def is_admin_user(db: Session, user_id: int) -> bool:
    """Check if user has admin privileges"""
    user = db.query(User).filter(User.id == user_id).first()
    # For now, check if email contains 'admin' - you can implement proper role system later
    return user and ('admin' in user.email.lower() or user.email == 'admin@example.com')

def get_all_roadmaps_admin(db: Session, skip: int = 0, limit: int = 100):
    """Get all roadmaps for admin (including private ones)"""
    return db.query(Roadmap).offset(skip).limit(limit).all()

def get_roadmap_topics_admin(db: Session, roadmap_id: int):
    """Get all topics for a roadmap (admin view)"""
    return db.query(RoadmapTopic).filter(RoadmapTopic.roadmap_id == roadmap_id).order_by(RoadmapTopic.order_index).all()

def get_topic_resources_admin(db: Session, topic_id: int):
    """Get all resources for a topic (admin view)"""
    return db.query(TopicResource).filter(TopicResource.topic_id == topic_id).order_by(TopicResource.order_index).all()
