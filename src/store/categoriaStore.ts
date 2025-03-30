import { create } from 'zustand';

interface Categoria {
  id: string;
  imagen: string;
  nombre: string;
  descripcion: string;
}

interface CategoriaState {
  categorias: Categoria[];
  loading: boolean;
  error: string | null;
  fetchCategorias: () => Promise<void>;
  addCategoria: (categoria: Categoria) => void;
  updateCategoria: (id: string, updatedCategoria: Partial<Categoria>) => void;
  deleteCategoria: (id: string) => void;
}

export const useCategoriaStore = create<CategoriaState>((set) => ({
  categorias: [],
  loading: false,
  error: null,

  // Obtener categorías desde el backend
  fetchCategorias: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('http://localhost:3000/api/categoria');
      if (!response.ok) {
        throw new Error('Error al obtener las categorías');
      }
      const data = await response.json();
      set({ categorias: data, loading: false });
    } catch (err: any) {
      set({ error: err.message || 'Error desconocido', loading: false });
    }
  },

  // Agregar una nueva categoría
  addCategoria: (categoria) => {
    set((state) => ({
      categorias: [...state.categorias, categoria],
    }));
  },

  // Actualizar una categoría existente
  updateCategoria: (id, updatedCategoria) => {
    set((state) => ({
      categorias: state.categorias.map((categoria) =>
        categoria.id === id ? { ...categoria, ...updatedCategoria } : categoria
      ),
    }));
  },

  // Eliminar una categoría
  deleteCategoria: (id) => {
    set((state) => ({
      categorias: state.categorias.filter((categoria) => categoria.id !== id),
    }));
  },
}));