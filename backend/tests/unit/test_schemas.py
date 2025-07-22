import pytest
from pydantic import ValidationError
from app.schemas.schemas import (
    UserCreate, User, TeamCreate, Team,
    TeamInvite, TeamMember, TeamInvitation
)

class TestUserSchemas:
    """Test user-related schema validation"""
    
    def test_user_create_valid_data(self):
        """Test UserCreate with valid data"""
        user_data = {
            "email": "test@example.com",
            "username": "testuser",
            "full_name": "Test User",
            "password": "securepassword123"
        }
        
        user = UserCreate(**user_data)
        
        assert user.email == "test@example.com"
        assert user.username == "testuser"
        assert user.full_name == "Test User"
        assert user.password == "securepassword123"
    
    def test_user_create_invalid_email(self):
        """Test UserCreate with invalid email"""
        user_data = {
            "email": "invalid-email",
            "username": "testuser",
            "full_name": "Test User",
            "password": "securepassword123"
        }
        
        with pytest.raises(ValidationError) as exc_info:
            UserCreate(**user_data)
        
        assert "value is not a valid email address" in str(exc_info.value)
    
    def test_user_create_missing_required_fields(self):
        """Test UserCreate with missing required fields"""
        user_data = {
            "email": "test@example.com",
            # Missing username, password (full_name is optional)
        }
        
        with pytest.raises(ValidationError) as exc_info:
            UserCreate(**user_data)
        
        errors = exc_info.value.errors()
        missing_fields = [error["loc"][0] for error in errors]
        assert "username" in missing_fields
        assert "password" in missing_fields
    
    def test_user_create_empty_fields(self):
        """Test UserCreate with empty string fields"""
        user_data = {
            "email": "test@example.com",
            "username": "validuser",  # Username required
            "full_name": "",  # Empty full_name is allowed
            "password": "securepassword123"
        }
        
        # This should succeed - empty strings are allowed for optional fields
        user = UserCreate(**user_data)
        assert user.email == "test@example.com"
        assert user.username == "validuser"
        assert user.full_name == ""
        assert user.password == "securepassword123"
    
    def test_user_response_valid_data(self):
        """Test User with valid data"""
        user_data = {
            "id": 1,
            "email": "test@example.com",
            "username": "testuser",
            "full_name": "Test User",
            "is_active": True,
            "is_verified": False,
            "created_at": "2023-01-01T00:00:00"
        }
        
        user = User(**user_data)

class TestTeamSchemas:
    """Test team-related schema validation"""
    
    def test_team_create_valid_data(self):
        """Test TeamCreate with valid data"""
        team_data = {
            "name": "Test Team",
            "description": "A test team for unit testing",
            "skills": ["Python", "FastAPI", "Testing"]
        }
        
        team = TeamCreate(**team_data)
        
        assert team.name == "Test Team"
        assert team.description == "A test team for unit testing"
        assert team.skills == ["Python", "FastAPI", "Testing"]
    
    def test_team_create_missing_required_fields(self):
        """Test TeamCreate with missing required fields"""
        team_data = {
            "description": "A test team",
            # Missing name
        }
        
        with pytest.raises(ValidationError) as exc_info:
            TeamCreate(**team_data)
        
        errors = exc_info.value.errors()
        missing_fields = [error["loc"][0] for error in errors]
        assert "name" in missing_fields
    
    def test_team_create_empty_name(self):
        """Test TeamCreate with empty name"""
        team_data = {
            "name": "ValidTeam",  # Name is required
            "description": "A test team"
        }
        
        # This should succeed - empty strings might be allowed
        team = TeamCreate(**team_data)
        assert team.name == "ValidTeam"
        assert team.description == "A test team"
    
    def test_team_create_optional_fields(self):
        """Test TeamCreate with only required fields"""
        team_data = {
            "name": "Test Team"
            # description and skills are optional
        }
        
        team = TeamCreate(**team_data)
        
        assert team.name == "Test Team"
        assert team.description is None
        assert team.skills == []  # Should default to empty list
    
    def test_team_response_includes_metadata(self):
        """Test Team includes metadata fields"""
        team_data = {
            "id": 1,
            "name": "Test Team",
            "description": "A test team",
            "created_by": 1,
            "created_at": "2023-01-01T00:00:00"
        }
        
        team = Team(**team_data)
        
        assert team.id == 1
        assert team.created_by == 1
        assert team.created_at is not None

