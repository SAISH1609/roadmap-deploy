#!/bin/bash

# PostgreSQL Setup Script for Roadmap.sh Backend
# This script sets up the database for your existing PostgreSQL installation

echo "Setting up PostgreSQL for Roadmap.sh Backend..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if PostgreSQL is running
if ! pg_isready -h localhost -p 5432 > /dev/null 2>&1; then
    echo -e "${RED} PostgreSQL is not running. Please start PostgreSQL first.${NC}"
    echo "Run: brew services start postgresql"
    exit 1
fi

echo -e "${GREEN}PostgreSQL is running${NC}"

# Check if roadmapdb exists
if psql -h localhost -p 5432 -U postgres -lqt | cut -d \| -f 1 | grep -qw roadmapdb; then
    echo -e "${GREEN}Database 'roadmapdb' already exists${NC}"
else
    echo -e "${YELLOW}Database 'roadmapdb' not found. Creating it...${NC}"
    createdb -h localhost -p 5432 -U postgres roadmapdb
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Database 'roadmapdb' created successfully${NC}"
    else
        echo -e "${RED}Failed to create database 'roadmapdb'${NC}"
        exit 1
    fi
fi

# Create test database if it doesn't exist
if psql -h localhost -p 5432 -U postgres -lqt | cut -d \| -f 1 | grep -qw roadmapdb_test; then
    echo -e "${GREEN}Test database 'roadmapdb_test' already exists${NC}"
else
    echo -e "${YELLOW}Creating test database 'roadmapdb_test'...${NC}"
    createdb -h localhost -p 5432 -U postgres roadmapdb_test
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Test database 'roadmapdb_test' created successfully${NC}"
    else
        echo -e "${RED}Failed to create test database 'roadmapdb_test'${NC}"
    fi
fi

echo ""
echo -e "${GREEN}PostgreSQL setup complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Copy .env.example to .env and update your password"
echo "2. Run: alembic upgrade head"
echo "3. Run: python create_sample_data.py"
echo "4. Run: python main.py"
echo ""
echo "Database connection details:"
echo "- Host: localhost"
echo "- Port: 5432"
echo "- Username: postgres"
echo "- Database: roadmapdb"
echo "- Test Database: roadmapdb_test"
