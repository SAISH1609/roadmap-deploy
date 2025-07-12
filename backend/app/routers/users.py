from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.schemas import User
from app.routers.auth import get_current_user

router = APIRouter()

@router.get("/me", response_model=User)
def get_current_user_info(current_user: User = Depends(get_current_user)):
    """Get current user information"""
    return current_user

@router.get("/profile", response_model=User)
def get_user_profile(current_user: User = Depends(get_current_user)):
    """Get user profile"""
    return current_user
