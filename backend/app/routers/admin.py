from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import timedelta

from app.database import get_db
from app.schemas.schemas import (
    AdminRoadmapCreate, AdminTopicCreate, AdminResourceCreate, 
    AdminRoadmapWithTopics, AdminTopicWithResources,
    Roadmap, RoadmapTopic, TopicResource, UserLogin, Token
)
from app.routers.auth import get_current_user
from app.models.models import User, Roadmap as RoadmapModel, RoadmapTopic as RoadmapTopicModel, TopicResource as TopicResourceModel
from app.crud import admin as crud_admin
from app.crud import users as crud_users
from app.core.security import create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES

router = APIRouter()

@router.post("/login", response_model=Token)
def admin_login(user_data: UserLogin, db: Session = Depends(get_db)):
    """Admin login endpoint"""
    user = crud_users.authenticate_user(db, email=user_data.email, password=user_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    
    # Check if user is admin
    if not crud_admin.is_admin_user(db, user.id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required",
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

def get_admin_user(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Dependency to ensure user has admin privileges"""
    if not crud_admin.is_admin_user(db, current_user.id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    return current_user

@router.post("/roadmaps/", response_model=Roadmap, status_code=status.HTTP_201_CREATED)
def create_roadmap(
    roadmap_data: AdminRoadmapCreate,
    admin_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    """Create a new roadmap (Admin only)"""
    # Check if slug already exists
    existing = db.query(crud_admin.Roadmap).filter(crud_admin.Roadmap.slug == roadmap_data.slug).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Roadmap with this slug already exists"
        )
    
    return crud_admin.create_roadmap_with_topics(db=db, roadmap_data=roadmap_data)

@router.post("/roadmaps/bulk", response_model=Roadmap, status_code=status.HTTP_201_CREATED)
def create_roadmap_with_topics(
    data: AdminRoadmapWithTopics,
    admin_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    """Create a roadmap with topics in one request (Admin only)"""
    # Check if slug already exists
    existing = db.query(crud_admin.Roadmap).filter(crud_admin.Roadmap.slug == data.roadmap.slug).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Roadmap with this slug already exists"
        )
    
    return crud_admin.create_roadmap_with_topics(db=db, roadmap_data=data.roadmap, topics=data.topics)

@router.get("/roadmaps/", response_model=List[Roadmap])
def get_all_roadmaps_admin(
    skip: int = 0,
    limit: int = 100,
    admin_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    """Get all roadmaps including private ones (Admin only)"""
    return crud_admin.get_all_roadmaps_admin(db, skip=skip, limit=limit)

@router.put("/roadmaps/{roadmap_id}", response_model=Roadmap)
def update_roadmap(
    roadmap_id: int,
    roadmap_data: AdminRoadmapCreate,
    admin_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    """Update a roadmap (Admin only)"""
    roadmap = crud_admin.update_roadmap(db=db, roadmap_id=roadmap_id, roadmap_data=roadmap_data)
    if not roadmap:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Roadmap not found"
        )
    return roadmap

@router.delete("/roadmaps/{roadmap_id}")
def delete_roadmap(
    roadmap_id: int,
    admin_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    """Delete a roadmap and all its content (Admin only)"""
    success = crud_admin.delete_roadmap(db=db, roadmap_id=roadmap_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Roadmap not found"
        )
    return {"message": "Roadmap deleted successfully"}

@router.post("/roadmaps/{roadmap_id}/topics/", response_model=RoadmapTopic, status_code=status.HTTP_201_CREATED)
def add_topic_to_roadmap(
    roadmap_id: int,
    topic_data: AdminTopicCreate,
    admin_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    """Add a topic to a roadmap (Admin only)"""
    # Check if roadmap exists
    roadmap = db.query(RoadmapModel).filter(RoadmapModel.id == roadmap_id).first()
    if not roadmap:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Roadmap not found"
        )
    
    return crud_admin.add_topic_to_roadmap(db=db, roadmap_id=roadmap_id, topic_data=topic_data)

@router.get("/roadmaps/{roadmap_id}/topics/", response_model=List[RoadmapTopic])
def get_roadmap_topics_admin(
    roadmap_id: int,
    admin_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    """Get all topics for a roadmap (Admin view)"""
    return crud_admin.get_roadmap_topics_admin(db=db, roadmap_id=roadmap_id)

@router.delete("/topics/{topic_id}")
def delete_topic(
    topic_id: int,
    admin_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    """Delete a topic and all its resources (Admin only)"""
    success = crud_admin.delete_topic(db=db, topic_id=topic_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Topic not found"
        )
    return {"message": "Topic deleted successfully"}

@router.post("/topics/{topic_id}/resources/", response_model=TopicResource, status_code=status.HTTP_201_CREATED)
def add_resource_to_topic(
    topic_id: int,
    resource_data: AdminResourceCreate,
    admin_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    """Add a resource to a topic (Admin only)"""
    # Check if topic exists
    topic = db.query(crud_admin.RoadmapTopic).filter(crud_admin.RoadmapTopic.id == topic_id).first()
    if not topic:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Topic not found"
        )
    
    return crud_admin.add_resource_to_topic(db=db, topic_id=topic_id, resource_data=resource_data)

@router.get("/topics/{topic_id}/resources/", response_model=List[TopicResource])
def get_topic_resources_admin(
    topic_id: int,
    admin_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    """Get all resources for a topic (Admin view)"""
    return crud_admin.get_topic_resources_admin(db=db, topic_id=topic_id)

@router.post("/topics/bulk", response_model=RoadmapTopic, status_code=status.HTTP_201_CREATED)
def create_topic_with_resources(
    roadmap_id: int,
    data: AdminTopicWithResources,
    admin_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    """Create a topic with resources in one request (Admin only)"""
    # Check if roadmap exists
    roadmap = db.query(crud_admin.Roadmap).filter(crud_admin.Roadmap.id == roadmap_id).first()
    if not roadmap:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Roadmap not found"
        )
    
    # Create topic
    topic = crud_admin.add_topic_to_roadmap(db=db, roadmap_id=roadmap_id, topic_data=data.topic)
    
    # Add resources
    for resource_data in data.resources:
        crud_admin.add_resource_to_topic(db=db, topic_id=topic.id, resource_data=resource_data)
    
    return topic

# Utility endpoints
@router.get("/stats")
def get_admin_stats(
    admin_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    """Get admin dashboard statistics"""
    roadmaps_count = db.query(crud_admin.Roadmap).count()
    topics_count = db.query(crud_admin.RoadmapTopic).count()
    resources_count = db.query(crud_admin.TopicResource).count()
    users_count = db.query(crud_admin.User).count()
    
    return {
        "roadmaps": roadmaps_count,
        "topics": topics_count,
        "resources": resources_count,
        "users": users_count
    }

@router.post("/sample-data")
def create_sample_roadmap(
    admin_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db)
):
    """Create a sample roadmap with topics and resources (Admin only)"""
    sample_roadmap = AdminRoadmapCreate(
        title="DevOps Roadmap",
        slug="devops-roadmap",
        description="Complete guide to DevOps practices and tools",
        category="DevOps",
        is_public=True,
        total_topics=0
    )
    
    sample_topics = [
        AdminTopicCreate(
            title="Version Control with Git",
            description="Learn Git fundamentals and workflows",
            order_index=1
        ),
        AdminTopicCreate(
            title="Continuous Integration",
            description="Implement CI pipelines",
            order_index=2
        ),
        AdminTopicCreate(
            title="Docker Containers",
            description="Containerization with Docker",
            order_index=3
        ),
        AdminTopicCreate(
            title="Kubernetes Orchestration",
            description="Container orchestration with K8s",
            order_index=4
        )
    ]
    
    try:
        roadmap = crud_admin.create_roadmap_with_topics(db=db, roadmap_data=sample_roadmap, topics=sample_topics)
        
        # Add resources to first topic
        first_topic = db.query(crud_admin.RoadmapTopic).filter(
            crud_admin.RoadmapTopic.roadmap_id == roadmap.id
        ).first()
        
        if first_topic:
            sample_resources = [
                AdminResourceCreate(
                    title="Pro Git Book",
                    url="https://git-scm.com/book",
                    resource_type="article",
                    is_free=True,
                    description="Official Git documentation",
                    order_index=1
                ),
                AdminResourceCreate(
                    title="Git Tutorial for Beginners",
                    url="https://www.youtube.com/watch?v=8JJ101D3knE",
                    resource_type="video",
                    is_free=True,
                    description="Comprehensive Git tutorial",
                    order_index=2
                )
            ]
            
            for resource in sample_resources:
                crud_admin.add_resource_to_topic(db=db, topic_id=first_topic.id, resource_data=resource)
        
        return {"message": "Sample DevOps roadmap created successfully", "roadmap_id": roadmap.id}
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error creating sample roadmap: {str(e)}"
        )
