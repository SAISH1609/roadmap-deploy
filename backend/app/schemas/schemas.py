from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    username: str
    full_name: Optional[str] = None
    headline: Optional[str] = None
    github_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    website_url: Optional[str] = None
    profile_picture: Optional[str] = None
    is_admin: Optional[bool] = False

class UserCreate(UserBase):
    password: str

class UserUpdate(UserBase):
    password: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(UserBase):
    id: int
    is_active: bool
    is_verified: bool
    created_at: datetime

    class Config:
        from_attributes = True

# Team Schemas
class TeamBase(BaseModel):
    name: str
    description: Optional[str] = None
    github_org_link: Optional[str] = None

class TeamCreate(TeamBase):
    roadmap_ids: Optional[List[int]] = []
    members: Optional[List[EmailStr]] = []

class TeamInvite(BaseModel):
    email: EmailStr
    role: str = "member"

class TeamMember(BaseModel):
    id: int
    email: str
    username: str
    full_name: Optional[str]
    role: str
    joined_at: datetime

    class Config:
        from_attributes = True

class Team(TeamBase):
    id: int
    created_by: int
    created_at: datetime
    # members: List[TeamMember] = []  

    class Config:
        from_attributes = True

# Skill Schemas
class SkillBase(BaseModel):
    name: str
    category: Optional[str] = None

class SkillCreate(SkillBase):
    is_predefined: bool = True

class Skill(SkillBase):
    id: int
    is_predefined: bool
    created_at: datetime

    class Config:
        from_attributes = True

# Roadmap Schemas
class RoadmapBase(BaseModel):
    title: str
    description: Optional[str] = None
    category: Optional[str] = None
    is_public: bool = True

class RoadmapCreate(RoadmapBase):
    slug: str

class TopicResourceBase(BaseModel):
    title: str
    url: str
    resource_type: str
    is_free: bool = True
    description: Optional[str] = None

class TopicResource(TopicResourceBase):
    id: int
    order_index: int

    class Config:
        from_attributes = True

class RoadmapTopicBase(BaseModel):
    title: str
    description: Optional[str] = None
    position_x: Optional[int] = None
    position_y: Optional[int] = None
    parent_id: Optional[int] = None
    is_required: bool = True

class RoadmapTopic(RoadmapTopicBase):
    id: int
    roadmap_id: int
    order_index: int
    resources: List[TopicResource] = []

    class Config:
        from_attributes = True

class Roadmap(RoadmapBase):
    id: int
    slug: str
    total_topics: int
    created_by: Optional[int]
    created_at: datetime
    topics: List[RoadmapTopic] = []

    class Config:
        from_attributes = True

class RoadmapSummary(BaseModel):
    id: int
    title: str
    slug: str
    description: Optional[str]
    category: Optional[str]
    total_topics: int
    is_bookmarked: bool = False

    class Config:
        from_attributes = True

# Progress Schemas
class TopicProgressBase(BaseModel):
    topic_id: int
    status: str = "not_started"  # done, in_progress, skip, not_started

class TopicProgress(TopicProgressBase):
    id: int
    completed_at: Optional[datetime]

    class Config:
        from_attributes = True

class UserProgressBase(BaseModel):
    roadmap_id: int

class UserProgress(UserProgressBase):
    id: int
    user_id: int
    completed_topics: int
    total_topics: int
    progress_percentage: int
    started_at: datetime
    last_updated: Optional[datetime]
    topic_progress: List[TopicProgress] = []

    class Config:
        from_attributes = True

class ProgressSummary(BaseModel):
    roadmap_id: int
    roadmap_title: str
    completed_topics: int
    total_topics: int
    progress_percentage: int

# Activity Schemas
class UserActivityBase(BaseModel):
    activity_type: str
    description: Optional[str] = None
    metadata: Optional[str] = None

class UserActivity(UserActivityBase):
    id: int
    user_id: int
    team_id: Optional[int]
    created_at: datetime

    class Config:
        from_attributes = True

class UserActivityWithUser(UserActivity):
    user: User

# Activity Dashboard Schemas
class ActivityStats(BaseModel):
    topics_completed: int
    currently_learning: int
    visit_streak: int

class RoadmapProgress(BaseModel):
    roadmap_id: int
    roadmap_title: str
    roadmap_slug: str
    progress_percentage: int
    completed_topics: int
    total_topics: int
    last_updated: Optional[datetime]

class TopicActivityItem(BaseModel):
    topic_id: int
    topic_title: str
    roadmap_title: str
    roadmap_slug: str
    action: str  
    timestamp: datetime
    status: str  

class ActivityDashboard(BaseModel):
    stats: ActivityStats
    continue_following: List[RoadmapProgress]
    learning_activity: List[TopicActivityItem]

# Authentication Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# Team Invitation Schemas
class TeamInvitationBase(BaseModel):
    email: EmailStr
    role: str = "member"

class TeamInvitationCreate(TeamInvitationBase):
    team_id: int

class TeamInvitation(TeamInvitationBase):
    id: int
    team_id: int
    token: str
    is_accepted: bool
    invited_by: int
    invited_at: datetime
    expires_at: Optional[datetime]

    class Config:
        from_attributes = True

# Admin Schemas for roadmap management
class AdminRoadmapCreate(BaseModel):
    title: str
    slug: str
    description: Optional[str] = None
    category: Optional[str] = None
    is_public: bool = True
    total_topics: int = 0

class AdminTopicCreate(BaseModel):
    title: str
    description: Optional[str] = None
    order_index: int
    is_required: bool = True
    parent_id: Optional[int] = None

class AdminResourceCreate(BaseModel):
    title: str
    url: str
    resource_type: str
    is_free: bool = True
    description: Optional[str] = None
    order_index: int = 1

class AdminRoadmapWithTopics(BaseModel):
    roadmap: AdminRoadmapCreate
    topics: List[AdminTopicCreate] = []

class AdminTopicWithResources(BaseModel):
    topic: AdminTopicCreate
    resources: List[AdminResourceCreate] = []

# Guide Schemas
class GuideBase(BaseModel):
    title: str
    description: Optional[str] = None
    type: Optional[str] = None  # article, tutorial, documentation
    link: Optional[str] = None
    order_index: Optional[int] = 1

class GuideCreate(GuideBase):
    pass

class GuideUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    type: Optional[str] = None
    link: Optional[str] = None
    order_index: Optional[int] = None

class Guide(GuideBase):
    id: int
    order_index: Optional[int] = 0
    is_active: bool = True
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True

# Video Schemas
class VideoBase(BaseModel):
    title: str
    description: Optional[str] = None
    link: str
    duration: Optional[str] = None 
    order_index: Optional[int] = 1

class VideoCreate(VideoBase):
    pass

class VideoUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    link: Optional[str] = None
    duration: Optional[str] = None
    order_index: Optional[int] = None

class Video(VideoBase):
    id: int
    order_index: Optional[int] = 0
    is_active: bool = True
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True
