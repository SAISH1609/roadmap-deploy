"""
Sample data insertion script for Roadmap.sh Clone
Run this after setting up the database and running migrations
"""

from sqlalchemy.orm import Session, Session
from sqlalchemy import text
from app.database import SessionLocal
from app.models.models import (
    User, Roadmap, RoadmapTopic, TopicResource, Skill
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

        # --- Reusable Recursive Function to Process Nested Topics ---
        def process_topics(topics_data, roadmap_id, parent_id=None):
            for topic_entry in topics_data:
                topic_info = topic_entry['topic']
                
                # Create the topic object
                topic = RoadmapTopic(
                    roadmap_id=roadmap_id,
                    parent_id=parent_id,
                    **topic_info
                )
                db.add(topic)
                db.flush()  # Flush to get the new topic.id

                # Process resources for the current topic
                if 'resources' in topic_entry:
                    for resource_data in topic_entry['resources']:
                        resource = TopicResource(topic_id=topic.id, **resource_data)
                        db.add(resource)
                
                # Recursively process children topics
                if 'children' in topic_entry:
                    process_topics(topic_entry['children'], roadmap_id, parent_id=topic.id)

        # --- Sample Skills ---
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
            db.add(Skill(**skill_data))
        db.commit()

        # --- Sample Users ---
        users_data = [
            { "email": "admin@example.com", "username": "Admin", "full_name": "Admin User", "hashed_password": get_password_hash("admin123"), "is_active": True, "is_verified": True },
            { "email": "saanvigude04@gmail.com", "username": "SSG", "full_name": "Saanvi Gude", "hashed_password": get_password_hash("SSG123"), "is_active": True, "is_verified": True },
            { "email": "rohitbinoj@gmail.com", "username": "RB", "full_name": "Rohit Binoj", "hashed_password": get_password_hash("RB123"), "is_active": True, "is_verified": True },
            { "email": "saishchodankar1902@gmail.com", "username": "SC1902", "full_name": "Saish Chodankar", "hashed_password": get_password_hash("SC123"), "is_active": True, "is_verified": True }
        ]
        for user_data in users_data:
            db.add(User(**user_data))
        db.commit()

        # --- Roadmaps ---
        sql_roadmap = Roadmap(title="SQL Roadmap", slug="sql", description="Step by step guide to learning SQL in 2025", category="Database", is_public=True, total_topics=30, created_by=1)
        react_roadmap = Roadmap(title="React Developer", slug="react", description="Everything to learn about React and its ecosystem in 2025.", category="Frontend", is_public=True, total_topics=25, created_by=1)
        python_roadmap = Roadmap(title="Python Developer", slug="python", description="Step by step guide to becoming a Python developer in 2025", category="Programming", is_public=True, total_topics=26, created_by=1)
        db.add_all([sql_roadmap, react_roadmap, python_roadmap])
        db.commit()

        # --- SQL Roadmap Topics (Hierarchical) ---
        sql_topics_data = [
            {
                "topic": {"title": "Introduction to Databases", "order_index": 1, "is_required": True},
                "children": [
                    {"topic": {"title": "What Are Relational Databases?", "order_index": 1, "is_required": True}, "resources": [{"title": "What is a relational database - AWS", "url": "https://aws.amazon.com/relational-database/", "resource_type": "article", "is_free": True, "order_index": 1}]},
                    {"topic": {"title": "SQL vs NoSQL Databases", "order_index": 2, "is_required": True}, "resources": [{"title": "SQL vs NoSQL", "url": "https://www.mongodb.com/resources/basics/databases/nosql-explained/nosql-vs-sql", "resource_type": "article", "is_free": True, "order_index": 1}]}
                ]
            },
            {
                "topic": {"title": "Core SQL Syntax", "order_index": 2, "is_required": True},
                "children": [
                    {"topic": {"title": "Basic SQL Syntax", "order_index": 1, "is_required": True}, "resources": [{"title": "SQL Tutorial - Mode", "url": "https://mode.com/sql-tutorial/", "resource_type": "article", "is_free": True, "order_index": 1}]},
                    {"topic": {"title": "Data Types", "order_index": 2, "is_required": True}, "resources": [{"title": "SQL Data Types", "url": "https://www.digitalocean.com/community/tutorials/sql-data-types", "resource_type": "article", "is_free": True, "order_index": 1}]},
                    {"topic": {"title": "Operators", "order_index": 3, "is_required": True}, "resources": [{"title": "SQL Operators", "url": "https://www.dataquest.io/blog/sql-operators/", "resource_type": "article", "is_free": True, "order_index": 1}]}
                ]
            },
            {
                "topic": {"title": "Data Definition Language (DDL)", "order_index": 3, "is_required": True},
                "children": [
                    {"topic": {"title": "CREATE TABLE", "order_index": 1, "is_required": True}},
                    {"topic": {"title": "ALTER TABLE", "order_index": 2, "is_required": True}},
                    {"topic": {"title": "DROP TABLE", "order_index": 3, "is_required": True}},
                    {"topic": {"title": "TRUNCATE TABLE", "order_index": 4, "is_required": True}}
                ]
            },
            {
                "topic": {"title": "Data Manipulation Language (DML)", "order_index": 4, "is_required": True},
                "children": [
                    {"topic": {"title": "SELECT Statement", "order_index": 1, "is_required": True}},
                    {"topic": {"title": "INSERT Statement", "order_index": 2, "is_required": True}},
                    {"topic": {"title": "UPDATE Statement", "order_index": 3, "is_required": True}},
                    {"topic": {"title": "DELETE Statement", "order_index": 4, "is_required": True}}
                ]
            },
            {
                "topic": {"title": "Querying Data", "order_index": 5, "is_required": True},
                "children": [
                    {"topic": {"title": "WHERE Clause", "order_index": 1, "is_required": True}},
                    {"topic": {"title": "ORDER BY", "order_index": 2, "is_required": True}},
                    {"topic": {"title": "GROUP BY", "order_index": 3, "is_required": True}},
                    {"topic": {"title": "HAVING", "order_index": 4, "is_required": True}},
                    {"topic": {"title": "JOINs", "order_index": 5, "is_required": True}}
                ]
            },
            {
                "topic": {"title": "Aggregate Functions", "order_index": 6, "is_required": True},
                "children": [
                    {"topic": {"title": "COUNT", "order_index": 1, "is_required": True}},
                    {"topic": {"title": "SUM", "order_index": 2, "is_required": True}},
                    {"topic": {"title": "AVG", "order_index": 3, "is_required": True}},
                    {"topic": {"title": "MIN", "order_index": 4, "is_required": True}},
                    {"topic": {"title": "MAX", "order_index": 5, "is_required": True}}
                ]
            }
        ]
        process_topics(sql_topics_data, sql_roadmap.id)
        db.commit()

        # --- React Roadmap Topics (Hierarchical) ---
        react_topics_data = [
            {"topic": {"title": "Build Tools", "order_index": 1, "is_required": True}, "children": [
                {"topic": {"title": "Vite", "order_index": 1, "is_required": True}},
                {"topic": {"title": "Create React App", "order_index": 2, "is_required": False}}
            ]},
            {"topic": {"title": "Core Components", "order_index": 2, "is_required": True}, "children": [
                {"topic": {"title": "Functional Components", "order_index": 1, "is_required": True}},
                {"topic": {"title": "JSX", "order_index": 2, "is_required": True}},
                {"topic": {"title": "Props vs State", "order_index": 3, "is_required": True}},
                {"topic": {"title": "Conditional Rendering", "order_index": 4, "is_required": True}},
                {"topic": {"title": "Lists and Keys", "order_index": 5, "is_required": True}},
                {"topic": {"title": "Component Life Cycle", "order_index": 6, "is_required": True}}
            ]},
            {"topic": {"title": "Hooks", "order_index": 3, "is_required": True}, "children": [
                {"topic": {"title": "useState", "order_index": 1, "is_required": True}},
                {"topic": {"title": "useEffect", "order_index": 2, "is_required": True}},
                {"topic": {"title": "useContext", "order_index": 3, "is_required": True}},
                {"topic": {"title": "useReducer", "order_index": 4, "is_required": True}},
                {"topic": {"title": "useCallback", "order_index": 5, "is_required": True}},
                {"topic": {"title": "useMemo", "order_index": 6, "is_required": True}},
                {"topic": {"title": "useRef", "order_index": 7, "is_required": True}},
                {"topic": {"title": "Custom Hooks", "order_index": 8, "is_required": True}}
            ]},
            {"topic": {"title": "Advanced Concepts", "order_index": 4, "is_required": True}, "children": [
                {"topic": {"title": "Render Props", "order_index": 1, "is_required": True}},
                {"topic": {"title": "Higher-Order Components", "order_index": 2, "is_required": True}},
                {"topic": {"title": "Refs and the DOM", "order_index": 3, "is_required": True}}
            ]}
        ]
        process_topics(react_topics_data, react_roadmap.id)
        db.commit()

        # --- Python Roadmap Topics (Hierarchical) ---
        python_topics_data = [
            {"topic": {"title": "Python Basics", "order_index": 1, "is_required": True}, "children": [
                {"topic": {"title": "Basic Syntax", "order_index": 1, "is_required": True}},
                {"topic": {"title": "Variables and Data Types", "order_index": 2, "is_required": True}},
                {"topic": {"title": "Conditionals", "order_index": 3, "is_required": True}},
                {"topic": {"title": "Loops", "order_index": 4, "is_required": True}},
                {"topic": {"title": "Functions", "order_index": 5, "is_required": True}},
                {"topic": {"title": "Exception Handling", "order_index": 6, "is_required": True}}
            ]},
            {"topic": {"title": "Data Structures", "order_index": 2, "is_required": True}, "children": [
                {"topic": {"title": "Lists", "order_index": 1, "is_required": True}},
                {"topic": {"title": "Tuples", "order_index": 2, "is_required": True}},
                {"topic": {"title": "Sets", "order_index": 3, "is_required": True}},
                {"topic": {"title": "Dictionaries", "order_index": 4, "is_required": True}}
            ]},
            {"topic": {"title": "Advanced Python", "order_index": 3, "is_required": True}, "children": [
                {"topic": {"title": "Decorators", "order_index": 1, "is_required": True}},
                {"topic": {"title": "Lambdas", "order_index": 2, "is_required": True}},
                {"topic": {"title": "Modules", "order_index": 3, "is_required": True}},
                {"topic": {"title": "Regular Expressions", "order_index": 4, "is_required": True}}
            ]},
            {"topic": {"title": "Data Structures and Algorithms", "order_index": 4, "is_required": True}, "children": [
                {"topic": {"title": "Arrays and Linked lists", "order_index": 1, "is_required": True}},
                {"topic": {"title": "Hash Tables", "order_index": 2, "is_required": True}},
                {"topic": {"title": "Stack, Queue, and Heap", "order_index": 3, "is_required": True}},
                {"topic": {"title": "Binary Search Trees", "order_index": 4, "is_required": True}},
                {"topic": {"title": "Recursion", "order_index": 5, "is_required": True}},
                {"topic": {"title": "Sorting Algorithms", "order_index": 6, "is_required": True}}
            ]}
        ]
        process_topics(python_topics_data, python_roadmap.id)
        db.commit()

        print("Sample data created successfully!")
        print("Sample users created:")
        print("- admin@example.com (password: admin123)")
        print("- saanvigude04@gmail.com (password: SSG123)")
        print("- rohitbinoj@gmail.com (password: RB123)")
        print("- saishchodankar1902@gmail.com (password: SC123)")
        print("Sample roadmaps created: SQL, React, Python")

    except Exception as e:
        print(f"Error creating sample data: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_sample_data()
