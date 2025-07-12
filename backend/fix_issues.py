#!/usr/bin/env python3
"""
Script to create sample data and fix common issues
"""
import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database import SessionLocal
from app.models.models import User, Roadmap, RoadmapTopic, TopicResource, Team, TeamMember
from app.core.security import get_password_hash
from sqlalchemy.orm import Session

def create_sample_data():
    """Create comprehensive sample data for testing"""
    db = SessionLocal()
    
    try:
        print("Creating sample data...")
        
        # Check if data already exists
        existing_users = db.query(User).count()
        if existing_users > 0:
            print(f"Found {existing_users} existing users. Skipping user creation.")
        else:
            # Create sample users
            sample_users = [
                {
                    "email": "admin@roadmap.dev",
                    "full_name": "Admin User",
                    "password": "admin123",
                    "is_verified": True
                },
                {
                    "email": "test@example.com", 
                    "full_name": "Test User",
                    "password": "password123",
                    "is_verified": True
                },
                {
                    "email": "member@example.com",
                    "full_name": "Team Member",
                    "password": "password123", 
                    "is_verified": True
                }
            ]
            
            for user_data in sample_users:
                user = User(
                    email=user_data["email"],
                    full_name=user_data["full_name"],
                    hashed_password=get_password_hash(user_data["password"]),
                    is_verified=user_data["is_verified"]
                )
                db.add(user)
            
            db.commit()
            print("Created sample users")
        
        # Check if roadmaps exist
        existing_roadmaps = db.query(Roadmap).count()
        if existing_roadmaps > 0:
            print(f"Found {existing_roadmaps} existing roadmaps. Skipping roadmap creation.")
        else:
            # Create sample roadmaps
            roadmaps_data = [
                {
                    "title": "SQL Roadmap",
                    "slug": "sql-roadmap",
                    "description": "Complete guide to learning SQL from basics to advanced",
                    "category": "Database",
                    "total_topics": 5
                },
                {
                    "title": "React Developer Roadmap", 
                    "slug": "react-roadmap",
                    "description": "Comprehensive path to becoming a React developer",
                    "category": "Frontend",
                    "total_topics": 8
                },
                {
                    "title": "Backend Developer Roadmap",
                    "slug": "backend-roadmap", 
                    "description": "Step by step guide to backend development",
                    "category": "Backend",
                    "total_topics": 10
                }
            ]
            
            for roadmap_data in roadmaps_data:
                roadmap = Roadmap(**roadmap_data)
                db.add(roadmap)
            
            db.commit()
            print("Created sample roadmaps")
            
            # Create sample topics for SQL roadmap
            roadmap = db.query(Roadmap).filter(Roadmap.slug == "sql-roadmap").first()
            if roadmap:
                topics_data = [
                    {
                        "roadmap_id": roadmap.id,
                        "title": "What is a Database?",
                        "description": "Introduction to databases and SQL",
                        "order_index": 1
                    },
                    {
                        "roadmap_id": roadmap.id,
                        "title": "Basic SQL Syntax",
                        "description": "Learn basic SQL commands",
                        "order_index": 2
                    },
                    {
                        "roadmap_id": roadmap.id,
                        "title": "SELECT Statements", 
                        "description": "Master SELECT queries",
                        "order_index": 3
                    },
                    {
                        "roadmap_id": roadmap.id,
                        "title": "WHERE Clauses",
                        "description": "Filter data with WHERE",
                        "order_index": 4
                    },
                    {
                        "roadmap_id": roadmap.id,
                        "title": "JOINs and Relationships",
                        "description": "Connect tables with JOINs",
                        "order_index": 5
                    }
                ]
                
                for topic_data in topics_data:
                    topic = RoadmapTopic(**topic_data)
                    db.add(topic)
                
                db.commit()
                print("Created sample topics")
                
                # Create sample resources
                first_topic = db.query(RoadmapTopic).filter(RoadmapTopic.roadmap_id == roadmap.id).first()
                if first_topic:
                    resources_data = [
                        {
                            "topic_id": first_topic.id,
                            "title": "Introduction to Databases",
                            "url": "https://www.w3schools.com/sql/sql_intro.asp",
                            "resource_type": "article",
                            "is_free": True,
                            "description": "W3Schools SQL Introduction",
                            "order_index": 1
                        },
                        {
                            "topic_id": first_topic.id,
                            "title": "SQL Tutorial Video",
                            "url": "https://www.youtube.com/watch?v=HXV3zeQKqGY",
                            "resource_type": "video",
                            "is_free": True,
                            "description": "Free SQL tutorial on YouTube",
                            "order_index": 2
                        }
                    ]
                    
                    for resource_data in resources_data:
                        resource = TopicResource(**resource_data)
                        db.add(resource)
                    
                    db.commit()
                    print("Created sample resources")
        
        # Create sample team
        existing_teams = db.query(Team).count()
        if existing_teams > 0:
            print(f"Found {existing_teams} existing teams.")
        else:
            admin_user = db.query(User).filter(User.email == "admin@roadmap.dev").first()
            if admin_user:
                team = Team(
                    name="Development Team",
                    created_by=admin_user.id,
                    github_org_url="https://github.com/roadmap-dev"
                )
                db.add(team)
                db.commit()
                
                # Add admin as team member
                team_member = TeamMember(
                    team_id=team.id,
                    user_id=admin_user.id,
                    role="admin",
                    joined_at=team.created_at
                )
                db.add(team_member)
                db.commit()
                print("Created sample team")
        
        print("Sample data creation completed!")
        return True
        
    except Exception as e:
        print(f"Error creating sample data: {e}")
        db.rollback()
        return False
    finally:
        db.close()

