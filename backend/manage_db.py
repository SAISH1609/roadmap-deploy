"""
Database Management Script for Roadmap.sh Backend
Configured for PostgreSQL on macOS with TablePlus compatibility

Usage:
    python manage_db.py --help
    python manage_db.py create-tables
    python manage_db.py reset-db
    python manage_db.py seed-data
    python manage_db.py check-connection
"""

from create_sample_data import create_sample_data
from app.models.models import *
from app.database import Base, engine, SessionLocal
import argparse
import sys
import os
from sqlalchemy import create_engine, text
from sqlalchemy.exc import SQLAlchemyError
from dotenv import load_dotenv

# Add the project root to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))


load_dotenv()


def check_connection():
    """Test database connection"""
    try:
        with engine.connect() as connection:
            result = connection.execute(text("SELECT version()"))
            version = result.fetchone()[0]
            print(f"Connected to PostgreSQL successfully!")
            print(f"Database version: {version}")

            # Check current database
            result = connection.execute(text("SELECT current_database()"))
            db_name = result.fetchone()[0]
            print(f"Current database: {db_name}")

            # Count existing tables
            result = connection.execute(text("""
                SELECT count(*) 
                FROM information_schema.tables 
                WHERE table_schema = 'public'
            """))
            table_count = result.fetchone()[0]
            print(f"Existing tables: {table_count}")

            return True
    except SQLAlchemyError as e:
        print(f"Database connection failed: {e}")
        return False


def check_tables_exist():
    """Check if database tables already exist"""
    try:
        with engine.connect() as connection:
            result = connection.execute(text("""
                SELECT count(*) 
                FROM information_schema.tables 
                WHERE table_schema = 'public'
            """))
            table_count = result.fetchone()[0]
            print(f"Found {table_count} existing tables")
            return table_count > 0
    except Exception as e:
        print(f"Error checking tables: {e}")
        return False


def create_tables():
    """Create all database tables (only if they don't exist)"""
    try:
        # Check if tables already exist
        if check_tables_exist():
            print("Tables already exist, skipping table creation...")
            with engine.connect() as connection:
                result = connection.execute(text("""
                    SELECT table_name 
                    FROM information_schema.tables 
                    WHERE table_schema = 'public'
                    ORDER BY table_name
                """))
                tables = [row[0] for row in result.fetchall()]
                print(f"Existing tables ({len(tables)}):")
                for table in tables:
                    print(f"   - {table}")
            return True

        print("Creating database tables...")
        Base.metadata.create_all(bind=engine)
        print("All tables created successfully!")

        # List created tables
        with engine.connect() as connection:
            result = connection.execute(text("""
                SELECT table_name 
                FROM information_schema.tables 
                WHERE table_schema = 'public'
                ORDER BY table_name
            """))
            tables = [row[0] for row in result.fetchall()]
            print(f"Created tables ({len(tables)}):")
            for table in tables:
                print(f"   - {table}")

        return True
    except SQLAlchemyError as e:
        print(f"Failed to create tables: {e}")
        return False


def reset_database():
    """Drop and recreate all tables"""
    try:
        print("Dropping all existing tables...")
        Base.metadata.drop_all(bind=engine)
        print("All tables dropped successfully!")

        print("Recreating tables...")
        Base.metadata.create_all(bind=engine)
        print("All tables recreated successfully!")

        return True
    except SQLAlchemyError as e:
        print(f"Failed to reset database: {e}")
        return False


def check_data_exists():
    """Check if data already exists in the database"""
    try:
        with engine.connect() as connection:
            # Check if roadmap_topics table has any data
            result = connection.execute(
                text("SELECT COUNT(*) FROM roadmap_topics"))
            count = result.fetchone()[0]
            print(f"Found {count} records in roadmap_topics table")
            return count > 0
    except Exception as e:
        print(f"Error checking data existence: {e}")
        return False


def seed_data():
    """Insert sample data"""
    try:
        print("Seeding database with sample data...")
        create_sample_data()
        print("Sample data inserted successfully!")
        return True
    except Exception as e:
        print(f"Failed to seed data: {e}")
        return False


def show_table_info():
    """Show information about all tables"""
    try:
        with engine.connect() as connection:
            result = connection.execute(text("""
                SELECT 
                    table_name,
                    (SELECT count(*) FROM information_schema.columns 
                     WHERE table_name = t.table_name AND table_schema = 'public') as column_count
                FROM information_schema.tables t
                WHERE table_schema = 'public'
                ORDER BY table_name
            """))

            tables = result.fetchall()
            print(f"\nDatabase Schema Overview:")
            print("-" * 50)
            for table_name, column_count in tables:
                print(f"{table_name:<25} ({column_count} columns)")

        return True
    except SQLAlchemyError as e:
        print(f"Failed to get table info: {e}")
        return False


def show_sample_queries():
    """Show some sample queries for testing"""
    print("\nSample queries you can run in TablePlus:")
    print("-" * 50)

    queries = [
        ("Count all users", "SELECT count(*) FROM users;"),
        ("List all roadmaps", "SELECT id, title, slug, category FROM roadmaps;"),
        ("Show roadmap topics", "SELECT r.title as roadmap, rt.title as topic FROM roadmaps r JOIN roadmap_topics rt ON r.id = rt.roadmap_id;"),
        ("Count resources by type",
         "SELECT resource_type, count(*) FROM topic_resources GROUP BY resource_type;"),
        ("Show team members", "SELECT t.name as team, u.username FROM teams t JOIN team_members tm ON t.id = tm.team_id JOIN users u ON tm.user_id = u.id;"),
    ]

    for description, query in queries:
        print(f"\n{description}:")
        print(f"   {query}")


def main():
    parser = argparse.ArgumentParser(
        description="Database Management for Roadmap.sh Backend")
    parser.add_argument("command", choices=[
        "check-connection",
        "create-tables",
        "reset-db",
        "seed-data",
        "table-info",
        "sample-queries",
        "full-setup",
        "check-data-exists",
        "check-tables-exist"
    ], help="Command to execute")

    args = parser.parse_args()

    print("Roadmap.sh Database Manager")
    print("=" * 50)

    if args.command == "check-connection":
        check_connection()

    elif args.command == "create-tables":
        if check_connection():
            create_tables()

    elif args.command == "reset-db":
        confirm = input("This will delete ALL data. Continue? (yes/no): ")
        if confirm.lower() == 'yes':
            if check_connection():
                reset_database()
        else:
            print("Operation cancelled")

    elif args.command == "seed-data":
        if check_connection():
            seed_data()

    elif args.command == "check-data-exists":
        if check_connection():
            exists = check_data_exists()
            print(f"Data exists: {exists}")

    elif args.command == "check-tables-exist":
        if check_connection():
            exists = check_tables_exist()
            print(f"Tables exist: {exists}")

    elif args.command == "table-info":
        if check_connection():
            show_table_info()

    elif args.command == "sample-queries":
        show_sample_queries()

    elif args.command == "full-setup":
        print("Running full database setup...")
        if check_connection():
            print("\n1/3 Creating tables...")
            if create_tables():
                print("\n2/3 Seeding data...")
                if seed_data():
                    print("\n3/3 Showing table info...")
                    show_table_info()
                    show_sample_queries()
                    print("\nFull setup completed successfully!")
                    print("\nYou can now:")
                    print("   - Connect to database using TablePlus")
                    print("   - Start the API server: python main.py")
                    print("   - Visit API docs: http://localhost:8000/docs")


if __name__ == "__main__":
    main()
