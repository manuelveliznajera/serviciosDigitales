import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  email: string | null;
  isLoggedIn: boolean;
  role: string | null;
  token: string | null;
  id: string | null;
  setAuth: (isLoggedIn: boolean, email: string, role: string, token: string,id:string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      email: null,
      role: null,
      token: null,
      id: null,
      setAuth: (isLoggedIn, email, role, token, id) =>
        set({ isLoggedIn, email, role, token , id}),
      logout: () =>
        set({ isLoggedIn: false, email: null, role: '', token: null ,id: null}),
    }),
    {
      name: 'auth-storage', // Nombre de la clave en localStorage
    }
  )
);