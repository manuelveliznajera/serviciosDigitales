import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  email: string | null;
  isLoggedIn: boolean;
  role: string | null;
  token: string | null;
  setAuth: (isLoggedIn: boolean, email: string, role: string, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      email: null,
      role: null,
      token: null,
      setAuth: (isLoggedIn, email, role, token) =>
        set({ isLoggedIn, email, role, token }),
      logout: () =>
        set({ isLoggedIn: false, email: null, role: '', token: null }),
    }),
    {
      name: 'auth-storage', // Nombre de la clave en localStorage
    }
  )
);