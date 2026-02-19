import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductoCart } from "../Interfaces/ProductoCart";

interface CartState {
  productos: ProductoCart[];
  addProducto: (producto: ProductoCart) => void;
  removeProducto: (id: string) => void;
  aumentarCantidad: (id: string) => void;
  disminuirCantidad: (id: string) => void;
  clearCart: () => void;
  total: () => number;
}

const localStorageAdapter = {
  getItem: (name: string) => {
    const stored = localStorage.getItem(name);
    return stored ? JSON.parse(stored) : null;
  },
  setItem: (name: string, value: any) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      productos: [],

      addProducto: (producto) => {
        const existing = get().productos.find((p) => p.id === producto.id);
        if (existing) {
          set({
            productos: get().productos.map((p) =>
              p.id === producto.id
                ? { ...p, cantidad: p.cantidad + producto.cantidad }
                : p
            ),
          });
        } else {
          set({ productos: [...get().productos, producto] });
        }
      },

      removeProducto: (id) => {
        set({ productos: get().productos.filter((p) => p.id !== id) });
      },

      aumentarCantidad: (id) => {
        set({
          productos: get().productos.map((p) =>
            p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p
          ),
        });
      },

      disminuirCantidad: (id) => {
        set({
          productos: get().productos.map((p) =>
            p.id === id
              ? { ...p, cantidad: p.cantidad > 1 ? p.cantidad - 1 : 1 }
              : p
          ),
        });
      },

      clearCart: () => set({ productos: [] }),

      total: () =>
        get().productos.reduce(
          (acc, producto) => acc + producto.precio * producto.cantidad,
          0
        ),
    }),
    {
      name: "cart-storage",
      storage: localStorageAdapter,
    }
  )
);