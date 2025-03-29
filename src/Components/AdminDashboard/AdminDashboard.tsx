import React, { useState } from 'react';
import { Product } from '../../Interfaces/Product';


const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      urlImage: "/img/soft/Office2021.png",
      altName: "Office Professional Plus 2021",
      productName: "Office Professional Plus 2021",
      originalPrice: "Q295",
      discountedPrice: "Q115",
    },
    {
      id: "2",
      urlImage: "/img/soft/Windows11Pro.png",
      altName: "Microsoft Windows 11 Pro",
      productName: "Microsoft Windows 11 Pro",
      originalPrice: "Q150",
      discountedPrice: "Q80",
    },
  ]);

  const [newProduct, setNewProduct] = useState<Product>({
    id: "",
    urlImage: "",
    altName: "",
    productName: "",
    originalPrice: "",
    discountedPrice: "",
  });

  const handleAddProduct = () => {
    setProducts([...products, { ...newProduct, id: Date.now().toString() }]);
    setNewProduct({
      id: "",
      urlImage: "",
      altName: "",
      productName: "",
      originalPrice: "",
      discountedPrice: "",
    });
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleEditProduct = (id: string, updatedProduct: Product) => {
    setProducts(products.map((product) => (product.id === id ? updatedProduct : product)));
  };

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-3xl font-bold mb-8">Dashboard del Administrador</h1>

      {/* Formulario para agregar producto */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Agregar Producto</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nombre del Producto"
            value={newProduct.productName}
            onChange={(e) => setNewProduct({ ...newProduct, productName: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Precio Original"
            value={newProduct.originalPrice}
            onChange={(e) => setNewProduct({ ...newProduct, originalPrice: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Precio con Descuento"
            value={newProduct.discountedPrice}
            onChange={(e) => setNewProduct({ ...newProduct, discountedPrice: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="URL de la Imagen"
            value={newProduct.urlImage}
            onChange={(e) => setNewProduct({ ...newProduct, urlImage: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Alt Name"
            value={newProduct.altName}
            onChange={(e) => setNewProduct({ ...newProduct, altName: e.target.value })}
            className="border p-2 rounded"
          />
        </div>
        <button
          onClick={handleAddProduct}
          className="bg-blue-600 text-white py-2 px-4 rounded mt-4"
        >
          Agregar Producto
        </button>
      </div>

      {/* Listado de productos */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Listado de Productos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded shadow">
              <img src={product.urlImage} alt={product.altName} className="h-40 w-full object-contain mb-4" />
              <h3 className="text-lg font-bold">{product.productName}</h3>
              <p className="text-gray-500 line-through">{product.originalPrice}</p>
              <p className="text-blue-600 font-bold">{product.discountedPrice}</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="bg-red-600 text-white py-1 px-2 rounded"
                >
                  Eliminar
                </button>
                <button
                  onClick={() =>
                    handleEditProduct(product.id, {
                      ...product,
                      productName: prompt("Nuevo nombre:", product.productName) || product.productName,
                    })
                  }
                  className="bg-yellow-500 text-white py-1 px-2 rounded"
                >
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;