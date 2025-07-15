import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const API_URL = 'http://127.0.0.1:8000/api/auth';

// Create an Axios instance for API calls
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in headers
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

// --- Authentication API Calls ---

export const login = async (credentials: URLSearchParams) => {
  const response = await apiClient.post('/login', credentials, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  if (response.data.access_token) {
    useAuthStore.getState().setToken(response.data.access_token);
  }
  return response.data;
};

export const register = (userData: any) => {
  return apiClient.post('/register', userData);
};

export const getMe = async () => {
  const response = await apiClient.get('/me');
  if (response.data) {
    useAuthStore.getState().setUser(response.data);
  }
  return response.data;
};

export default apiClient;
