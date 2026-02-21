import { create } from "zustand";
import { fetchWithAuth } from "../helpers/fetchWithAuth";

interface Producto {
  id: string;
  nombreProducto: string;
  descripcion: string;
  stock: number;
  precioCosto: number;
  precioPublico: number;
  categoriaId: string;
  favorito: boolean;
  imagen?: string;
}

interface ProductoTransformado {
  id: string;
  urlImage: string;
  altName: string;
  productName: string;
  originalPrice: string;
  discountedPrice: string;
  description:string
}

interface ProductStore {
  productosDb: Producto[];
  productos: ProductoTransformado[];
  loading: boolean;
  error: string | null;
  fetchProductos: () => Promise<void>;
  addProducto: (formData: FormData) => Promise<Producto>;
  updateProducto: (id: string, formData: FormData) => Promise<Producto>;
  getProductoById: (id: string) => Promise<ProductoTransformado>;
  deleteProducto: (id: string) => Promise<{ success: boolean }>;
}

export const useProductStore = create<ProductStore>((set) => ({
  productosDb: [],
  productos: JSON.parse(localStorage.getItem("productos") || "[]"),
  loading: false,
  error: null,

  // Carga todos los productos del backend
  fetchProductos: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetchWithAuth("http://localhost:3000/api/producto");
      const data = await res.json();
      console.log("Respuesta del backend:", data);
      const API_URL = "http://localhost:3000/uploads/";

      



      const productosNewArray: ProductoTransformado[] = data.map((p: Producto) => (
        console.log("Producto original:", p),
        {
        id: String(p.id),
        urlImage: p.imagen,
        altName: p.nombreProducto,
        productName: p.nombreProducto,
        originalPrice: `Q${Math.round(p.precioPublico * 1.3)}`,
        discountedPrice: `Q${p.precioPublico}`,
        description: p.descripcion
      }));

      // Guardar en store y localStorage
      localStorage.setItem("productos", JSON.stringify(productosNewArray));
      set({ productosDb: data, productos: productosNewArray, loading: false });
    } catch (error: any) {
      set({ error: error.message || "Error al cargar productos", loading: false });
    }
  },

  // Obtener un producto por ID
  getProductoById: async (id: string) => {
    const productosLS: ProductoTransformado[] = JSON.parse(localStorage.getItem("productos") || "[]");
    const productoEncontrado = productosLS.find((p) => p.id === id);
    if (productoEncontrado) return productoEncontrado;

    // Si no se encuentra en localStorage, llamar al backend
    set({ loading: true, error: null });
    try {
      const res = await fetchWithAuth(`http://localhost:3000/api/producto/${id}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `Producto ${id} no encontrado`);

      const API_URL = "http://localhost:3000/uploads/";
      const productoTransformado: ProductoTransformado = {
        id: String(data.id),
        urlImage: `${API_URL}${data.imagen}`,
        altName: data.nombreProducto,
        productName: data.nombreProducto,
        originalPrice: `Q${Math.round(data.precioPublico * 1.3)}`,
        discountedPrice: `Q${data.precioPublico}`,
         description: data.descripcion
      };

      const nuevosProductos = [...productosLS, productoTransformado];
      localStorage.setItem("productos", JSON.stringify(nuevosProductos));
      set(() => ({ productos: nuevosProductos, loading: false }));

      return productoTransformado;
    } catch (err: any) {
      set({ error: err.message || `Error al obtener producto ${id}`, loading: false });
      throw err;
    }
  },

  // Agregar un producto
  addProducto: async (formData: FormData) => {
    set({ loading: true, error: null });
    try {
      const response = await fetchWithAuth("http://localhost:3000/api/producto", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Error al crear el producto");

      const API_URL = "http://localhost:3000/uploads/";
      const productoTransformado: ProductoTransformado = {
        id: String(data.id),
        urlImage: `${API_URL}${data.imagen}`,
        altName: data.nombreProducto,
        productName: data.nombreProducto,
        originalPrice: `Q${Math.round(data.precioPublico * 1.3)}`,
        discountedPrice: `Q${data.precioPublico}`,
        description: data.descripcion
      };

      const productosActualizados = [...(JSON.parse(localStorage.getItem("productos") || "[]")), productoTransformado];
      localStorage.setItem("productos", JSON.stringify(productosActualizados));

      set((state) => ({
        productos: productosActualizados,
        productosDb: [...state.productosDb, data],
        loading: false,
      }));

      return data;
    } catch (error: any) {
      set({ error: error.message || "Error al crear el producto", loading: false });
      throw error;
    }
  },

  // Actualizar un producto
  updateProducto: async (id: string, formData: FormData) => {
    set({ loading: true, error: null });
    try {
      const response = await fetchWithAuth(`http://localhost:3000/api/producto/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Error al actualizar el producto");

      const API_URL = "http://localhost:3000/uploads/";
      const productoTransformado = {
        id: String(data.id),
        urlImage: `${API_URL}${data.imagen}`,
        altName: data.nombreProducto,
        productName: data.nombreProducto,
        originalPrice: `Q${Math.round(data.precioPublico * 1.3)}`,
        discountedPrice: `Q${data.precioPublico}`,
      };

      const productosLS: ProductoTransformado[] = JSON.parse(localStorage.getItem("productos") || "[]");
      const productosActualizados = productosLS.map((p) => (p.id === id ? productoTransformado : p));
      localStorage.setItem("productos", JSON.stringify(productosActualizados));

      return data;
    } catch (error: any) {
      set({ error: error.message || "Error al actualizar el producto", loading: false });
      throw error;
    }
  },

  // Eliminar un producto
  deleteProducto: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await fetchWithAuth(`http://localhost:3000/api/producto/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || `Error al eliminar el producto ${id}`);

      const productosLS: ProductoTransformado[] = JSON.parse(localStorage.getItem("productos") || "[]");
      const productosFiltrados = productosLS.filter((p) => p.id !== id);
      localStorage.setItem("productos", JSON.stringify(productosFiltrados));

      set((state) => ({
        productos: productosFiltrados,
        productosDb: state.productosDb.filter((p) => String(p.id) !== id),
        loading: false,
      }));

      return { success: true };
    } catch (error: any) {
      set({ error: error.message || `Error al eliminar el producto ${id}`, loading: false });
      throw error;
    }
  },
}));