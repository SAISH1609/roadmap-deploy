from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.orm import Session
from typing import List
import secrets
from datetime import datetime, timedelta, timezone

from app.database import get_db
from app.schemas.schemas import Team, TeamCreate, TeamInvite, TeamMember, TeamInvitation, UserActivityWithUser
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
    # Create team (now handles skills internally)
    team_data = team.dict()
    team_data['created_by'] = current_user.id
    db_team = crud_teams.create_team(db=db, team_data=team_data)
    
    # Add creator as admin
    crud_teams.add_team_member(db=db, team_id=db_team.id, user_id=current_user.id, role="admin")
    
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
    background_tasks: BackgroundTasks,
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
    
    # Check if user exists in the database since only registered users can be invited
    invited_user = crud_teams.get_user_by_email(db=db, email=invitation.email)
    if not invited_user:
        raise HTTPException(status_code=404, detail="User not found. Only registered users can be invited to teams.")
    
    # Check if user is already a member
    if crud_teams.is_team_member(db=db, team_id=team_id, user_id=invited_user.id):
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
    
    # Send email invitation asynchronously
    background_tasks.add_task(send_team_invitation_email, invitation.email, team.name, token)

    return {"message": "Invitation sent successfully"}

@router.post("/join/{token}")
def accept_invitation(
    token: str,
    db: Session = Depends(get_db)
):
    """Accept team invitation (no authentication required, for registered users only)"""
    invitation = crud_teams.get_invitation_by_token(db=db, token=token)
    if not invitation:
        raise HTTPException(status_code=404, detail="Invalid invitation token")
    
    if invitation.is_accepted:
        raise HTTPException(status_code=400, detail="Invitation already accepted")
    
    if invitation.expires_at and invitation.expires_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=400, detail="Invitation has expired")
    
    # Get the user
    user = crud_teams.get_user_by_email(db=db, email=invitation.email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found. Please contact the team admin.")
    
    # Check if user is already a team member
    if crud_teams.is_team_member(db=db, team_id=invitation.team_id, user_id=user.id):
        raise HTTPException(status_code=400, detail="You are already a member of this team")
    
    # Add user to the team
    crud_teams.add_team_member(db=db, team_id=invitation.team_id, user_id=user.id, role=invitation.role)
    
    # Mark invitation as accepted
    crud_teams.accept_invitation(db=db, invitation_id=invitation.id)
    
    # Get team information for response
    team = crud_teams.get_team_by_id(db=db, team_id=invitation.team_id)
    
    return {
        "message": f"Successfully joined the team '{team.name}'",
        "action": "joined",
        "team_id": invitation.team_id,
        "team_name": team.name,
        "role": invitation.role,
        "user_email": invitation.email
    }

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

@router.delete("/{team_id}/leave", status_code=status.HTTP_204_NO_CONTENT)
def leave_team(
    team_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Leave a team"""
    if not crud_teams.is_team_member(db=db, team_id=team_id, user_id=current_user.id):
        raise HTTPException(status_code=403, detail="You are not a member of this team")
    
    crud_teams.remove_team_member(db=db, team_id=team_id, user_id=current_user.id)
    return

@router.delete("/{team_id}/members/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_team_member(
    team_id: int,
    user_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Remove a member from the team (admin only)"""
    user_role = crud_teams.get_user_role_in_team(db=db, team_id=team_id, user_id=current_user.id)
    if user_role not in ["admin"]:
        raise HTTPException(status_code=403, detail="Not authorized to remove members")
        
    if current_user.id == user_id:
        raise HTTPException(status_code=400, detail="Admin cannot remove themselves, use the leave team endpoint")

    if not crud_teams.is_team_member(db=db, team_id=team_id, user_id=user_id):
        raise HTTPException(status_code=404, detail="User is not a member of this team")

    crud_teams.remove_team_member(db=db, team_id=team_id, user_id=user_id)
    return

@router.get("/{team_id}/activity", response_model=List[UserActivityWithUser])
def get_team_activity(
    team_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get team activity feed"""
    # Check if user is a member of the team
    if not crud_teams.is_team_member(db=db, team_id=team_id, user_id=current_user.id):
        raise HTTPException(status_code=403, detail="Not authorized to view team activity")
    
    activities_with_users = crud_teams.get_team_activity(db=db, team_id=team_id)
    
    response = []
    for activity, user in activities_with_users:
        activity_data = activity.__dict__
        activity_data['user'] = user
        response.append(activity_data)
        
    return response

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
