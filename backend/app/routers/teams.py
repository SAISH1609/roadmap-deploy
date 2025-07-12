from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import secrets
from datetime import datetime, timedelta

from app.database import get_db
from app.schemas.schemas import Team, TeamCreate, TeamInvite, TeamMember, TeamInvitation
from app.routers.auth import get_current_user
from app.models.models import User
from app.crud import teams as crud_teams
from app.services.email_service import send_team_invitation_email

router = APIRouter()

@router.post("/", response_model=Team, status_code=status.HTTP_201_CREATED)
def create_team(
    team: TeamCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new team"""
    # Create team
    team_data = team.dict()
    team_data['created_by'] = current_user.id
    db_team = crud_teams.create_team(db=db, team_data=team_data)
    
    # Add creator as admin
    crud_teams.add_team_member(db=db, team_id=db_team.id, user_id=current_user.id, role="admin")
    
    # Add skills if provided
    if team.skills:
        crud_teams.add_team_skills(db=db, team_id=db_team.id, skills=team.skills)
    
    return db_team

@router.get("/", response_model=List[Team])
def get_user_teams(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all teams the current user is a member of"""
    return crud_teams.get_user_teams(db=db, user_id=current_user.id)

@router.get("/{team_id}", response_model=Team)
def get_team(
    team_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get team details"""
    team = crud_teams.get_team_by_id(db=db, team_id=team_id)
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    
    # Check if user is a member of the team
    if not crud_teams.is_team_member(db=db, team_id=team_id, user_id=current_user.id):
        raise HTTPException(status_code=403, detail="Not authorized to view this team")
    
    return team

@router.post("/{team_id}/invite", status_code=status.HTTP_201_CREATED)
def invite_team_member(
    team_id: int,
    invitation: TeamInvite,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Invite a user to join the team"""
    team = crud_teams.get_team_by_id(db=db, team_id=team_id)
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    
    # Check if current user has permission to invite (admin or manager)
    user_role = crud_teams.get_user_role_in_team(db=db, team_id=team_id, user_id=current_user.id)
    if user_role not in ["admin", "manager"]:
        raise HTTPException(status_code=403, detail="Not authorized to invite members")
    
    # Check if user is already a member
    invited_user = crud_teams.get_user_by_email(db=db, email=invitation.email)
    if invited_user and crud_teams.is_team_member(db=db, team_id=team_id, user_id=invited_user.id):
        raise HTTPException(status_code=400, detail="User is already a team member")
    
    # Check if invitation already exists
    existing_invitation = crud_teams.get_pending_invitation(db=db, team_id=team_id, email=invitation.email)
    if existing_invitation:
        raise HTTPException(status_code=400, detail="Invitation already sent")
    
    # Create invitation
    token = secrets.token_urlsafe(32)
    expires_at = datetime.utcnow() + timedelta(days=7)  # 7 days expiry
    
    invitation_data = {
        "team_id": team_id,
        "email": invitation.email,
        "role": invitation.role,
        "token": token,
        "invited_by": current_user.id,
        "expires_at": expires_at
    }
    
    db_invitation = crud_teams.create_invitation(db=db, invitation_data=invitation_data)
    
    # Send email invitation
    send_team_invitation_email(invitation.email, team.name, token)
    
    return {"message": "Invitation sent successfully"}

@router.post("/join/{token}")
def accept_invitation(
    token: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Accept team invitation"""
    invitation = crud_teams.get_invitation_by_token(db=db, token=token)
    if not invitation:
        raise HTTPException(status_code=404, detail="Invalid invitation token")
    
    if invitation.is_accepted:
        raise HTTPException(status_code=400, detail="Invitation already accepted")
    
    if invitation.expires_at and invitation.expires_at < datetime.utcnow():
        raise HTTPException(status_code=400, detail="Invitation has expired")
    
    if invitation.email != current_user.email:
        raise HTTPException(status_code=400, detail="Invitation is for a different email")
    
    # Add user to team
    crud_teams.add_team_member(db=db, team_id=invitation.team_id, user_id=current_user.id, role=invitation.role)
    
    # Mark invitation as accepted
    crud_teams.accept_invitation(db=db, invitation_id=invitation.id)
    
    return {"message": "Successfully joined the team"}

@router.get("/{team_id}/members", response_model=List[TeamMember])
def get_team_members(
    team_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all team members"""
    # Check if user is a member of the team
    if not crud_teams.is_team_member(db=db, team_id=team_id, user_id=current_user.id):
        raise HTTPException(status_code=403, detail="Not authorized to view team members")
    
    return crud_teams.get_team_members(db=db, team_id=team_id)

@router.get("/{team_id}/activity")
def get_team_activity(
    team_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get team activity feed"""
    # Check if user is a member of the team
    if not crud_teams.is_team_member(db=db, team_id=team_id, user_id=current_user.id):
        raise HTTPException(status_code=403, detail="Not authorized to view team activity")
    
    return crud_teams.get_team_activity(db=db, team_id=team_id)

@router.get("/{team_id}/progress")
def get_team_progress(
    team_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get team members' progress on roadmaps"""
    # Check if user is a member of the team
    if not crud_teams.is_team_member(db=db, team_id=team_id, user_id=current_user.id):
        raise HTTPException(status_code=403, detail="Not authorized to view team progress")
    
    return crud_teams.get_team_progress(db=db, team_id=team_id)
