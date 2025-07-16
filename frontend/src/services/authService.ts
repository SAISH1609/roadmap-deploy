import apiClient from './apiClient';
import { useAuthStore } from '../store/authStore';

// --- Authentication API Calls ---

export const login = async (credentials: URLSearchParams) => {
  const response = await apiClient.post('/auth/login', credentials, {
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
  return apiClient.post('/auth/register', userData);
};

export const getMe = async () => {
  const response = await apiClient.get('/auth/me');
  if (response.data) {
    useAuthStore.getState().setUser(response.data);
  }
  return response.data;
};
