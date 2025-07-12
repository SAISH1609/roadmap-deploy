from sqlalchemy.orm import Session
from sqlalchemy import and_
from typing import List, Optional
from app.models.models import Team, User, TeamSkill, Skill, TeamInvitation, UserActivity, TeamMembership
from datetime import datetime

def create_team(db: Session, team_data: dict):
    db_team = Team(**team_data)
    db.add(db_team)
    db.commit()
    db.refresh(db_team)
    return db_team

def get_team_by_id(db: Session, team_id: int):
    return db.query(Team).filter(Team.id == team_id).first()

def get_user_teams(db: Session, user_id: int):
    return db.query(Team).join(TeamMembership).filter(TeamMembership.user_id == user_id).all()

def add_team_member(db: Session, team_id: int, user_id: int, role: str = "member"):
    # Check if already a member
    if not is_team_member(db, team_id, user_id):
        membership = TeamMembership(team_id=team_id, user_id=user_id, role=role)
        db.add(membership)
        db.commit()

def is_team_member(db: Session, team_id: int, user_id: int) -> bool:
    result = db.query(TeamMembership).filter(
        and_(TeamMembership.team_id == team_id, TeamMembership.user_id == user_id)
    ).first()
    return result is not None

def get_user_role_in_team(db: Session, team_id: int, user_id: int) -> Optional[str]:
    result = db.query(TeamMembership.role).filter(
        and_(TeamMembership.team_id == team_id, TeamMembership.user_id == user_id)
    ).first()
    return result[0] if result else None

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def add_team_skills(db: Session, team_id: int, skills: List[str]):
    for skill_name in skills:
        # Check if skill exists
        skill = db.query(Skill).filter(Skill.name == skill_name).first()
        if not skill:
            # Create custom skill
            skill = Skill(name=skill_name, is_predefined=False)
            db.add(skill)
            db.flush()
        
        # Add to team skills
        team_skill = TeamSkill(team_id=team_id, skill_id=skill.id, is_custom=not skill.is_predefined)
        db.add(team_skill)
    
    db.commit()

def create_invitation(db: Session, invitation_data: dict):
    db_invitation = TeamInvitation(**invitation_data)
    db.add(db_invitation)
    db.commit()
    db.refresh(db_invitation)
    return db_invitation

def get_pending_invitation(db: Session, team_id: int, email: str):
    return db.query(TeamInvitation).filter(
        and_(
            TeamInvitation.team_id == team_id,
            TeamInvitation.email == email,
            TeamInvitation.is_accepted == False
        )
    ).first()

def get_invitation_by_token(db: Session, token: str):
    return db.query(TeamInvitation).filter(TeamInvitation.token == token).first()

def accept_invitation(db: Session, invitation_id: int):
    invitation = db.query(TeamInvitation).filter(TeamInvitation.id == invitation_id).first()
    if invitation:
        invitation.is_accepted = True
        db.commit()

def get_team_members(db: Session, team_id: int):
    return db.query(TeamMembership).filter(TeamMembership.team_id == team_id).all()

def get_team_activity(db: Session, team_id: int, limit: int = 50):
    return db.query(UserActivity).filter(UserActivity.team_id == team_id).order_by(
        UserActivity.created_at.desc()
    ).limit(limit).all()

def get_team_progress(db: Session, team_id: int):
    # This would return progress for all team members on team roadmaps
    # Ill make this later since it depends on how we want ot structure the progress data
    pass
