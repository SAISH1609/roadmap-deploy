import pytest
from unittest.mock import Mock, patch
from sqlalchemy.orm import Session
from app.crud.users import (
    get_user_by_email,
    get_user_by_username,
    create_user,
    authenticate_user,
    get_user_by_id
)
from app.models.models import User
from app.core.security import get_password_hash

class TestUserCRUD:
    """Test user CRUD operations"""
    
    def test_create_user_success(self, test_db):
        """Test successful user creation"""
        user_data = {
            "email": "test@example.com",
            "username": "testuser",
            "full_name": "Test User",
            "hashed_password": get_password_hash("password123")
        }
        
        user = create_user(test_db, user_data)
        
        assert user.email == "test@example.com"
        assert user.username == "testuser"
        assert user.full_name == "Test User"
        assert user.hashed_password != "password123"  # Should be hashed
        assert user.is_active is True
        assert user.is_verified is False
        assert user.id is not None
    
    def test_get_user_by_email_exists(self, test_db, create_test_user):
        """Test getting user by email when user exists"""
        user = get_user_by_email(test_db, email=create_test_user.email)
        
        assert user is not None
        assert user.email == create_test_user.email
        assert user.id == create_test_user.id
    
    def test_get_user_by_email_not_exists(self, test_db):
        """Test getting user by email when user doesn't exist"""
        user = get_user_by_email(test_db, email="nonexistent@example.com")
        
        assert user is None
    
    def test_get_user_by_username_exists(self, test_db, create_test_user):
        """Test getting user by username when user exists"""
        user = get_user_by_username(test_db, username=create_test_user.username)
        
        assert user is not None
        assert user.username == create_test_user.username
        assert user.id == create_test_user.id
    
    def test_get_user_by_username_not_exists(self, test_db):
        """Test getting user by username when user doesn't exist"""
        user = get_user_by_username(test_db, username="nonexistent")
        
        assert user is None
    
    def test_get_user_by_id_exists(self, test_db, create_test_user):
        """Test getting user by ID when user exists"""
        user = get_user_by_id(test_db, user_id=create_test_user.id)
        
        assert user is not None
        assert user.id == create_test_user.id
        assert user.email == create_test_user.email
    
    def test_get_user_by_id_not_exists(self, test_db):
        """Test getting user by ID when user doesn't exist"""
        user = get_user_by_id(test_db, user_id=99999)
        
        assert user is None
    
    def test_authenticate_user_success(self, test_db, create_test_user, sample_user_data):
        """Test successful user authentication"""
        user = authenticate_user(
            test_db, 
            email=create_test_user.email, 
            password=sample_user_data["password"]
        )
        
        assert user is not None
        assert user.email == create_test_user.email
    
    def test_authenticate_user_wrong_password(self, test_db, create_test_user):
        """Test authentication with wrong password"""
        user = authenticate_user(
            test_db, 
            email=create_test_user.email, 
            password="wrongpassword"
        )
        
        assert user is False
    
    def test_authenticate_user_nonexistent(self, test_db):
        """Test authentication with nonexistent user"""
        user = authenticate_user(
            test_db, 
            email="nonexistent@example.com", 
            password="password123"
        )
        
        assert user is False

class TestUserValidation:
    """Test user data validation"""
    
    def test_duplicate_email_constraint(self, test_db, create_test_user):
        """Test that duplicate email raises constraint error"""
        user_data = {
            "email": create_test_user.email,  # Same email
            "username": "different_username",
            "full_name": "Different User",
            "hashed_password": get_password_hash("password123")
        }
        
        with pytest.raises(Exception):  # Should raise integrity error
            create_user(test_db, user_data)
            test_db.commit()
    
    def test_duplicate_username_constraint(self, test_db, create_test_user):
        """Test that duplicate username raises constraint error"""
        user_data = {
            "email": "different@example.com",
            "username": create_test_user.username,  # Same username
            "full_name": "Different User",
            "hashed_password": get_password_hash("password123")
        }
        
        with pytest.raises(Exception):  # Should raise integrity error
            create_user(test_db, user_data)
            test_db.commit()
