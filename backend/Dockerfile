# Use an official Python runtime as a parent/base image from Docker Hub
FROM python:3.12-slim

# Set the working directory in the container
WORKDIR /app

# Install system dependencies required for psycopg2
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copy the requirements file into the container at /app
COPY ./requirements.txt /app/requirements.txt

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application's code into the container at /app
COPY . /app

# SQL files are now included in the COPY . /app above
# Copy and make executable the railway startup script
RUN chmod +x /app/railway_start.sh

# Make sure the environment variables are accessible
ENV PORT=8000
ENV ENVIRONMENT=production

# Expose port - Use PORT instead of hardcoding
EXPOSE ${PORT}

# Command to run the application
CMD ["/app/railway_start.sh"]