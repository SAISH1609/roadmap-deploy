# frontend/Dockerfile
FROM node:20-alpine

WORKDIR /app

# Install build tools for some npm packages (optional but safe)
RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]