import { useAuthStore } from "../store/authStore";


export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = useAuthStore.getState().token;

  const response = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    useAuthStore.getState().logout();
    throw new Error("Sesión expirada. Inicia sesión nuevamente.");
  }

  return response;
};