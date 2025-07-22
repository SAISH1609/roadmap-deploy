import pytest
from unittest.mock import Mock, patch
from datetime import datetime, timedelta, timezone
from app.crud.teams import (
    create_team,
    get_team_by_id,
    get_user_teams,
    add_team_member,
    is_team_member,
    create_invitation,
    get_invitation_by_token,
    accept_invitation,
    get_team_members
)
from app.models.models import Team, TeamMembership, TeamInvitation

class TestTeamCRUD:
    """Test team CRUD operations"""
    
    def test_create_team_success(self, test_db, create_test_user):
        """Test successful team creation"""
        team_data = {
            "name": "Test Team",
            "description": "A test team",
            "skills": ["Python", "FastAPI"],
            "created_by": create_test_user.id
        }
        
        team = create_team(test_db, team_data)
        
        assert team.name == "Test Team"
        assert team.description == "A test team"
        assert team.created_by == create_test_user.id
        assert team.id is not None
        assert team.created_at is not None
    
    def test_get_team_by_id_exists(self, test_db, create_test_team):
        """Test getting team by ID when team exists"""
        team = get_team_by_id(test_db, team_id=create_test_team.id)
        
        assert team is not None
        assert team.id == create_test_team.id
        assert team.name == create_test_team.name
    
    def test_get_team_by_id_not_exists(self, test_db):
        """Test getting team by ID when team doesn't exist"""
        team = get_team_by_id(test_db, team_id=99999)
        
        assert team is None
    
    def test_get_user_teams(self, test_db, create_test_user, create_test_team):
        """Test getting teams for a user"""
        # Add user as team member
        add_team_member(test_db, team_id=create_test_team.id, user_id=create_test_user.id, role="member")
        
        teams = get_user_teams(test_db, user_id=create_test_user.id)
        
        assert len(teams) == 1
        assert teams[0].id == create_test_team.id
    
    def test_get_user_teams_no_teams(self, test_db, create_test_user):
        """Test getting teams for user with no teams"""
        teams = get_user_teams(test_db, user_id=create_test_user.id)
        
        assert len(teams) == 0

class TestTeamMembership:
    """Test team membership operations"""
    
    def test_add_team_member_success(self, test_db, create_test_team, create_test_user):
        """Test successfully adding a team member"""
        membership = add_team_member(
            test_db, 
            team_id=create_test_team.id, 
            user_id=create_test_user.id, 
            role="member"
        )
        
        assert membership.team_id == create_test_team.id
        assert membership.user_id == create_test_user.id
        assert membership.role == "member"
        assert membership.joined_at is not None
    
    def test_is_team_member_true(self, test_db, create_test_team, create_test_user):
        """Test checking if user is team member (when they are)"""
        add_team_member(test_db, team_id=create_test_team.id, user_id=create_test_user.id, role="member")
        
        is_member = is_team_member(test_db, team_id=create_test_team.id, user_id=create_test_user.id)
        
        assert is_member is True
    
    def test_is_team_member_false(self, test_db, create_test_team, create_test_user):
        """Test checking if user is team member (when they're not)"""
        is_member = is_team_member(test_db, team_id=create_test_team.id, user_id=create_test_user.id)
        
        assert is_member is False
    
    def test_get_team_members(self, test_db, create_test_team, create_test_user):
        """Test getting all team members"""
        add_team_member(test_db, team_id=create_test_team.id, user_id=create_test_user.id, role="admin")
        
        members = get_team_members(test_db, team_id=create_test_team.id)
        
        assert len(members) == 1
        assert members[0].id == create_test_user.id
        assert members[0].email == create_test_user.email

class TestTeamInvitations:
    """Test team invitation operations"""
    
    def test_create_invitation_success(self, test_db, create_test_team):
        """Test successful invitation creation"""
        invitation_data = {
            "team_id": create_test_team.id,
            "email": "invitee@example.com",
            "role": "member",
            "invited_by": create_test_team.created_by
        }
        
        invitation = create_invitation(test_db, invitation_data)
        
        assert invitation.team_id == create_test_team.id
        assert invitation.email == "invitee@example.com"
        assert invitation.role == "member"
        assert invitation.token is not None
        assert len(invitation.token) > 0
        assert invitation.is_accepted is False
        assert invitation.expires_at > datetime.now(timezone.utc)
    
    def test_get_invitation_by_token_exists(self, test_db, create_test_team):
        """Test getting invitation by token when it exists"""
        invitation_data = {
            "team_id": create_test_team.id,
            "email": "invitee@example.com",
            "role": "member",
            "invited_by": create_test_team.created_by
        }
        
        created_invitation = create_invitation(test_db, invitation_data)
        
        found_invitation = get_invitation_by_token(test_db, token=created_invitation.token)
        
        assert found_invitation is not None
        assert found_invitation.id == created_invitation.id
        assert found_invitation.token == created_invitation.token
    
    def test_get_invitation_by_token_not_exists(self, test_db):
        """Test getting invitation by token when it doesn't exist"""
        invitation = get_invitation_by_token(test_db, token="nonexistent_token")
        
        assert invitation is None
    
    def test_accept_invitation_success(self, test_db, create_test_team):
        """Test successfully accepting an invitation"""
        invitation_data = {
            "team_id": create_test_team.id,
            "email": "invitee@example.com",
            "role": "member",
            "invited_by": create_test_team.created_by
        }
        
        invitation = create_invitation(test_db, invitation_data)
        original_id = invitation.id
        
        updated_invitation = accept_invitation(test_db, invitation_id=invitation.id)
        
        assert updated_invitation.id == original_id
        assert updated_invitation.is_accepted is True
        assert updated_invitation.accepted_at is not None
    
    def test_invitation_expiry(self, test_db, create_test_team):
        """Test that invitations have proper expiry dates"""
        invitation_data = {
            "team_id": create_test_team.id,
            "email": "invitee@example.com",
            "role": "member",
            "invited_by": create_test_team.created_by
        }
        
        invitation = create_invitation(test_db, invitation_data)
        
        # Should expire in 7 days (default)
        expected_expiry = datetime.now(timezone.utc) + timedelta(days=7)
        time_diff = abs((invitation.expires_at - expected_expiry).total_seconds())
        
        # Should be within 60 seconds of expected expiry
        assert time_diff < 60
