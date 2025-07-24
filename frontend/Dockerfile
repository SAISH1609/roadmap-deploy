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
RUN cp -f public/favicon.ico dist/favicon.ico

# Debug - list files to verify
RUN ls -la /app/dist

# Make sure the port is exposed
EXPOSE ${PORT}

# Use shell form to ensure environment variables are expanded
CMD ["sh", "-c", "npm run start"]