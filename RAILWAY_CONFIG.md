# After deployment, update these values in Railway dashboard

# Backend Environment Variables:
DATABASE_URL=postgresql://postgres:[password]@[host]:[port]/railway
PORT=8000
ENVIRONMENT=production
FRONTEND_URL=https://[your-frontend-service-url]

# Frontend Environment Variables:
VITE_API_URL=https://[your-backend-service-url]
PORT=5173

# CORS Configuration (update in main.py after getting URLs):
# allowed_origins = ["https://your-frontend-service-url.up.railway.app"]
