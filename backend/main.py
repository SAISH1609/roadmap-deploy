from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import uvicorn
import os

from app.database import get_db
from app.routers import auth, roadmaps, teams, users, progress, admin, activity, content
from app.models import models
from app.database import engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Roadmap.sh Clone API",
    description="Backend API for roadmap.sh platform",
)

# Configure CORS for both development and production
allowed_origins = [
    "http://localhost:3000", 
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "http://localhost:5173",
]

# Add production frontend URL if available
frontend_url = os.getenv("FRONTEND_URL")
if frontend_url:
    allowed_origins.append(frontend_url)

# In production, temporarily allow all origins for troubleshooting
if os.getenv("ENVIRONMENT") == "production":
    allowed_origins = ["*"]  # Allow all origins temporarily for troubleshooting
    print(f"CORS: Using permissive CORS policy for troubleshooting")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(roadmaps.router, prefix="/api/roadmaps", tags=["Roadmaps"])
app.include_router(teams.router, prefix="/api/teams", tags=["Teams"])
app.include_router(progress.router, prefix="/api/progress", tags=["Progress"])
app.include_router(activity.router, prefix="/api/activity", tags=["Activity"])
app.include_router(admin.router, prefix="/api/admin", tags=["Admin"])
app.include_router(content.router, prefix="/api/content", tags=["Content"])

@app.get("/")
def read_root():
    return {"message": "Roadmap.sh Clone API is running!"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "message": "API is running", "cors": "enabled"}

@app.get("/cors-test")
def cors_test():
    return {"message": "CORS is working!", "origin": "allowed"}

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)