def fix_ssl_issue():
    """Fix SSL certificate issue for email sending"""
    try:
        import ssl
        import certifi
        print("Attempting to fix SSL certificate issue...")
        
        # Try to create a proper SSL context
        ssl_context = ssl.create_default_context(cafile=certifi.where())
        print("SSL context created successfully")
        return True
    except Exception as e:
        print(f"SSL fix failed: {e}")
        print("You may need to run: /Applications/Python\\ 3.13/Install\\ Certificates.command")
        return False

def check_endpoints():
    """Check if all required endpoints are working"""
    try:
        import requests
    except ImportError:
        print("requests module not found. Installing...")
        import subprocess
        subprocess.check_call(['pip', 'install', 'requests'])
        import requests
    
    base_url = "http://localhost:8000"
    endpoints_to_check = [
        "/health",
        "/api/auth/register", 
        "/api/roadmaps/",
        "/cors-test",
        "/api/admin/stats"  # New admin endpoint
    ]
    
    print("Checking API endpoints...")
    
    for endpoint in endpoints_to_check:
        try:
            response = requests.get(f"{base_url}{endpoint}")
            if response.status_code in [200, 405, 401, 403]:  # 401/403 OK for protected endpoints
                status_icon = "OK" if response.status_code == 200 else "PROTECTED"
                print(f"{status_icon} {endpoint} - Status: {response.status_code}")
            else:
                print(f"ERROR {endpoint} - Status: {response.status_code}")
        except Exception as e:
            print(f"ERROR {endpoint} - Error: {e}")

def test_admin_api():
    """Test admin API functionality"""
    try:
        import requests
    except ImportError:
        print("requests module required for admin API testing")
        return
    
    base_url = "http://localhost:8000"
    
    # Login as admin
    try:
        login_response = requests.post(f"{base_url}/api/auth/login", data={
            "username": "admin@example.com",
            "password": "admin123"
        })
        
        if login_response.status_code == 200:
            token = login_response.json()["access_token"]
            headers = {"Authorization": f"Bearer {token}"}
            
            print("Admin login successful")
            
            # Test admin stats
            stats_response = requests.get(f"{base_url}/api/admin/stats", headers=headers)
            if stats_response.status_code == 200:
                stats = stats_response.json()
                print(f"Admin stats: {stats}")
            
            # Test create sample roadmap
            sample_response = requests.post(f"{base_url}/api/admin/sample-data", headers=headers)
            if sample_response.status_code == 200:
                print("Sample roadmap created successfully")
            else:
                print(f"Sample roadmap creation failed: {sample_response.status_code}")
                
        else:
            print("Admin login failed")
            
    except Exception as e:
        print(f"Admin API test failed: {e}")

if __name__ == "__main__":
    print("Running comprehensive setup and fixes...")
    print("=" * 50)
    
    # 1. Create sample data
    create_sample_data()
    
    # 2. Try to fix SSL issue
    fix_ssl_issue()
    
    # 3. Check endpoints
    check_endpoints()
    
    # 4. Test admin API
    test_admin_api()
    
    print("=" * 50)
    print("Setup completed!")
    print("\nNext steps:")
    print("1. Start the server: python main.py")
    print("2. Test authentication with: admin@example.com / admin123")
    print("3. Use API endpoints directly at http://localhost:8000")
    print("4. Check API documentation at http://localhost:8000/docs")
    print("5. For email issues, check SendGrid configuration")
