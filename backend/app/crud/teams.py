from sqlalchemy.orm import Session, joinedload
from sqlalchemy import and_
from typing import List, Optional
from app.models.models import Team, User, TeamSkill, Skill, TeamInvitation, UserActivity, TeamMembership
from datetime import datetime, timedelta
import secrets

def create_team(db: Session, team_data: dict):
    skills = team_data.pop('skills', [])
    db_team = Team(**team_data)
    db.add(db_team)
    db.flush()
    if skills:
        for skill_name in skills:
            skill = db.query(Skill).filter(Skill.name == skill_name).first()
            if not skill:
                skill = Skill(name=skill_name, is_predefined=False)
                db.add(skill)
                db.flush()
            team_skill = TeamSkill(team_id=db_team.id, skill_id=skill.id)
            db.add(team_skill)
    db.commit()
    db.refresh(db_team)
    return db_team

def get_team_by_id(db: Session, team_id: int):
    return db.query(Team).filter(Team.id == team_id).first()

def get_user_teams(db: Session, user_id: int):
    return db.query(Team).join(TeamMembership).filter(TeamMembership.user_id == user_id).all()

def add_team_member(db: Session, team_id: int, user_id: int, role: str = "member"):
    if not is_team_member(db, team_id, user_id):
        membership = TeamMembership(team_id=team_id, user_id=user_id, role=role)
        db.add(membership)
        db.commit()

def remove_team_member(db: Session, team_id: int, user_id: int):
    membership = db.query(TeamMembership).filter(
        and_(TeamMembership.team_id == team_id, TeamMembership.user_id == user_id)
    ).first()
    if membership:
        db.delete(membership)
        db.commit()
        return True
    return False

def is_team_member(db: Session, team_id: int, user_id: int) -> bool:
    return db.query(TeamMembership).filter(
        and_(TeamMembership.team_id == team_id, TeamMembership.user_id == user_id)
    ).first() is not None

def get_user_role_in_team(db: Session, team_id: int, user_id: int) -> Optional[str]:
    result = db.query(TeamMembership.role).filter(
        and_(TeamMembership.team_id == team_id, TeamMembership.user_id == user_id)
    ).first()
    return result[0] if result else None

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

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

def get_invitation_by_id(db: Session, invitation_id: int):
    return db.query(TeamInvitation).filter(TeamInvitation.id == invitation_id).first()

def get_pending_invitations_for_team(db: Session, team_id: int):
    return db.query(TeamInvitation).filter(
        and_(TeamInvitation.team_id == team_id, TeamInvitation.is_accepted == False)
    ).all()

def resend_invitation(db: Session, invitation: TeamInvitation):
    invitation.token = secrets.token_urlsafe(32)
    invitation.expires_at = datetime.utcnow() + timedelta(days=7)
    db.commit()
    db.refresh(invitation)
    return invitation

def delete_invitation(db: Session, invitation_id: int):
    invitation = db.query(TeamInvitation).filter(TeamInvitation.id == invitation_id).first()
    if invitation:
        db.delete(invitation)
        db.commit()
        return True
    return False

def get_invitation_by_token(db: Session, token: str):
    return db.query(TeamInvitation).filter(TeamInvitation.token == token).first()

def accept_invitation(db: Session, invitation_id: int):
    invitation = db.query(TeamInvitation).filter(TeamInvitation.id == invitation_id).first()
    if invitation:
        invitation.is_accepted = True
        db.commit()

def get_team_members(db: Session, team_id: int):
    return db.query(
        User.id, User.email, User.username, User.full_name, TeamMembership.role, TeamMembership.joined_at
    ).join(TeamMembership, User.id == TeamMembership.user_id).filter(
        TeamMembership.team_id == team_id
    ).all()

def get_team_activity(db: Session, team_id: int, limit: int = 50):
    return db.query(UserActivity, User).join(User, UserActivity.user_id == User.id).filter(UserActivity.team_id == team_id).order_by(
        UserActivity.created_at.desc()
    ).limit(limit).all()

def get_team_progress(db: Session, team_id: int):
    pass
