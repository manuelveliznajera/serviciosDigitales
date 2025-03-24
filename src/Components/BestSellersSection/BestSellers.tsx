import React from 'react';
import ProductCard from '../ProductCard/ProductCard';

const products = [
  {
    urlImage: "/img/soft/Office2021.png",
    altName: "Office Professional Plus 2021",
    productName: "Office Professional Plus 2021",
    originalPrice: "Q295",
    discountedPrice: "Q115",
  },
  {
    urlImage: "/img/soft/Windows11Pro.png",
    altName: "Microsoft Windows 11 Pro",
    productName: "Microsoft Windows 11 Pro",
    originalPrice: "Q150",
    discountedPrice: "Q80",
  },
  {
    urlImage: "/img/soft/Internet.png",
    altName: "ESET Internet Security",
    productName: "ESET Internet Security",
    originalPrice: "Q195",
    discountedPrice: "Q90",
  },
  {
    urlImage: "/img/soft/McAfee.png",
    altName: "Antivirus McAfee",
    productName: "Antivirus McAfee",
    originalPrice: "Q150",
    discountedPrice: "Q75",
    
  },
];

const BestSellers: React.FC = () => {
  return (
    <div className="py-30  flex flex-col justify-center ">
      <div className='flex justify-between'>
      <h2 className="text-3xl font-bold ">Productos más vendidos</h2>
      <button className=" bg-white text-blue-600 border border-blue-600 py-2 px-4 rounded-full">Más Productos</button>

      </div>
      
      <div className="flex justify-center space-x-4 w-5/6 overflow-x-auto">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            urlImage={product.urlImage}
            altName={product.altName}
            productName={product.productName}
            originalPrice={product.originalPrice}
            discountedPrice={product.discountedPrice}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSellers;