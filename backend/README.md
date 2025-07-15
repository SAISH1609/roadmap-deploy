# Roadmap.sh Clone - Backend API

A FastAPI-based backend for a roadmap learning platform clone, featuring user authentication, team management, progress tracking, and interactive roadmaps.

## Features

- **User Authentication**: JWT-based authentication with user registration and login
- **Roadmap Management**: Interactive roadmaps with topics and resources
- **Team Collaboration**: Create teams, invite members, track team progress
- **Progress Tracking**: Individual and team progress on roadmaps
- **Bookmarking**: Save favorite roadmaps
- **Activity Feed**: Track user activities across teams

## Tech Stack

- **FastAPI**: Modern, fast web framework for building APIs
- **PostgreSQL**: Primary database
- **SQLAlchemy**: ORM for database operations
- **Alembic**: Database migration tool
- **JWT**: Authentication tokens with 30-minute expiry

## Project Structure

```
backend_roadmap/
├── app/
│   ├── core/
│   │   └── security.py          # Password hashing, JWT tokens
│   ├── crud/                    # Database operations
│   │   ├── users.py
│   │   ├── roadmaps.py
│   │   ├── teams.py
│   │   └── progress.py
│   ├── models/
│   │   └── models.py            # SQLAlchemy models
│   ├── routers/                 # API endpoints
│   │   ├── auth.py
│   │   ├── users.py
│   │   ├── roadmaps.py
│   │   ├── teams.py
│   │   └── progress.py
│   ├── schemas/
│   │   └── schemas.py           # Pydantic models
│   ├── services/
│   │   └── email_service.py
│   └── database.py              # Database configuration
├── alembic/                     # Database migrations
├── main.py                      # FastAPI app entry point
├── requirements.txt             # Python dependencies
└── .env.example                 # Environment variables template
```

## Setup Instructions

### 1. Environment Setup

```bash
# Clone the repository (if not already done)
cd backend_roadmap

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Database Setup

#### Install PostgreSQL

**macOS (with Homebrew):**

```bash
brew install postgresql
brew services start postgresql
```

**Linux (Ubuntu/Debian):**

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**Windows:**

1. Download PostgreSQL from https://www.postgresql.org/download/windows/
2. Run the installer and follow the setup wizard
3. Remember the password for the `postgres` user

#### Create Databases

**macOS/Linux:**

```bash
# Create main database
createdb roadmapdb

# Create test database (optional)
createdb roadmapdb_test
```

**Windows (using psql):**

```sql
-- Connect to PostgreSQL as postgres user
psql -U postgres

-- Create databases
CREATE DATABASE roadmapdb;
CREATE DATABASE roadmapdb_test;

-- Exit psql
\q
```

#### Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env file with your configuration
nano .env
```

Update the `.env` file with your database credentials:

The sendgrid api key insert can be skipped for now
```env
DATABASE_URL=postgresql://your_username:your_password@localhost:5432/roadmap_db
DATABASE_URL_TEST=postgresql://your_username:your_password@localhost:5432/roadmapdb_test
SECRET_KEY=your-super-secret-jwt-key-here-make-it-very-long-and-random
SENDGRID_API_KEY=your-sendgrid-api-key
FROM_EMAIL=noreply@yourdomain.com
FRONTEND_URL=http://localhost:3000
```

### 3. Database Migration

```bash
# Initialize Alembic (only once)
alembic init alembic

# Create initial migration
alembic revision --autogenerate -m "Initial migration"

# Apply migrations
alembic upgrade head
```

### 4. Run the Application

