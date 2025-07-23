import pytest
from fastapi.testclient import TestClient

class TestAuthenticationAPI:
    """Integration tests for authentication endpoints"""
    
    def test_register_user_success(self, client):
        """Test successful user registration"""
        user_data = {
            "email": "newuser@example.com",
            "username": "newuser",
            "full_name": "New User",
            "password": "securepassword123"
        }
        
        response = client.post("/api/auth/register", json=user_data)
        
        assert response.status_code == 201
        response_data = response.json()
        assert response_data["email"] == "newuser@example.com"
        assert response_data["username"] == "newuser"
        assert response_data["full_name"] == "New User"
        assert "password" not in response_data
        assert "hashed_password" not in response_data
    
    def test_register_user_duplicate_email(self, client, create_test_user):
        """Test registration with duplicate email"""
        user_data = {
            "email": create_test_user.email,  # Duplicate email
            "username": "differentuser",
            "full_name": "Different User",
            "password": "securepassword123"
        }
        
        response = client.post("/api/auth/register", json=user_data)
        
        assert response.status_code == 400
        assert "already registered" in response.json()["detail"]
    
    def test_register_user_duplicate_username(self, client, create_test_user):
        """Test registration with duplicate username"""
        user_data = {
            "email": "different@example.com",
            "username": create_test_user.username,  # Duplicate username
            "full_name": "Different User",
            "password": "securepassword123"
        }
        
        response = client.post("/api/auth/register", json=user_data)
        
        assert response.status_code == 400
        assert "already taken" in response.json()["detail"]
    
    def test_register_user_invalid_email(self, client):
        """Test registration with invalid email format"""
        user_data = {
            "email": "invalid-email",
            "username": "testuser",
            "full_name": "Test User",
            "password": "securepassword123"
        }
        
        response = client.post("/api/auth/register", json=user_data)
        
        assert response.status_code == 422  # Validation error
    
    def test_register_user_weak_password(self, client):
        """Test registration with weak password"""
        user_data = {
            "email": "test@example.com",
            "username": "testuser",
            "full_name": "Test User",
            "password": "123"  # Too short
        }
        
        response = client.post("/api/auth/register", json=user_data)
        
        assert response.status_code == 422  # Validation error
    
    def test_login_success(self, client, create_test_user, sample_user_data):
        """Test successful login"""
        login_data = {
            "username": create_test_user.email,  # FastAPI OAuth2 uses 'username' field
            "password": sample_user_data["password"]
        }
        
        response = client.post(
            "/api/auth/login",
            data=login_data,  # Form data for OAuth2
            headers={"Content-Type": "application/x-www-form-urlencoded"}
        )
        
        assert response.status_code == 200
        response_data = response.json()
        assert "access_token" in response_data
        assert response_data["token_type"] == "bearer"
        assert len(response_data["access_token"]) > 0
    
    def test_login_wrong_password(self, client, create_test_user):
        """Test login with wrong password"""
        login_data = {
            "username": create_test_user.email,
            "password": "wrongpassword"
        }
        
        response = client.post(
            "/api/auth/login",
            data=login_data,
            headers={"Content-Type": "application/x-www-form-urlencoded"}
        )
        
        assert response.status_code == 401
        assert "Incorrect email or password" in response.json()["detail"]
    
    def test_login_nonexistent_user(self, client):
        """Test login with non-existent user"""
        login_data = {
            "username": "nonexistent@example.com",
            "password": "somepassword"
        }
        
        response = client.post(
            "/api/auth/login",
            data=login_data,
            headers={"Content-Type": "application/x-www-form-urlencoded"}
        )
        
        assert response.status_code == 401
        assert "Incorrect email or password" in response.json()["detail"]
    
    def test_get_current_user_success(self, client, auth_headers, create_test_user):
        """Test getting current user with valid token"""
        response = client.get("/api/auth/me", headers=auth_headers)
        
        assert response.status_code == 200
        response_data = response.json()
        assert response_data["email"] == create_test_user.email
        assert response_data["username"] == create_test_user.username
        assert response_data["id"] == create_test_user.id
    
    def test_get_current_user_unauthorized(self, client):
        """Test getting current user without token"""
        response = client.get("/api/auth/me")
        
        assert response.status_code == 401
        assert "Not authenticated" in response.json()["detail"]
    
    def test_get_current_user_invalid_token(self, client):
        """Test getting current user with invalid token"""
        headers = {"Authorization": "Bearer invalid_token"}
        response = client.get("/api/auth/me", headers=headers)
        
        assert response.status_code == 401

class TestProtectedRoutes:
    """Test that protected routes require authentication"""
    
    def test_create_team_requires_auth(self, client):
        """Test that creating team requires authentication"""
        team_data = {
            "name": "Test Team",
            "description": "A test team",
            "skills": ["Python"]
        }
        
        response = client.post("/api/teams/", json=team_data)
        
        assert response.status_code == 401
    
    def test_get_user_teams_requires_auth(self, client):
        """Test that getting user teams requires authentication"""
        response = client.get("/api/teams/")
        
        assert response.status_code == 401
    
    def test_protected_route_with_valid_token(self, client, auth_headers):
        """Test that protected routes work with valid token"""
        response = client.get("/api/teams/", headers=auth_headers)
        
        # Should not be unauthorized (may be 200 or other valid status)
        assert response.status_code != 401

class TestTokenExpiration:
    """Test JWT token expiration and refresh"""
    
    def test_expired_token_rejection(self, client, create_test_user):
        """Test that expired tokens are rejected"""
        from app.core.security import create_access_token
        from datetime import timedelta
        
        # Create token that expires immediately
        expired_token = create_access_token(
            data={"sub": create_test_user.email},
            expires_delta=timedelta(seconds=-1)
        )
        
        headers = {"Authorization": f"Bearer {expired_token}"}
        response = client.get("/api/auth/me", headers=headers)
        
        assert response.status_code == 401
