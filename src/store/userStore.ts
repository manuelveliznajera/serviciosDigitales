import { create } from 'zustand';
import { fetchWithAuth } from '../helpers/fetchWithAuth';

const API_DEVELOPER = import.meta.env.VITE_API_DEVELOPER;

export type UserRole = 'Administrador' | 'Cliente';

export interface Usuario {
  id: string;
  correo: string;
  role: UserRole | string;
  [key: string]: any;
}

export interface CreateUserPayload {
  correo: string;
  password: string;
  role: UserRole;
}

export interface UpdateUserPayload {
  correo?: string;
  password?: string;
  role?: UserRole;
}

const normalizeUsersResponse = (data: any): Usuario[] => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.usuarios)) return data.usuarios;
  if (Array.isArray(data?.data)) return data.data;
  return [];
};

const normalizeSingleUserResponse = (data: any): Usuario => {
  if (data?.usuario) return data.usuario;
  if (data?.data && !Array.isArray(data.data)) return data.data;
  return data;
};

interface UserStoreState {
  users: Usuario[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<Usuario[]>;
  createUser: (payload: CreateUserPayload) => Promise<Usuario>;
  updateUser: (id: string, payload: UpdateUserPayload) => Promise<Usuario>;
  deleteUser: (id: string) => Promise<{ success: boolean }>;
  clearError: () => void;
}

export const useUserStore = create<UserStoreState>((set) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetchWithAuth(`${API_DEVELOPER}/api/usuario`, {
        method: 'GET',
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || data?.message || 'Error al obtener usuarios');
      }

      const users = normalizeUsersResponse(data);
      set({ users, loading: false });
      return users;
    } catch (error: any) {
      set({ loading: false, error: error.message || 'Error al obtener usuarios' });
      throw error;
    }
  },

  createUser: async (payload) => {
    set({ loading: true, error: null });
    try {
      const response = await fetchWithAuth(`${API_DEVELOPER}/api/usuario`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || data?.message || 'Error al crear usuario');
      }

      const newUser = normalizeSingleUserResponse(data);

      set((state) => ({
        users: [...state.users, newUser],
        loading: false,
      }));
      return newUser;
    } catch (error: any) {
      set({ loading: false, error: error.message || 'Error al crear usuario' });
      throw error;
    }
  },

  updateUser: async (id, payload) => {
    set({ loading: true, error: null });
    try {
      const response = await fetchWithAuth(`${API_DEVELOPER}/api/usuario/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || data?.message || 'Error al actualizar usuario');
      }

      const updatedUser = normalizeSingleUserResponse(data);
      const updatedUserId = String(updatedUser?.id ?? updatedUser?._id ?? id);

      set((state) => ({
        users: state.users.map((user) =>
          String(user.id ?? user._id) === String(id) ? { ...user, ...updatedUser } : user
        ),
        loading: false,
      }));

      return { ...updatedUser, id: updatedUserId };
    } catch (error: any) {
      set({ loading: false, error: error.message || 'Error al actualizar usuario' });
      throw error;
    }
  },

  deleteUser: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await fetchWithAuth(`${API_DEVELOPER}/api/usuario/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || data?.message || 'Error al eliminar usuario');
      }

      set((state) => ({
        users: state.users.filter((user) => String(user.id ?? user._id) !== String(id)),
        loading: false,
      }));

      return { success: true };
    } catch (error: any) {
      set({ loading: false, error: error.message || 'Error al eliminar usuario' });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));
