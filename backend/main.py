from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import uvicorn

from app.database import get_db
from app.routers import auth, roadmaps, teams, users, progress, admin
from app.models import models
from app.database import engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Roadmap.sh Clone API",
    description="Backend API for roadmap.sh platform",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "http://127.0.0.1:3000",
        "http://localhost:3001",  
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(roadmaps.router, prefix="/api/roadmaps", tags=["Roadmaps"])
app.include_router(teams.router, prefix="/api/teams", tags=["Teams"])
app.include_router(progress.router, prefix="/api/progress", tags=["Progress"])
app.include_router(admin.router, prefix="/api/admin", tags=["Admin"])

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
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
