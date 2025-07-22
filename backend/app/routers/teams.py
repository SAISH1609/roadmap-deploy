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
def create_team(team: TeamCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    team_data = team.dict()
    team_data['created_by'] = current_user.id
    db_team = crud_teams.create_team(db=db, team_data=team_data)
    crud_teams.add_team_member(db=db, team_id=db_team.id, user_id=current_user.id, role="admin")
    return db_team

@router.get("/", response_model=List[Team])
def get_user_teams(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return crud_teams.get_user_teams(db=db, user_id=current_user.id)

@router.get("/{team_id}", response_model=Team)
def get_team(team_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    team = crud_teams.get_team_by_id(db=db, team_id=team_id)
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    if not crud_teams.is_team_member(db=db, team_id=team_id, user_id=current_user.id):
        raise HTTPException(status_code=403, detail="Not authorized to view this team")
    return team

@router.post("/{team_id}/invite", status_code=status.HTTP_201_CREATED)
def invite_team_member(team_id: int, invitation: TeamInvite, background_tasks: BackgroundTasks, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    team = crud_teams.get_team_by_id(db=db, team_id=team_id)
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    user_role = crud_teams.get_user_role_in_team(db=db, team_id=team_id, user_id=current_user.id)
    if user_role not in ["admin", "manager"]:
        raise HTTPException(status_code=403, detail="Not authorized to invite members")
    invited_user = crud_teams.get_user_by_email(db=db, email=invitation.email)
    if not invited_user:
        raise HTTPException(status_code=404, detail="User not found. Only registered users can be invited to teams.")
    if crud_teams.is_team_member(db=db, team_id=team_id, user_id=invited_user.id):
        raise HTTPException(status_code=400, detail="User is already a team member")
    if crud_teams.get_pending_invitation(db=db, team_id=team_id, email=invitation.email):
        raise HTTPException(status_code=400, detail="Invitation already sent")
    
    token = secrets.token_urlsafe(32)
    expires_at = datetime.utcnow() + timedelta(days=7)
    invitation_data = {"team_id": team_id, "email": invitation.email, "role": invitation.role, "token": token, "invited_by": current_user.id, "expires_at": expires_at}
    crud_teams.create_invitation(db=db, invitation_data=invitation_data)
    background_tasks.add_task(send_team_invitation_email, invitation.email, team.name, token)
    return {"message": "Invitation sent successfully"}

@router.get("/{team_id}/invitations", response_model=List[TeamInvitation])
def get_pending_invitations(team_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    user_role = crud_teams.get_user_role_in_team(db=db, team_id=team_id, user_id=current_user.id)
    if user_role not in ["admin", "manager"]:
        raise HTTPException(status_code=403, detail="Not authorized to view invitations")
    return crud_teams.get_pending_invitations_for_team(db=db, team_id=team_id)

@router.post("/{team_id}/invitations/{invitation_id}/resend", status_code=status.HTTP_200_OK)
def resend_team_invitation(team_id: int, invitation_id: int, background_tasks: BackgroundTasks, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    user_role = crud_teams.get_user_role_in_team(db=db, team_id=team_id, user_id=current_user.id)
    if user_role not in ["admin", "manager"]:
        raise HTTPException(status_code=403, detail="Not authorized to resend invitations")
    
    invitation = crud_teams.get_invitation_by_id(db=db, invitation_id=invitation_id)
    if not invitation or invitation.team_id != team_id:
        raise HTTPException(status_code=404, detail="Invitation not found")
    
    if invitation.is_accepted:
        raise HTTPException(status_code=400, detail="Invitation has already been accepted")

    updated_invitation = crud_teams.resend_invitation(db=db, invitation=invitation)
    team = crud_teams.get_team_by_id(db=db, team_id=team_id)
    background_tasks.add_task(send_team_invitation_email, updated_invitation.email, team.name, updated_invitation.token)
    
    return {"message": "Invitation resent successfully"}

@router.delete("/{team_id}/invitations/{invitation_id}", status_code=status.HTTP_204_NO_CONTENT)
def cancel_team_invitation(team_id: int, invitation_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    user_role = crud_teams.get_user_role_in_team(db=db, team_id=team_id, user_id=current_user.id)
    if user_role not in ["admin", "manager"]:
        raise HTTPException(status_code=403, detail="Not authorized to cancel invitations")
    
    invitation = crud_teams.get_invitation_by_id(db=db, invitation_id=invitation_id)
    if not invitation or invitation.team_id != team_id:
        raise HTTPException(status_code=404, detail="Invitation not found")

    crud_teams.delete_invitation(db=db, invitation_id=invitation_id)
    return

@router.post("/join/{token}")
def accept_invitation(token: str, db: Session = Depends(get_db)):
    invitation = crud_teams.get_invitation_by_token(db=db, token=token)
    if not invitation or invitation.is_accepted or (invitation.expires_at and invitation.expires_at < datetime.now(timezone.utc)):
        raise HTTPException(status_code=404, detail="Invitation not found, already accepted, or expired")
    
    user = crud_teams.get_user_by_email(db=db, email=invitation.email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found. Please contact the team admin.")
    if crud_teams.is_team_member(db=db, team_id=invitation.team_id, user_id=user.id):
        raise HTTPException(status_code=400, detail="You are already a member of this team")
    
    crud_teams.add_team_member(db=db, team_id=invitation.team_id, user_id=user.id, role=invitation.role)
    crud_teams.accept_invitation(db=db, invitation_id=invitation.id)
    team = crud_teams.get_team_by_id(db=db, team_id=invitation.team_id)
    
    return {"message": f"Successfully joined the team '{team.name}'", "team_id": invitation.team_id}

@router.get("/{team_id}/members", response_model=List[TeamMember])
def get_team_members(team_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not crud_teams.is_team_member(db=db, team_id=team_id, user_id=current_user.id):
        raise HTTPException(status_code=403, detail="Not authorized to view team members")
    return crud_teams.get_team_members(db=db, team_id=team_id)

@router.delete("/{team_id}/leave", status_code=status.HTTP_204_NO_CONTENT)
def leave_team(team_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not crud_teams.is_team_member(db=db, team_id=team_id, user_id=current_user.id):
        raise HTTPException(status_code=403, detail="You are not a member of this team")
    crud_teams.remove_team_member(db=db, team_id=team_id, user_id=current_user.id)
    return

@router.delete("/{team_id}/members/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_team_member(team_id: int, user_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
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
def get_team_activity(team_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
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
def get_team_progress(team_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not crud_teams.is_team_member(db=db, team_id=team_id, user_id=current_user.id):
        raise HTTPException(status_code=403, detail="Not authorized to view team progress")
    return crud_teams.get_team_progress(db=db, team_id=team_id)