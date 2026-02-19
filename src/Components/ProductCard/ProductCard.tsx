import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../Interfaces/Product';
import { useCartStore } from '../../store/useCartStore';
import { ProductoCart } from '../../Interfaces/ProductoCart';

const ProductCard: React.FC<Product> = ({
  id,
  urlImage,
  altName,
  productName,
  originalPrice,
  discountedPrice,
}) => {
  const addProducto = useCartStore((state) => state.addProducto);

  // Convierte "Q125" a número 125
  const parsePrice = (priceStr: string): number => {
    const num = Number(priceStr.replace("Q", "").trim());
    return isNaN(num) ? 0 : num;
  };

  const handleAddToCart = () => {
    const producto: ProductoCart = {
      id,
      nombre: productName,
      precio: parsePrice(discountedPrice),
      cantidad: 1,
      imagen: urlImage,
      descripcion: altName,
    };

    addProducto(producto);
  };

  return (
    <div className="bg-gray-100 shadow-md rounded-lg p-2 flex flex-col">
      <img
        src={urlImage}
        alt={altName}
        className="w-full h-70 rounded-lg p-1 bg-white"
      />
      <p className="text-white bg-[#0098DB] px-2 rounded-2xl mt-2 w-1/3 font-bold mb-2">
        GLOBAL
      </p>
      <p className="text-gray-600 text-lg font-semibold mb-2">{productName}</p>
      <p className="text-gray-500 line-through">{originalPrice}</p>
      <p className="text-blue-600 text-xl font-bold mb-4">{discountedPrice}</p>

      <div className="flex gap-2 mt-auto">
        <Link
          to={`/producto/${id}`}
          className="bg-blue-600 text-white py-2 px-4 rounded-full flex-1 text-center"
        >
          Ver Más
        </Link>

        <button
          onClick={handleAddToCart}
          className="bg-green-600 text-white py-2 px-4 rounded-full flex-1 hover:bg-green-700 transition"
        >
          Comprar
        </button>
      </div>
    </div>
  );
};

export default ProductCard;