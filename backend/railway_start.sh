#!/bin/bash

# Railway database initialization script
echo "Starting database initialization..."

# Wait for database to be ready
echo "Waiting for database connection..."
python manage_db.py check-connection

# Create tables
echo "Creating database tables..."
python manage_db.py create-tables

# Check if data exists
echo "Checking for existing data..."
DATA_EXISTS=$(python manage_db.py check-data-exists 2>&1 | grep "Found [^0]" || echo "no_data")

if [[ "$DATA_EXISTS" == "no_data" ]]; then
    echo "No data found, loading initial data..."
    
    # Load main database schema and data
    if [ -f "roadmapdb_fixed.sql" ]; then
        echo "Loading main database data..."
        psql "$DATABASE_URL" -f roadmapdb_fixed.sql
    fi
    
    # Load guides data
    if [ -f "guides_data.sql" ]; then
        echo "Loading guides data..."
        psql "$DATABASE_URL" -f guides_data.sql
    fi
    
    # Load videos data  
    if [ -f "videos_data.sql" ]; then
        echo "Loading videos data..."
        psql "$DATABASE_URL" -f videos_data.sql
    fi
    
    echo "Database initialization completed!"
else
    echo "Data already exists, skipping initialization."
fi

echo "Starting application..."
exec uvicorn main:app --host 0.0.0.0 --port $PORT
