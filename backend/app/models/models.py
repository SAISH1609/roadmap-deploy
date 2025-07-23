from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, ForeignKey, Table, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

team_roadmaps = Table(
    'team_roadmaps',
    Base.metadata,
    Column('team_id', Integer, ForeignKey('teams.id'), primary_key=True),
    Column('roadmap_id', Integer, ForeignKey('roadmaps.id'), primary_key=True),
    Column('added_at', DateTime(timezone=True), server_default=func.now())
)

user_bookmarks = Table(
    'user_bookmarks',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id'), primary_key=True),
    Column('roadmap_id', Integer, ForeignKey('roadmaps.id'), primary_key=True),
    Column('bookmarked_at', DateTime(timezone=True), server_default=func.now())
)

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    username = Column(String(100), unique=True, index=True, nullable=False)
    full_name = Column(String(255))
    hashed_password = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    is_admin = Column(Boolean, default=False)
    
    # Profile fields
    headline = Column(String(255))  
    github_url = Column(String(500))  
    linkedin_url = Column(String(500)) 
    website_url = Column(String(500))
    profile_picture = Column(String(500))  # We need to work on this, not final
    
    # Activity tracking
    current_streak = Column(Integer, default=0)
    last_activity_date = Column(DateTime(timezone=True))
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    

    bookmarked_roadmaps = relationship("Roadmap", secondary=user_bookmarks, back_populates="bookmarked_by")
    progress = relationship("UserProgress", back_populates="user")
    activities = relationship("UserActivity", back_populates="user")
    memberships = relationship("TeamMembership", back_populates="user")

class Team(Base):
    __tablename__ = "teams"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    github_org_link = Column(String(500))
    created_by = Column(Integer, ForeignKey('users.id'), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    

    roadmaps = relationship("Roadmap", secondary=team_roadmaps, back_populates="teams")
    skills = relationship("TeamSkill", back_populates="team")
    invitations = relationship("TeamInvitation", back_populates="team")
    memberships = relationship("TeamMembership", back_populates="team")

class Skill(Base):
    __tablename__ = "skills"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    category = Column(String(100))
    is_predefined = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    

    team_skills = relationship("TeamSkill", back_populates="skill")

class TeamSkill(Base):
    __tablename__ = "team_skills"
    
    id = Column(Integer, primary_key=True, index=True)
    team_id = Column(Integer, ForeignKey('teams.id'), nullable=False)
    skill_id = Column(Integer, ForeignKey('skills.id'), nullable=False)
    is_custom = Column(Boolean, default=False)
    added_at = Column(DateTime(timezone=True), server_default=func.now())
    

    team = relationship("Team", back_populates="skills")
    skill = relationship("Skill", back_populates="team_skills")

class TeamInvitation(Base):
    __tablename__ = "team_invitations"
    
    id = Column(Integer, primary_key=True, index=True)
    team_id = Column(Integer, ForeignKey('teams.id'), nullable=False)
    email = Column(String(255), nullable=False)
    role = Column(String(50), default='member')
    token = Column(String(255), unique=True, nullable=False)
    is_accepted = Column(Boolean, default=False)
    invited_by = Column(Integer, ForeignKey('users.id'), nullable=False)
    invited_at = Column(DateTime(timezone=True), server_default=func.now())
    expires_at = Column(DateTime(timezone=True))
    

    team = relationship("Team", back_populates="invitations")

class Roadmap(Base):
    __tablename__ = "roadmaps"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, nullable=False)
    description = Column(Text)
    category = Column(String(100))
    is_public = Column(Boolean, default=True)
    total_topics = Column(Integer, default=0)
    created_by = Column(Integer, ForeignKey('users.id'))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    

    topics = relationship("RoadmapTopic", back_populates="roadmap")
    teams = relationship("Team", secondary=team_roadmaps, back_populates="roadmaps")
    bookmarked_by = relationship("User", secondary=user_bookmarks, back_populates="bookmarked_roadmaps")
    progress = relationship("UserProgress", back_populates="roadmap")

