#!/bin/bash

# Test runner script for the FastAPI backend
# This script provides common testing commands and configurations

set -e  # Exit on any error

echo "🧪 FastAPI Backend Test Runner"
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker Compose is available and backend container is running
check_docker() {
    if ! command -v docker-compose &> /dev/null && ! command -v docker &> /dev/null; then
        print_error "Docker is not installed or not running"
        exit 1
    fi
    
    # Check if we're in the project root or backend directory
    if [[ -f "../docker-compose.yml" ]]; then
        COMPOSE_PATH="../docker-compose.yml"
        BACKEND_SERVICE="backend"
    elif [[ -f "docker-compose.yml" ]]; then
        COMPOSE_PATH="docker-compose.yml"
        BACKEND_SERVICE="backend"
    else
        print_error "docker-compose.yml not found. Please run from project root or backend directory."
        exit 1
    fi
    
    # Check if backend container is running
    if ! docker compose -f "$COMPOSE_PATH" ps backend | grep -q "Up"; then
        print_warning "Backend container is not running. Starting it..."
        docker compose -f "$COMPOSE_PATH" up -d backend
        sleep 5
    fi
    
    print_status "Using Docker Compose at: $COMPOSE_PATH"
}

# Execute pytest command in Docker container
run_pytest() {
    local pytest_args="$1"
    docker compose -f "$COMPOSE_PATH" exec backend pytest $pytest_args
}

# Install test dependencies
install_deps() {
    print_status "Installing test dependencies in Docker container..."
    docker compose -f "$COMPOSE_PATH" exec backend pip install pytest-mock pytest-cov
    print_success "Dependencies installed!"
}

# Run all tests
run_all_tests() {
    print_status "Running all tests..."
    run_pytest "tests/ -v"
    print_success "All tests completed!"
}

# Run only unit tests
run_unit_tests() {
    print_status "Running unit tests..."
    run_pytest "tests/unit/ -v -m 'not slow'"
    print_success "Unit tests completed!"
}

# Run only integration tests
run_integration_tests() {
    print_status "Running integration tests..."
    run_pytest "tests/integration/ -v"
    print_success "Integration tests completed!"
}

# Run tests with coverage
run_coverage() {
    print_status "Running tests with coverage..."
    run_pytest "tests/ --cov=app --cov-report=html --cov-report=term-missing"
    print_success "Coverage report generated in htmlcov/"
}

# Run specific test file
run_specific_test() {
    if [[ -z "$1" ]]; then
        print_error "Please provide a test file name"
        echo "Usage: $0 specific <test_file>"
        echo "Example: $0 specific test_crud_users.py"
        exit 1
    fi
    
    print_status "Running specific test: $1"
    run_pytest "tests/ -k '$1' -v"
    print_success "Specific test completed!"
}

# Run tests for specific functionality
run_auth_tests() {
    print_status "Running authentication tests..."
    run_pytest "tests/ -m 'auth' -v"
    print_success "Authentication tests completed!"
}

run_team_tests() {
    print_status "Running team functionality tests..."
    run_pytest "tests/ -m 'team' -v"
    print_success "Team tests completed!"
}

run_email_tests() {
    print_status "Running email service tests..."
    run_pytest "tests/ -m 'email' -v"
    print_success "Email tests completed!"
}

# Clean test artifacts
clean() {
    print_status "Cleaning test artifacts..."
    docker compose -f "$COMPOSE_PATH" exec backend bash -c "
        rm -rf .pytest_cache/
        rm -rf htmlcov/
        rm -rf .coverage
        rm -f test.db
        find . -type d -name '__pycache__' -exec rm -rf {} + 2>/dev/null || true
        find . -name '*.pyc' -delete
    "
    print_success "Test artifacts cleaned!"
}

# Show help
show_help() {
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  all                Run all tests"
    echo "  unit              Run only unit tests"
    echo "  integration       Run only integration tests"
    echo "  coverage          Run tests with coverage report"
    echo "  specific <file>   Run specific test file"
    echo "  auth              Run authentication tests"
    echo "  team              Run team functionality tests"
    echo "  email             Run email service tests"
    echo "  install           Install test dependencies"
    echo "  clean             Clean test artifacts"
    echo "  help              Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 all                           # Run all tests"
    echo "  $0 unit                          # Run unit tests only"
    echo "  $0 coverage                      # Run with coverage"
    echo "  $0 specific test_crud_users.py   # Run specific test file"
    echo ""
    echo "Note: This script runs tests inside Docker containers."
    echo "Make sure Docker Compose is running with: docker compose up -d"
}

# Main script logic
main() {
    check_docker
    
    case "${1:-all}" in
        "all")
            run_all_tests
            ;;
        "unit")
            run_unit_tests
            ;;
        "integration")
            run_integration_tests
            ;;
        "coverage")
            run_coverage
            ;;
        "specific")
            run_specific_test "$2"
            ;;
        "auth")
            run_auth_tests
            ;;
        "team")
            run_team_tests
            ;;
        "email")
            run_email_tests
            ;;
        "install")
            install_deps
            ;;
        "clean")
            clean
            ;;
        "help"|"-h"|"--help")
            show_help
            ;;
        *)
            print_error "Unknown command: $1"
            show_help
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"
