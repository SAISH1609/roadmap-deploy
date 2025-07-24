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

# Create a more flexible startup script that handles all cases
RUN echo '#!/bin/sh\n\
# Create vite.config.js with allowed hosts\n\
cat > /app/vite.config.temp.js << EOF\n\
import { defineConfig } from "vite";\n\
import { mergeConfig } from "vite";\n\
import baseConfig from "./vite.config.js";\n\
\n\
export default mergeConfig(baseConfig, {\n\
  preview: {\n\
    host: "0.0.0.0",\n\
    port: parseInt(process.env.PORT || "5173"),\n\
    strictPort: true,\n\
    allowedHosts: "all"\n\
  }\n\
});\n\
EOF\n\
\n\
# Start the preview server with the temporary config\n\
exec vite preview --host 0.0.0.0 --port "${PORT:-5173}" --strictPort --config /app/vite.config.temp.js\n\
' > /app/start.sh

RUN chmod +x /app/start.sh

# Use the startup script
CMD ["/app/start.sh"]