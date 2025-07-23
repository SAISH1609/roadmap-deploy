import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '../types';

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
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      setToken: (token) => {
        set({ token, isAuthenticated: !!token });
      },
      // This setUser logic is correct!
      setUser: (user) => {
        set({ user, isAuthenticated: !!user });
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
