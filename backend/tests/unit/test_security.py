import pytest
from unittest.mock import patch
from app.core.security import (
    verify_password,
    get_password_hash,
    create_access_token,
    verify_token
)

class TestPasswordSecurity:
    """Test password hashing and verification"""
    
    def test_password_hashing(self):
        """Test that password is properly hashed"""
        password = "testpassword123"
        hashed = get_password_hash(password)
        
        # Hashed password should be different from original
        assert hashed != password
        assert len(hashed) > 0
        assert hashed.startswith("$2b$")  # bcrypt format
    
    def test_password_verification_success(self):
        """Test successful password verification"""
        password = "testpassword123"
        hashed = get_password_hash(password)
        
        assert verify_password(password, hashed) is True
    
    def test_password_verification_failure(self):
        """Test failed password verification with wrong password"""
        password = "testpassword123"
        wrong_password = "wrongpassword"
        hashed = get_password_hash(password)
        
        assert verify_password(wrong_password, hashed) is False
    
    def test_empty_password_handling(self):
        """Test handling of empty passwords"""
        with pytest.raises(ValueError):
            get_password_hash("")
        
        with pytest.raises(ValueError):
            verify_password("", "somehash")

class TestJWTTokens:
    """Test JWT token creation and verification"""
    
    def test_create_access_token(self):
        """Test JWT token creation"""
        data = {"sub": "test@example.com"}
        token = create_access_token(data)
        
        assert isinstance(token, str)
        assert len(token) > 0
        assert token.count('.') == 2  # JWT format: header.payload.signature
    
    def test_create_access_token_with_expiry(self):
        """Test JWT token creation with custom expiry"""
        from datetime import timedelta
        
        data = {"sub": "test@example.com"}
        token = create_access_token(data, expires_delta=timedelta(minutes=15))
        
        assert isinstance(token, str)
        assert len(token) > 0
    
    def test_verify_valid_token(self):
        """Test verification of valid JWT token"""
        data = {"sub": "test@example.com"}
        token = create_access_token(data)
        
        payload = verify_token(token)
        assert payload["sub"] == "test@example.com"
        assert "exp" in payload
    
    def test_verify_invalid_token(self):
        """Test verification of invalid JWT token"""
        invalid_token = "invalid.jwt.token"
        
        with pytest.raises(Exception):  # Should raise JWT decode error
            verify_token(invalid_token)
    
    def test_verify_expired_token(self):
        """Test verification of expired JWT token"""
        from datetime import timedelta
        
        data = {"sub": "test@example.com"}
        # Create token that expires immediately
        token = create_access_token(data, expires_delta=timedelta(seconds=-1))
        
        with pytest.raises(Exception):  # Should raise expired token error
            verify_token(token)
