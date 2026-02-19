// interfaces/ProductoCart.ts
export interface ProductoCart {
  id: string;                // ID único del producto
  nombre: string;            // Nombre del producto
  precio: number;            // Precio unitario
  cantidad: number;          // Cantidad en el carrito
  imagen?: string;           // URL de la imagen
  sku?: string;              // Código o SKU (opcional)
  stock?: number;            // Stock disponible (opcional)
  descripcion?: string;      // Descripción (opcional)
  categoria?: string;        // Categoría (opcional)
}