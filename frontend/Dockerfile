# frontend/Dockerfile
FROM node:20-alpine

WORKDIR /app

# Install build tools for some npm packages (optional but safe)
RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm install

COPY . .

# Build the application for production
RUN npm run build

# Set environment variables
ENV PORT=5173
ENV NODE_ENV=production

# Make sure favicon is properly handled
RUN mkdir -p /app/dist
RUN cp -f public/favicon.ico dist/favicon.ico || echo "Favicon already in dist"

# Debug - list files to verify
RUN ls -la /app/dist

EXPOSE ${PORT}

# Use the start script from package.json which has been updated to handle PORT env var
CMD ["npm", "run", "start"]