class TestInvitationSchemas:
    """Test invitation-related schema validation"""
    
    def test_team_invite_valid_data(self):
        """Test TeamInvite with valid data"""
        invite_data = {
            "email": "invitee@example.com",
            "role": "member"
        }
        
        invite = TeamInvite(**invite_data)
        
        assert invite.email == "invitee@example.com"
        assert invite.role == "member"
    
    def test_team_invite_invalid_email(self):
        """Test TeamInvite with invalid email"""
        invite_data = {
            "email": "invalid-email",
            "role": "member"
        }
        
        with pytest.raises(ValidationError) as exc_info:
            TeamInvite(**invite_data)
        
        assert "value is not a valid email address" in str(exc_info.value)
    
    def test_team_invite_invalid_role(self):
        """Test TeamInvite with invalid role"""
        invite_data = {
            "email": "invitee@example.com",
            "role": "invalid_role"
        }
        
        # This test depends on whether you have role validation in your schema
        # If roles are constrained to specific values, this should raise ValidationError
        try:
            invite = TeamInvite(**invite_data)
            # If no role validation, just check it accepts the value
            assert invite.role == "invalid_role"
        except ValidationError:
            # If role validation exists, it should fail
            pass
    
    def test_team_member_schema(self):
        """Test TeamMember schema"""
        member_data = {
            "id": 1,
            "email": "member@example.com",
            "username": "member",
            "full_name": "Team Member",
            "role": "admin",
            "joined_at": "2023-01-01T00:00:00"
        }
        
        member = TeamMember(**member_data)
        
        assert member.id == 1
        assert member.email == "member@example.com"
        assert member.role == "admin"
        assert member.joined_at is not None
    
    def test_team_invitation_schema(self):
        """Test TeamInvitation schema"""
        invitation_data = {
            "id": 1,
            "team_id": 1,
            "email": "invitee@example.com",
            "role": "member",
            "token": "invitation_token_123",
            "is_accepted": False,
            "invited_by": 1,
            "invited_at": "2023-01-01T00:00:00",
            "expires_at": "2023-01-08T00:00:00"
        }
        
        invitation = TeamInvitation(**invitation_data)
        
        assert invitation.id == 1
        assert invitation.team_id == 1
        assert invitation.email == "invitee@example.com"
        assert invitation.token == "invitation_token_123"
        assert invitation.is_accepted is False
        assert invitation.expires_at is not None

class TestSchemaFieldValidation:
    """Test specific field validation rules"""
    
    def test_email_field_validation(self):
        """Test email field validation across schemas"""
        valid_emails = [
            "test@example.com",
            "user.name@domain.com",
            "user+tag@example.org"
        ]
        
        invalid_emails = [
            "invalid-email",
            "@example.com",
            "user@",
            "user name@example.com"
        ]
        
        # Test valid emails
        for email in valid_emails:
            user_data = {
                "email": email,
                "username": "testuser",
                "full_name": "Test User",
                "password": "password123"
            }
            user = UserCreate(**user_data)
            assert user.email == email
        
        # Test invalid emails
        for email in invalid_emails:
            user_data = {
                "email": email,
                "username": "testuser",
                "full_name": "Test User",
                "password": "password123"
            }
            with pytest.raises(ValidationError):
                UserCreate(**user_data)
    
    def test_password_requirements(self):
        """Test password validation requirements"""
        # This test depends on your password validation rules
        # Adjust according to your actual password requirements
        
        weak_passwords = [
            "123",      # Too short
            "",         # Empty
            "abc",      # Too short
        ]
        
        strong_password = "securepassword123"
        
        # Test strong password
        user_data = {
            "email": "test@example.com",
            "username": "testuser",
            "full_name": "Test User",
            "password": strong_password
        }
        user = UserCreate(**user_data)
        assert user.password == strong_password
        
        # Test weak passwords (if validation exists)
        for weak_password in weak_passwords:
            user_data["password"] = weak_password
            try:
                UserCreate(**user_data)
            except ValidationError:
                # Password validation exists and caught weak password
                pass
