"""
Simple test to verify the testing setup works
"""
import pytest

def test_basic_functionality():
    """Test that basic Python functionality works"""
    assert 1 + 1 == 2
    assert "hello" + " world" == "hello world"
    assert [1, 2, 3] == [1, 2, 3]

def test_imports():
    """Test that we can import our application modules"""
    try:
        from app.core.security import get_password_hash, verify_password
        from app.models.models import User, Team
        from app.schemas.schemas import UserCreate, TeamCreate
        
        # Test password hashing
        password = "testpassword123"
        hashed = get_password_hash(password)
        assert verify_password(password, hashed)
        
    except ImportError as e:
        pytest.fail(f"Import failed: {e}")

def test_environment():
    """Test that environment variables can be loaded"""
    import os
    from dotenv import load_dotenv
    
    load_dotenv()
    
    # These should exist in your .env file
    database_url = os.getenv("DATABASE_URL")
    assert database_url is not None
    assert len(database_url) > 0