class RoadmapTopic(Base):
    __tablename__ = "roadmap_topics"
    
    id = Column(Integer, primary_key=True, index=True)
    roadmap_id = Column(Integer, ForeignKey('roadmaps.id'), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    position_x = Column(Integer)  # Optional for frontend positioning
    position_y = Column(Integer)  # Optional for frontend positioning
    parent_id = Column(Integer, ForeignKey('roadmap_topics.id'))
    order_index = Column(Integer, default=0)
    is_required = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    

    roadmap = relationship("Roadmap", back_populates="topics")
    resources = relationship("TopicResource", back_populates="topic")
    progress = relationship("TopicProgress", back_populates="topic")
    children = relationship("RoadmapTopic")

class TopicResource(Base):
    __tablename__ = "topic_resources"
    
    id = Column(Integer, primary_key=True, index=True)
    topic_id = Column(Integer, ForeignKey('roadmap_topics.id'), nullable=False)
    title = Column(String(255), nullable=False)
    url = Column(String(500), nullable=False)
    resource_type = Column(String(50), nullable=False)
    is_free = Column(Boolean, default=True)
    description = Column(Text)
    order_index = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    

    topic = relationship("RoadmapTopic", back_populates="resources")

class UserProgress(Base):
    __tablename__ = "user_progress"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    roadmap_id = Column(Integer, ForeignKey('roadmaps.id'), nullable=False)
    completed_topics = Column(Integer, default=0)
    total_topics = Column(Integer, default=0)
    progress_percentage = Column(Integer, default=0)
    started_at = Column(DateTime(timezone=True), server_default=func.now())
    last_updated = Column(DateTime(timezone=True), onupdate=func.now())
    

    user = relationship("User", back_populates="progress")
    roadmap = relationship("Roadmap", back_populates="progress")
    topic_progress = relationship("TopicProgress", back_populates="user_progress")

class TopicProgress(Base):
    __tablename__ = "topic_progress"
    
    id = Column(Integer, primary_key=True, index=True)
    user_progress_id = Column(Integer, ForeignKey('user_progress.id'), nullable=False)
    topic_id = Column(Integer, ForeignKey('roadmap_topics.id'), nullable=False)
    status = Column(String(20), default='not_started')  # done, in_progress, skip, not_started
    completed_at = Column(DateTime(timezone=True))
    

    user_progress = relationship("UserProgress", back_populates="topic_progress")
    topic = relationship("RoadmapTopic", back_populates="progress")

class UserActivity(Base):
    __tablename__ = "user_activities"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    team_id = Column(Integer, ForeignKey('teams.id'))
    activity_type = Column(String(100), nullable=False)  # 'started_topic', 'completed_topic', 'joined_team', etc.
    description = Column(String(500))
    activity_metadata = Column(Text)  # JSON string for additional data
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    

    user = relationship("User", back_populates="activities")

# Association object for team members to access role and joined_at
class TeamMembership(Base):
    __tablename__ = "team_members"
    
    team_id = Column(Integer, ForeignKey('teams.id'), primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), primary_key=True)
    role = Column(String(50), default='member')  # admin, manager, member
    joined_at = Column(DateTime(timezone=True), server_default=func.now())
    

    team = relationship("Team", back_populates="memberships")
    user = relationship("User", back_populates="memberships")

class Guide(Base):
    __tablename__ = "guides"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(500), nullable=False)
    description = Column(Text)
    type = Column(String(50))  # e.g., "article", "tutorial", "documentation"
    link = Column(String(1000))
    order_index = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class Video(Base):
    __tablename__ = "videos"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(500), nullable=False)
    description = Column(Text)
    link = Column(String(1000), nullable=False)
    duration = Column(String(20))  
    order_index = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
