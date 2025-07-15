"""
Sample data insertion script for Roadmap.sh Clone
Run this after setting up the database and running migrations
"""

from sqlalchemy.orm import Session
from sqlalchemy import text
from app.database import SessionLocal, engine
from app.models.models import (
    User, Roadmap, RoadmapTopic, TopicResource, Skill, 
    ResourceType, Team, TeamSkill
)
from app.core.security import get_password_hash

def create_sample_data():
    db = SessionLocal()
    
    try:
        # Clear existing data by truncating all relevant tables
        print("Clearing existing data...")
        db.execute(text("""
            TRUNCATE TABLE 
                users, teams, skills, team_skills, team_invitations, roadmaps, 
                roadmap_topics, topic_resources, user_progress, topic_progress, 
                user_activities, team_members, team_roadmaps, user_bookmarks
            RESTART IDENTITY CASCADE;
        """))
        db.commit()
        print("Data cleared successfully.")

        # Create sample skills
        skills_data = [
            {"name": "JavaScript", "category": "Programming", "is_predefined": True},
            {"name": "Python", "category": "Programming", "is_predefined": True},
            {"name": "PostgreSQL", "category": "Database", "is_predefined": True},
            {"name": "React", "category": "Frontend", "is_predefined": True},
            {"name": "FastAPI", "category": "Backend", "is_predefined": True},
            {"name": "Node.js", "category": "Backend", "is_predefined": True},
            {"name": "HTML/CSS", "category": "Frontend", "is_predefined": True},
            {"name": "Docker", "category": "DevOps", "is_predefined": True},
            {"name": "Git", "category": "Version Control", "is_predefined": True},
            {"name": "TypeScript", "category": "Programming", "is_predefined": True},
        ]
        
        for skill_data in skills_data:
            skill = Skill(**skill_data)
            db.add(skill)
        
        # Create sample users
        users_data = [
            {
                "email": "john@example.com",
                "username": "john_doe",
                "full_name": "John Doe",
                "hashed_password": get_password_hash("password123"),
                "is_active": True,
                "is_verified": True
            },
            {
                "email": "jane@example.com", 
                "username": "jane_smith",
                "full_name": "Jane Smith",
                "hashed_password": get_password_hash("password123"),
                "is_active": True,
                "is_verified": True
            },
            {
                "email": "admin@example.com",
                "username": "admin",
                "full_name": "Admin User",
                "hashed_password": get_password_hash("admin123"),
                "is_active": True,
                "is_verified": True
            }
        ]
        
        for user_data in users_data:
            user = User(**user_data)
            db.add(user)
        
        db.commit()
        
        # Create SQL Roadmap
        sql_roadmap = Roadmap(
            title="SQL Roadmap",
            slug="sql",
            description="Step by step guide to learning SQL in 2025",
            category="Database",
            is_public=True,
            total_topics=12,
            created_by=1
        )
        db.add(sql_roadmap)
        db.commit()
        
        # Create React Roadmap
        react_roadmap = Roadmap(
            title="React Roadmap",
            slug="react",
            description="Complete guide to learning React development",
            category="Frontend",
            is_public=True,
            total_topics=20,
            created_by=1
        )
        db.add(react_roadmap)
        db.commit()
        
        # Create Python Roadmap
        python_roadmap = Roadmap(
            title="Python Roadmap",
            slug="python",
            description="Comprehensive Python learning path",
            category="Programming",
            is_public=True,
            total_topics=18,
            created_by=1
        )
        db.add(python_roadmap)
        db.commit()
        
        # SQL Roadmap Topics
        sql_topics = [
            {
                "roadmap_id": sql_roadmap.id,
                "title": "What are Relational Databases?",
                "description": "Introduction to relational databases and RDBMS concepts",
                "order_index": 1,
                "is_required": True
            },
            {
                "roadmap_id": sql_roadmap.id,
                "title": "Basic SQL Syntax",
                "description": "Learn fundamental SQL commands and syntax",
                "order_index": 2,
                "is_required": True
            },
            {
                "roadmap_id": sql_roadmap.id,
                "title": "Data Definition Language (DDL)",
                "description": "CREATE, ALTER, DROP statements",
                "order_index": 3,
                "is_required": True
            },
            {
                "roadmap_id": sql_roadmap.id,
                "title": "Data Manipulation Language (DML)",
                "description": "INSERT, UPDATE, DELETE operations",
                "order_index": 4,
                "is_required": True
            },
            {
                "roadmap_id": sql_roadmap.id,
                "title": "SELECT Statements",
                "description": "Querying data from tables",
                "order_index": 5,
                "is_required": True
            },
            {
                "roadmap_id": sql_roadmap.id,
                "title": "WHERE Clause",
                "description": "Filtering data with conditions",
                "order_index": 6,
                "is_required": True
            },
            {
                "roadmap_id": sql_roadmap.id,
                "title": "JOINs",
                "description": "Combining data from multiple tables",
                "order_index": 7,
                "is_required": True
            },
            {
                "roadmap_id": sql_roadmap.id,
                "title": "Aggregate Functions",
                "description": "COUNT, SUM, AVG, MIN, MAX functions",
                "order_index": 8,
                "is_required": True
            },
            {
                "roadmap_id": sql_roadmap.id,
                "title": "GROUP BY and HAVING",
                "description": "Grouping and filtering grouped data",
                "order_index": 9,
                "is_required": True
            },
            {
                "roadmap_id": sql_roadmap.id,
                "title": "Subqueries",
                "description": "Nested queries and correlated subqueries",
                "order_index": 10,
                "is_required": False
            },
            {
                "roadmap_id": sql_roadmap.id,
                "title": "Indexes",
                "description": "Database indexing for performance",
                "order_index": 11,
                "is_required": False
            },
            {
                "roadmap_id": sql_roadmap.id,
                "title": "Stored Procedures",
                "description": "Creating and using stored procedures",
                "order_index": 12,
                "is_required": False
            }
        ]
        
        topic_objects = []
        for topic_data in sql_topics:
            topic = RoadmapTopic(**topic_data)
            db.add(topic)
            topic_objects.append(topic)
        
        db.commit()
        
        # Add resources for the first few topics
        resources_data = [
            # Resources for "What are Relational Databases?"
            {
                "topic_id": topic_objects[0].id,
                "title": "Introduction to Relational Databases",
                "url": "https://www.oracle.com/database/what-is-a-relational-database/",
                "resource_type": ResourceType.ARTICLE.value,
                "is_free": True,
                "description": "Oracle's comprehensive guide to relational databases",
                "order_index": 1
            },
            {
                "topic_id": topic_objects[0].id,
                "title": "Database Fundamentals",
                "url": "https://www.youtube.com/watch?v=wR0jg0eQsZA",
                "resource_type": ResourceType.VIDEO.value,
                "is_free": True,
                "description": "Video introduction to database concepts",
                "order_index": 2
            },
            # Resources for "Basic SQL Syntax"
            {
                "topic_id": topic_objects[1].id,
                "title": "SQL Tutorial",
                "url": "https://www.w3schools.com/sql/",
                "resource_type": ResourceType.TUTORIAL.value,
                "is_free": True,
                "description": "Interactive SQL tutorial from W3Schools",
                "order_index": 1
            },
            {
                "topic_id": topic_objects[1].id,
                "title": "SQL Syntax Guide",
                "url": "https://www.postgresql.org/docs/current/sql-syntax.html",
                "resource_type": ResourceType.DOCUMENTATION.value,
                "is_free": True,
                "description": "PostgreSQL official syntax documentation",
                "order_index": 2
            },
            # Resources for "SELECT Statements"
            {
                "topic_id": topic_objects[4].id,
                "title": "Mastering SQL SELECT",
                "url": "https://mode.com/sql-tutorial/sql-select-statement/",
                "resource_type": ResourceType.TUTORIAL.value,
                "is_free": True,
                "description": "Comprehensive SELECT statement tutorial",
                "order_index": 1
            },
            {
                "topic_id": topic_objects[4].id,
                "title": "SQL SELECT Examples",
                "url": "https://www.sqlitetutorial.net/sqlite-select/",
                "resource_type": ResourceType.ARTICLE.value,
                "is_free": True,
                "description": "Practical SELECT statement examples",
                "order_index": 2
            }
        ]
        
        for resource_data in resources_data:
            resource = TopicResource(**resource_data)
            db.add(resource)
        
        db.commit()
        
        print("Sample data created successfully!")
        print("Sample users created:")
        print("- john@example.com (password: password123)")
        print("- jane@example.com (password: password123)")
        print("- admin@example.com (password: admin123)")
        print("Sample roadmaps created: SQL, React, Python")
        
    except Exception as e:
        print(f"Error creating sample data: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_sample_data()
