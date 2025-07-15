import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Define the shape of the user object based on your backend schema
type User = {
  id: number;
  email: string;
  username: string;
  full_name: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string | null;
};

// Define the shape of the authentication state
type AuthState = {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
};

// Create the store with persistence middleware
export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      setToken: (token) => {
        set({ token, isAuthenticated: !!token });
      },
      setUser: (user) => {
        set({ user });
      },
      logout: () => {
        set({ token: null, user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage', // Unique name for the storage item
      storage: createJSONStorage(() => localStorage), // Use localStorage for persistence
      partialize: (state) => ({ token: state.token }), // Only persist the token
    }
  )
);
