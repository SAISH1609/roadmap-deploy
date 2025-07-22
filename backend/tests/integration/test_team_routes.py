import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch

class TestTeamInvitationAPI:
    """Integration tests for team invitation API endpoints"""
    
    def test_invite_user_success(self, client, auth_headers, create_test_team, mock_email_service):
        """Test successful user invitation"""
        invitation_data = {
            "email": "newuser@example.com",
            "role": "member"
        }
        
        response = client.post(
            f"/api/teams/{create_test_team.id}/invite",
            json=invitation_data,
            headers=auth_headers
        )
        
        assert response.status_code == 200
        assert response.json()["message"] == "Invitation sent successfully"
        mock_email_service.assert_called_once()
    
    def test_invite_user_unauthorized(self, client, create_test_team):
        """Test invitation without authentication"""
        invitation_data = {
            "email": "newuser@example.com",
            "role": "member"
        }
        
        response = client.post(
            f"/api/teams/{create_test_team.id}/invite",
            json=invitation_data
        )
        
        assert response.status_code == 401
    
    def test_invite_user_team_not_found(self, client, auth_headers, mock_email_service):
        """Test invitation to non-existent team"""
        invitation_data = {
            "email": "newuser@example.com",
            "role": "member"
        }
        
        response = client.post(
            "/api/teams/99999/invite",
            json=invitation_data,
            headers=auth_headers
        )
        
        assert response.status_code == 404
        assert "Team not found" in response.json()["detail"]
    
    def test_invite_user_invalid_email(self, client, auth_headers, create_test_team, mock_email_service):
        """Test invitation with invalid email format"""
        invitation_data = {
            "email": "invalid-email",
            "role": "member"
        }
        
        response = client.post(
            f"/api/teams/{create_test_team.id}/invite",
            json=invitation_data,
            headers=auth_headers
        )
        
        assert response.status_code == 422  # Validation error
    
    def test_accept_invitation_success(self, client, test_db, create_test_team, sample_user_data):
        """Test successful invitation acceptance"""
        # Create a user to invite
        from app.crud.users import create_user
        from app.core.security import get_password_hash
        
        user_data = sample_user_data.copy()
        user_data["email"] = "invitee@example.com"
        user_data["hashed_password"] = get_password_hash(user_data.pop("password"))
        invitee = create_user(test_db, user_data)
        test_db.commit()
        
        # Create invitation
        from app.crud.teams import create_invitation
        invitation_data = {
            "team_id": create_test_team.id,
            "email": invitee.email,
            "role": "member",
            "invited_by": create_test_team.created_by
        }
        invitation = create_invitation(test_db, invitation_data)
        test_db.commit()
        
        # Accept invitation
        response = client.post(f"/api/teams/join/{invitation.token}")
        
        assert response.status_code == 200
        response_data = response.json()
        assert response_data["message"] == f"Successfully joined the team '{create_test_team.name}'"
        assert response_data["team_id"] == create_test_team.id
        assert response_data["team_name"] == create_test_team.name
        assert response_data["role"] == "member"
    
    def test_accept_invitation_invalid_token(self, client):
        """Test accepting invitation with invalid token"""
        response = client.post("/api/teams/join/invalid_token")
        
        assert response.status_code == 404
        assert "Invalid invitation token" in response.json()["detail"]
    
    def test_accept_invitation_already_accepted(self, client, test_db, create_test_team, sample_user_data):
        """Test accepting already accepted invitation"""
        # Create a user to invite
        from app.crud.users import create_user
        from app.core.security import get_password_hash
        
        user_data = sample_user_data.copy()
        user_data["email"] = "invitee@example.com"
        user_data["hashed_password"] = get_password_hash(user_data.pop("password"))
        invitee = create_user(test_db, user_data)
        test_db.commit()
        
        # Create and accept invitation
        from app.crud.teams import create_invitation, accept_invitation
        invitation_data = {
            "team_id": create_test_team.id,
            "email": invitee.email,
            "role": "member",
            "invited_by": create_test_team.created_by
        }
        invitation = create_invitation(test_db, invitation_data)
        accept_invitation(test_db, invitation.id)
        test_db.commit()
        
        # Try to accept again
        response = client.post(f"/api/teams/join/{invitation.token}")
        
        assert response.status_code == 400
        assert "already accepted" in response.json()["detail"]
    
    def test_accept_invitation_user_not_exists(self, client, test_db, create_test_team):
        """Test accepting invitation for non-existent user"""
        # Create invitation for non-existent user
        from app.crud.teams import create_invitation
        invitation_data = {
            "team_id": create_test_team.id,
            "email": "nonexistent@example.com",
            "role": "member",
            "invited_by": create_test_team.created_by
        }
        invitation = create_invitation(test_db, invitation_data)
        test_db.commit()
        
        # Try to accept invitation
        response = client.post(f"/api/teams/join/{invitation.token}")
        
        assert response.status_code == 404
        assert "User not found" in response.json()["detail"]
    
    def test_accept_invitation_already_team_member(self, client, test_db, create_test_team, sample_user_data):
        """Test accepting invitation when user is already a team member"""
        # Create a user
        from app.crud.users import create_user
        from app.crud.teams import create_invitation, add_team_member
        from app.core.security import get_password_hash
        
        user_data = sample_user_data.copy()
        user_data["email"] = "invitee@example.com"
        user_data["hashed_password"] = get_password_hash(user_data.pop("password"))
        invitee = create_user(test_db, user_data)
        test_db.commit()
        
        # Add user to team
        add_team_member(test_db, create_test_team.id, invitee.id, "member")
        test_db.commit()
        
        # Create invitation
        invitation_data = {
            "team_id": create_test_team.id,
            "email": invitee.email,
            "role": "member",
            "invited_by": create_test_team.created_by
        }
        invitation = create_invitation(test_db, invitation_data)
        test_db.commit()
        
        # Try to accept invitation
        response = client.post(f"/api/teams/join/{invitation.token}")
        
        assert response.status_code == 400
        assert "already a member" in response.json()["detail"]

class TestTeamMembersAPI:
    """Integration tests for team members API"""
    
    def test_get_team_members_success(self, client, auth_headers, create_test_team, create_test_user, test_db):
        """Test getting team members successfully"""
        from app.crud.teams import add_team_member
        
        # Add user to team
        add_team_member(test_db, create_test_team.id, create_test_user.id, "admin")
        test_db.commit()
        
        response = client.get(
            f"/api/teams/{create_test_team.id}/members",
            headers=auth_headers
        )
        
        assert response.status_code == 200
        members = response.json()
        assert len(members) == 1
        assert members[0]["email"] == create_test_user.email
        assert members[0]["role"] == "admin"
    
    def test_get_team_members_unauthorized(self, client, create_test_team):
        """Test getting team members without authentication"""
        response = client.get(f"/api/teams/{create_test_team.id}/members")
        
        assert response.status_code == 401
    
    def test_get_team_members_team_not_found(self, client, auth_headers):
        """Test getting members of non-existent team"""
        response = client.get("/api/teams/99999/members", headers=auth_headers)
        
        assert response.status_code == 404
