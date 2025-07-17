import argparse
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine
from app.models.models import Roadmap, RoadmapTopic
from sqlalchemy import text

# --- Layout Data for the SQL Roadmap ---
# This dictionary maps a topic's title to its (x, y) coordinates.
# This keeps the layout logic separate and easy to manage.
SQL_COORDINATES = {
    "Introduction to Databases": (625, 0),
    "What Are Relational Databases?": (500, 150),
    "SQL vs NoSQL Databases": (750, 150),
    "Core SQL Syntax": (625, 300),
    "Basic SQL Syntax": (250, 450),
    "Data Types": (500, 450),
    "Operators": (750, 450),
    "Data Definition Language (DDL)": (625, 600),
    "CREATE TABLE": (125, 750),
    "ALTER TABLE": (375, 750),
    "DROP TABLE": (625, 750),
    "TRUNCATE TABLE": (875, 750),
    "Data Manipulation Language (DML)": (625, 900),
    "SELECT Statement": (250, 1050),
    "INSERT Statement": (500, 1050),
    "UPDATE Statement": (750, 1050),
    "DELETE Statement": (1000, 1050),
    "Querying Data": (625, 1200),
    "WHERE Clause": (125, 1350),
    "ORDER BY": (375, 1350),
    "GROUP BY": (625, 1350),
    "HAVING": (875, 1350),
    "JOINs": (1125, 1350),
    "Aggregate Functions": (625, 1500),
    "COUNT": (125, 1650),
    "SUM": (375, 1650),
    "AVG": (625, 1650),
    "MIN": (875, 1650),
    "MAX": (1125, 1650),
}


def apply_layout(db: Session):
    """Applies the predefined layout to the SQL roadmap topics."""
    print("Fetching SQL roadmap...")
    # Find the roadmap by its unique slug
    sql_roadmap = db.query(Roadmap).filter(Roadmap.slug == "sql").first()
    if not sql_roadmap:
        print("Error: SQL roadmap not found. Have you seeded the database?")
        return

    print(f"Found roadmap: '{sql_roadmap.title}' (ID: {sql_roadmap.id})")
    
    topics_updated = 0
    # Update each topic with its coordinates
    for topic in sql_roadmap.topics:
        if topic.title in SQL_COORDINATES:
            coords = SQL_COORDINATES[topic.title]
            topic.position_x = coords[0]
            topic.position_y = coords[1]
            topics_updated += 1

    if topics_updated > 0:
        db.commit()
        print(f"Successfully updated coordinates for {topics_updated} topics in the SQL roadmap.")
    else:
        print("No topics were updated. Please check the topic titles in the script.")


def revert_layout(db: Session):
    """Resets the layout for the SQL roadmap by setting coordinates to NULL."""
    print("Reverting layout for SQL roadmap...")
    sql_roadmap = db.query(Roadmap).filter(Roadmap.slug == "sql").first()
    if not sql_roadmap:
        print("Error: SQL roadmap not found.")
        return

    # Set coordinates to NULL for all topics in this roadmap
    db.query(RoadmapTopic).filter(RoadmapTopic.roadmap_id == sql_roadmap.id).update({
        "position_x": None,
        "position_y": None
    })
    db.commit()
    print("Successfully reverted coordinates for the SQL roadmap. They are now NULL.")


def main():
    # Check if the required columns exist before proceeding
    with engine.connect() as connection:
        result = connection.execute(text("SELECT column_name FROM information_schema.columns WHERE table_name='roadmap_topics' and column_name IN ('position_x', 'position_y')"))
        columns = [row[0] for row in result]
        if 'position_x' not in columns or 'position_y' not in columns:
            print("\nERROR: The 'roadmap_topics' table is missing 'position_x' and/or 'position_y' columns.")
            print("Please ensure your database schema is up to date by running `alembic upgrade head`.\n")
            return

    parser = argparse.ArgumentParser(description="Update layout coordinates for the SQL roadmap.")
    parser.add_argument("--run", action="store_true", help="Apply the new layout coordinates.")
    parser.add_argument("--revert", action="store_true", help="Revert the coordinates to NULL.")
    args = parser.parse_args()

    if not args.run and not args.revert:
        print("Please specify an action: --run or --revert")
        return

    db = SessionLocal()
    try:
        if args.run:
            apply_layout(db)
        elif args.revert:
            revert_layout(db)
    finally:
        db.close()


if __name__ == "__main__":
    main()