const API_DEV_URL = import.meta.env.VITE_API_DEVELOPER || "http://localhost:3000";
const API_PROD_URL = import.meta.env.VITE_API_URL || API_DEV_URL;

export const API_BASE_URL = import.meta.env.DEV ? API_DEV_URL : API_PROD_URL;
export const API_UPLOADS_URL = `${API_BASE_URL}/uploads/`;
