from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import uvicorn
import os

from app.database import get_db
from app.routers import auth, roadmaps, teams, users, progress, admin, activity, content
from app.models import models
from app.database import engine, SessionLocal

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
    # Allow all origins temporarily for troubleshooting
    allowed_origins = ["*"]
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


@app.get("/port-test")
def port_test():
    port = os.getenv("PORT", "Not set")
    return {
        "message": "Port test endpoint",
        "port_env_var": port,
        "host": "0.0.0.0",
        "environment": os.getenv("ENVIRONMENT", "Not set")
    }

@app.get("/db-test")
def db_test():
    from sqlalchemy import text
    try:
        # Try to create a direct connection
        db_url = os.getenv("DATABASE_URL", "Not set")
        # Mask the password for security
        masked_url = db_url.replace("postgres://", "postgresql://")
        if ":" in masked_url and "@" in masked_url:
            parts = masked_url.split("@")
            credentials = parts[0].split("://")[1].split(":")
            masked = f"{parts[0].split('://')[0]}://{credentials[0]}:****@{parts[1]}"
        else:
            masked = "Invalid URL format"
        
        # Test the connection
        db = SessionLocal()
        result = db.execute(text("SELECT 1"))
        db.close()
        
        return {
            "message": "Database connection test",
            "status": "Connected",
            "database_url_masked": masked,
            "sslmode": "disable" if "sslmode=disable" in db_url else "Not specified"
        }
    except Exception as e:
        return {
            "message": "Database connection test",
            "status": "Failed",
            "error": str(e),
            "database_url_masked": masked if 'masked' in locals() else "Not available"
        }


if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)
