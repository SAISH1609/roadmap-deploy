from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.models import User
from app.core.security import verify_password, get_password_hash
from app.schemas.schemas import UserBase, UserCreate, UserUpdate

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def get_user(db: Session, user_id: int):
    """Alias for get_user_by_id for compatibility"""
    return get_user_by_id(db, user_id)

def get_users(db: Session, skip: int = 0, limit: int = 100) -> List[User]:
    """Get all users with pagination"""
    return db.query(User).offset(skip).limit(limit).all()

def create_user(db: Session, user_data: dict):
    db_user = User(**user_data)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def create_user_admin(db: Session, user: UserCreate) -> User:
    """Create user via admin"""
    hashed_password = get_password_hash(user.password)
    user_data = user.dict()
    user_data.pop('password')
    user_data['hashed_password'] = hashed_password
    
    db_user = User(**user_data)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user_admin(db: Session, user_id: int, user_update: UserUpdate) -> Optional[User]:
    """Update user via admin"""
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        return None
    
    update_data = user_update.dict(exclude_unset=True)
    
    # Hash password if provided and not empty
    if 'password' in update_data and update_data['password']:
        update_data['hashed_password'] = get_password_hash(update_data.pop('password'))
    elif 'password' in update_data:
        # Remove empty password field
        update_data.pop('password')
    
    for key, value in update_data.items():
        setattr(db_user, key, value)
    
    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user(db: Session, user_id: int) -> bool:
    """Delete user (hard delete with cascade)"""
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user:
        # Delete related records first to avoid foreign key constraints
        from app.models.models import UserProgress, UserActivity, TeamMembership
        
        # Delete user progress records
        db.query(UserProgress).filter(UserProgress.user_id == user_id).delete()
        
        # Delete user activities
        db.query(UserActivity).filter(UserActivity.user_id == user_id).delete()
        
        # Delete team memberships
        db.query(TeamMembership).filter(TeamMembership.user_id == user_id).delete()
        
        # Delete user bookmarks (handled by secondary table, should auto-delete)
        
        # Finally delete the user
        db.delete(db_user)
        db.commit()
        return True
    return False

def deactivate_user(db: Session, user_id: int) -> bool:
    """Deactivate user (soft delete)"""
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user:
        db_user.is_active = False
        db.commit()
        return True
    return False

def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

def update_user(db: Session, user_id: int, user_data: dict):
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user:
        for key, value in user_data.items():
            setattr(db_user, key, value)
        db.commit()
        db.refresh(db_user)
    return db_user

def update_user_profile(db: Session, user_id: int, user_update: UserBase):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        return None
    
    # Update only the fields that are provided
    update_data = user_update.dict(exclude_unset=True)
    
    # Dont allow pass edit
    if 'password' in update_data:
        del update_data['password']
    
    for key, value in update_data.items():
        setattr(db_user, key, value)
    
    db.commit()
    db.refresh(db_user)
    return db_user
