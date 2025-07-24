# frontend/Dockerfile
FROM node:20-alpine

WORKDIR /app

# Install build tools for some npm packages (optional but safe)
RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm install

COPY . .

# Set environment variables
ENV PORT=5173
ENV NODE_ENV=production

# Build the application for production
RUN npm run build

# Make sure favicon is always in the dist directory
RUN mkdir -p /app/dist
RUN cp -f public/favicon.ico dist/favicon.ico || echo "Favicon already exists"

# Debug - list files to verify
RUN ls -la /app/dist

# Make sure the port is exposed
EXPOSE ${PORT}

# Create a start script for the preview server - using basic method
RUN echo '#!/bin/sh' > /app/start.sh
RUN echo 'echo "Starting Vite preview server on port $PORT..."' >> /app/start.sh
RUN echo 'cd /app && npx vite preview --host 0.0.0.0 --port $PORT' >> /app/start.sh
RUN chmod +x /app/start.sh

# Use the startup script
CMD ["/app/start.sh"]
