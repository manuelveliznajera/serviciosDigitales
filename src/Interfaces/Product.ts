export interface Product {
    id: string;
    urlImage: string;
    altName: string;
    productName: string;
    originalPrice: string;
    discountedPrice: string;
  }

 export interface ProductoDb{   
      id: number;
      nombreProducto: string;
      descripcion: string;
      imagen: string;
      precio: number;
      categoriaId: number;
      createdAt: string;
      updatedAt: string;
  }