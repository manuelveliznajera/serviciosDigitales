import React from 'react';

interface ProductCardProps {
  urlImage: string;
  altName: string;
  productName: string;
  originalPrice: string;
  discountedPrice: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ urlImage, altName, productName, originalPrice, discountedPrice }) => {
  return (
    <div className="bg-[#EBEBEB] w-1/4 shadow-md rounded-lg p-2">
      <img src={urlImage} alt={altName} className="rounded-lg p-1 bg-white" />
      <p className="text-white bg-[#0098DB] px-2 rounded-2xl mt-2 w-1/3 font-bold mb-2">GLOBAL</p>
      <p className="text-gray-600 text-lg font-semibold mb-2">{productName}</p>
      <p className="text-gray-500 line-through">{originalPrice}</p>
      <p className="text-blue-600 text-xl font-bold mb-4">{discountedPrice}</p>
      <button className="bg-[#0101a7] text-white py-2 px-4 rounded-full w-full">Ver Más</button>
    </div>
  );
};

export default ProductCard;