import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
from unittest.mock import Mock
import os
import tempfile
import sys

# Add the app root directory to Python path
sys.path.insert(0, '/app')

from app.database import get_db, Base
from main import app  # Import from the root main.py
from app.models.models import User, Team, TeamMembership, TeamInvitation

# Create test database
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture(scope="function")
def test_db():
    """Create a fresh database for each test"""
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
        Base.metadata.drop_all(bind=engine)

@pytest.fixture(scope="function")
def client(test_db):
    """Create a test client with database dependency override"""
    def override_get_db():
        try:
            yield test_db
        finally:
            test_db.close()
    
    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()

@pytest.fixture
def sample_user_data():
    """Sample user data for testing"""
    return {
        "email": "test@example.com",
        "username": "testuser",
        "full_name": "Test User",
        "password": "testpassword123"
    }

@pytest.fixture
def sample_team_data():
    """Sample team data for testing"""
    return {
        "name": "Test Team",
        "description": "A test team for unit testing",
        "skills": ["Python", "FastAPI", "Testing"]
    }

@pytest.fixture
def create_test_user(test_db, sample_user_data):
    """Create a test user in the database"""
    from app.crud.users import create_user
    from app.core.security import get_password_hash
    
    user_data = sample_user_data.copy()
    user_data["hashed_password"] = get_password_hash(user_data.pop("password"))
    user = create_user(test_db, user_data)
    test_db.commit()
    test_db.refresh(user)
    return user

@pytest.fixture
def create_test_team(test_db, create_test_user, sample_team_data):
    """Create a test team in the database"""
    from app.crud.teams import create_team
    
    team_data = sample_team_data.copy()
    team_data["created_by"] = create_test_user.id
    team = create_team(test_db, team_data)
    test_db.commit()
    test_db.refresh(team)
    return team

@pytest.fixture
def auth_headers(create_test_user):
    """Create authentication headers for test user"""
    from app.core.security import create_access_token
    
    access_token = create_access_token(data={"sub": create_test_user.email})
    return {"Authorization": f"Bearer {access_token}"}

@pytest.fixture
def mock_email_service():
    """Mock email service to avoid sending real emails during tests"""
    from unittest.mock import patch
    with patch('app.services.email_service.send_team_invitation_email') as mock:
        mock.return_value = {"status": "sent", "message": "Email sent successfully"}
        yield mock
