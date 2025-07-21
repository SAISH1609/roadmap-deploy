import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const apiClient = axios.create({
   //baseURL: 'http://127.0.0.1:8000/api',
   //  # Frontend container tries to call:
   //http://127.0.0.1:8000/api
   // But 127.0.0.1 inside frontend container = frontend container itself
   // Result: "Connection refused" or "Network error"
   // Frontend can't communicate with backend
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in every authenticated request
apiClient.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
