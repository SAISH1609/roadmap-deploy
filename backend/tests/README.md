# Backend Testing Guide

This directory contains comprehensive unit and integration tests for the FastAPI backend.

## 📁 Test Structure

```
tests/
├── __init__.py                    # Package initialization
├── conftest.py                    # Shared test fixtures and configuration
├── test_setup.py                  # Basic setup verification tests
├── pytest.ini                    # Pytest configuration
├── unit/                          # Unit tests (isolated, fast)
│   ├── test_security.py          # Password hashing, JWT tokens
│   ├── test_crud_users.py        # User CRUD operations
│   ├── test_crud_teams.py        # Team CRUD operations
│   ├── test_email_service.py     # Email service functionality
│   └── test_schemas.py           # Pydantic schema validation
├── integration/                   # Integration tests (API endpoints)
│   ├── test_auth_routes.py       # Authentication endpoints
│   └── test_team_routes.py       # Team invitation endpoints
└── fixtures/                     # Test data and sample files
    └── sample_data.json          # Sample users, teams, invitations
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Install testing dependencies
pip install pytest pytest-asyncio httpx pytest-mock pytest-cov

# Or if using Docker
docker compose exec backend pip install pytest pytest-asyncio httpx pytest-mock pytest-cov
```

### 2. Run Tests

```bash
# Run all tests
pytest

# Run with the test runner script
./run_tests.sh all

# Run specific test categories
./run_tests.sh unit          # Unit tests only
./run_tests.sh integration   # Integration tests only
./run_tests.sh coverage      # With coverage report
```

## 📊 Test Categories

### 🔴 **HIGH Priority Tests (Must Have)**

#### **Security Tests** (`test_security.py`)

- Password hashing and verification
- JWT token creation and validation
- Token expiration handling

#### **User CRUD Tests** (`test_crud_users.py`)

- User creation, retrieval, authentication
- Duplicate email/username handling
- Database constraints

#### **Team CRUD Tests** (`test_crud_teams.py`)

- Team creation and management
- Team membership operations
- Invitation system (your current feature)

#### **Authentication API Tests** (`test_auth_routes.py`)

- Registration, login, logout
- Protected route access
- Token validation

#### **Team Invitation API Tests** (`test_team_routes.py`)

- Sending invitations
- Accepting invitations
- Error handling (expired, invalid tokens)

### 🟡 **MEDIUM Priority Tests**

#### **Email Service Tests** (`test_email_service.py`)

- SMTP configuration
- Email content validation
- Error handling

#### **Schema Validation Tests** (`test_schemas.py`)

- Input validation
- Data serialization
- Error messages

## 🧪 Running Specific Tests

### By Test File

```bash
pytest tests/unit/test_security.py                    # Security tests
pytest tests/unit/test_crud_teams.py                 # Team CRUD tests
pytest tests/integration/test_team_routes.py         # Team API tests
```

### By Test Function

```bash
pytest tests/unit/test_security.py::test_password_hashing
pytest -k "invitation"                               # All invitation-related tests
pytest -k "test_create_user"                        # All user creation tests
```

### By Markers

```bash
pytest -m "auth"                                     # Authentication tests
pytest -m "team"                                     # Team functionality tests
pytest -m "email"                                    # Email service tests
pytest -m "unit"                                     # Unit tests only
pytest -m "integration"                             # Integration tests only
```

## 📈 Coverage Reports

### Generate Coverage Report

```bash
pytest --cov=app --cov-report=html --cov-report=term-missing
```

### Coverage Goals

- **CRUD operations**: 90%+ coverage
- **Authentication**: 95%+ coverage
- **API routes**: 80%+ coverage
- **Services**: 85%+ coverage
- **Overall project**: 80%+ coverage

### View HTML Report

```bash
open htmlcov/index.html  # macOS
```

## 🛠 Test Configuration

### Environment Variables

Tests use a separate SQLite database to avoid affecting your development database:

- **Test DB**: `sqlite:///./test.db`
- **Production DB**: Your PostgreSQL database

### Fixtures (conftest.py)

- `test_db`: Fresh database for each test
- `client`: FastAPI test client
- `create_test_user`: Sample user creation
- `create_test_team`: Sample team creation
- `auth_headers`: Authentication headers
- `mock_email_service`: Mocked email service

## 🐛 Debugging Failed Tests

### Verbose Output

```bash
pytest -v                                           # Verbose test names
pytest -vv                                          # Very verbose output
pytest -s                                           # Show print statements
```

### Debug Specific Test

```bash
pytest tests/unit/test_security.py::test_password_hashing -v -s
```

### Common Issues

#### **Import Errors**

```bash
# Add the app directory to Python path
export PYTHONPATH="${PYTHONPATH}:/path/to/your/backend"
```

#### **Database Issues**

```bash
# Clean test database
rm -f test.db
```

#### **Dependency Issues**

```bash
# Reinstall test dependencies
pip install -r requirements.txt
```

## 🚨 Best Practices

### Writing New Tests

1. **Follow the AAA Pattern**:

   - **Arrange**: Set up test data
   - **Act**: Execute the function
   - **Assert**: Check results

2. **Use Descriptive Names**:

   ```python
   def test_create_user_with_duplicate_email_should_raise_error():
       # Test implementation
   ```

3. **Mock External Dependencies**:

   ```python
   @patch('app.services.email_service.send_email')
   def test_invitation_sending(mock_send_email):
       # Test without actually sending emails
   ```

4. **Test Edge Cases**:
   - Empty inputs
   - Invalid data
   - Boundary conditions

### Test Organization

- **Unit tests**: Test individual functions in isolation
- **Integration tests**: Test API endpoints and database interactions
- **Use fixtures**: Avoid code duplication
- **Mock external services**: Database, email, APIs

## 📝 Example Test

```python
def test_create_team_invitation_success(client, auth_headers, create_test_team, mock_email_service):
    \"\"\"Test successful team invitation creation\"\"\"
    # Arrange
    invitation_data = {
        "email": "newuser@example.com",
        "role": "member"
    }

    # Act
    response = client.post(
        f"/api/teams/{create_test_team.id}/invite",
        json=invitation_data,
        headers=auth_headers
    )

    # Assert
    assert response.status_code == 200
    assert response.json()["message"] == "Invitation sent successfully"
    mock_email_service.assert_called_once()
```

## 🔄 Continuous Integration

### Pre-commit Testing

```bash
# Run before each commit
./run_tests.sh unit && ./run_tests.sh integration
```

### GitHub Actions (Future)

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run tests
        run: pytest --cov=app
```

## 🎯 Testing Your Team Invitation Feature

Your current team invitation system should be tested with these specific scenarios:

```bash
# Test team invitation functionality
pytest tests/unit/test_crud_teams.py -k invitation -v
pytest tests/integration/test_team_routes.py -k invitation -v

# Test email service
pytest tests/unit/test_email_service.py -v

# Test the complete flow
pytest tests/ -k "invitation or invite" -v
```

## 📞 Need Help?

- Check the test output for specific error messages
- Use `-v` flag for verbose output
- Use `-s` flag to see print statements
- Check `conftest.py` for available fixtures
- Look at existing tests for examples