```bash
# Development server with auto-reload
python main.py

# Or using uvicorn directly
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Users

- `GET /api/users/me` - Get current user info
- `GET /api/users/profile` - Get user profile

### Roadmaps

- `GET /api/roadmaps/` - Get all roadmaps
- `GET /api/roadmaps/bookmarked` - Get bookmarked roadmaps
- `GET /api/roadmaps/{slug}` - Get roadmap details
- `GET /api/roadmaps/{roadmap_id}/topics/{topic_id}` - Get topic details
- `POST /api/roadmaps/{roadmap_id}/bookmark` - Toggle bookmark

### Teams

- `POST /api/teams/` - Create team
- `GET /api/teams/` - Get user teams
- `GET /api/teams/{team_id}` - Get team details
- `POST /api/teams/{team_id}/invite` - Invite team member
- `POST /api/teams/join/{token}` - Accept invitation
- `GET /api/teams/{team_id}/members` - Get team members
- `GET /api/teams/{team_id}/activity` - Get team activity
- `GET /api/teams/{team_id}/progress` - Get team progress

### Progress

- `GET /api/progress/` - Get user progress summary
- `GET /api/progress/{roadmap_id}` - Get roadmap progress
- `POST /api/progress/{roadmap_id}/topics/{topic_id}` - Update topic progress

## Database Schema

### Key Tables

1. **users** - User accounts and authentication
2. **teams** - Team information
3. **roadmaps** - Learning roadmaps
4. **roadmap_topics** - Topics within roadmaps
5. **topic_resources** - Learning resources for topics
6. **user_progress** - User progress on roadmaps
7. **topic_progress** - Detailed topic completion status
8. **team_members** - Team membership (many-to-many)
9. **team_invitations** - Pending team invitations
10. **user_activities** - Activity feed

## Development Tasks for Database Team

### Priority 1: Core Setup

1. **Install PostgreSQL** and create databases
2. **Set up environment variables** in `.env` file
3. **Run initial migrations** to create tables
4. **Insert sample data** for testing

### Priority 2: Sample Data Creation

Create SQL scripts or Python scripts to populate:
**NOTE: Running create_sample_data.py will first delete existing data from your DB, before running and inserting data. To run successfully, and avoid duplication**
1. **Predefined Skills**:

```sql
INSERT INTO skills (name, category, is_predefined) VALUES
('JavaScript', 'Programming', true),
('Python', 'Programming', true),
('PostgreSQL', 'Database', true),
('React', 'Frontend', true),
('FastAPI', 'Backend', true);
```

2. **Sample Roadmaps** (SQL Roadmap example):

```sql
INSERT INTO roadmaps (title, slug, description, category, total_topics) VALUES
('SQL Roadmap', 'sql', 'Step by step guide to learning SQL in 2025', 'Database', 15);
```

3. **Roadmap Topics** with tree structure:

```sql
INSERT INTO roadmap_topics (roadmap_id, title, description, position_x, position_y, order_index) VALUES
(1, 'What are Relational Databases?', 'Introduction to relational databases', 100, 50, 1),
(1, 'Basic SQL Syntax', 'Learn basic SQL commands', 200, 100, 2),
(1, 'Data Manipulation Language (DML)', 'INSERT, UPDATE, DELETE operations', 300, 150, 3);
```

4. **Topic Resources**:

```sql
INSERT INTO topic_resources (topic_id, title, url, resource_type, is_free, description, order_index) VALUES
(1, 'What is a Database?', 'https://example.com/database-intro', 'article', true, 'Comprehensive guide to databases', 1),
(1, 'SQL Tutorial Video', 'https://youtube.com/watch?v=example', 'video', true, 'Video introduction to SQL', 2);
```

### Priority 3: Testing and Optimization

1. **Create test data** for different scenarios
2. **Test API endpoints** using the provided Postman collection
3. **Optimize database queries** for performance
4. **Set up database indexing** for frequently queried fields

### Priority 4: Advanced Features

1. **Implement database backup** procedures
2. **Set up monitoring** for database performance
3. **Create database views** for complex queries
4. **Implement soft deletes** where needed

## 👤 User Management

### Email Verification System

- **New users** register with `is_verified = false` by default
- **Sample data users** are created with `is_verified = true` for testing
- **Production users** would receive email verification links (not implemented yet)

### Verify Users Manually (for testing):

```bash
# Using API endpoint
curl -X POST "http://localhost:8000/api/auth/verify-email?email=user@example.com"

# Or update database directly
# UPDATE users SET is_verified = true WHERE email = 'user@example.com';
```

### User Status:

- **is_active**: User account is active (can login)
- **is_verified**: Email address has been verified
- Both should be `true` for full access (though verification isn't enforced yet)

## Testing

```bash
# Install test dependencies
pip install pytest pytest-asyncio httpx

# Run tests
pytest

# Run with coverage
pytest --cov=app
```

## Production Deployment

### Environment Variables for Production

- Set strong `SECRET_KEY`
- Configure production database URL
- Set up SendGrid API key for emails
- Configure CORS origins for frontend

## API Documentation

Once the server is running, visit:

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## 🧪 API Testing

You can test the API using:

1. **Swagger UI**: Interactive API documentation at `http://localhost:8000/docs`
2. **ReDoc**: Alternative API documentation at `http://localhost:8000/redoc`
3. **curl commands**: Direct HTTP requests
4. **Postman or Insomnia**: API testing tools

### Example API Tests

```bash
# Health check
curl http://localhost:8000/health

# Admin login
curl -X POST "http://localhost:8000/api/admin/login" \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "admin123"}'

# Get roadmaps
curl http://localhost:8000/api/roadmaps/
```


