from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.schemas import User, UserBase
from app.routers.auth import get_current_user
from app.crud import users as crud_users

router = APIRouter()

@router.get("/me", response_model=User)
def get_current_user_info(current_user: User = Depends(get_current_user)):
    """Get current user information"""
    return current_user

@router.get("/profile", response_model=User)
def get_user_profile(current_user: User = Depends(get_current_user)):
    """Get user profile"""
    return current_user

@router.put("/profile", response_model=User)
def update_user_profile(
    user_update: UserBase,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    
    try:
        updated_user = crud_users.update_user_profile(
            db=db, 
            user_id=current_user.id, 
            user_update=user_update
        )
        return updated_user
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
