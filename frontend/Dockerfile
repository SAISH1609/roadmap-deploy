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

# Expose port
EXPOSE 5173

# For production, we'll use preview mode which serves the built files
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "5173"]