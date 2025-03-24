import React from 'react';
import { Product } from '../../Interfaces/Product';
import ProductCard from '../ProductCard/ProductCard';

interface CardGridProps {
  products: Product[];
}

const CardGrid: React.FC<CardGridProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product, index) => (
        <ProductCard
          key={index}
          id={product.id}
          urlImage={product.urlImage}
          altName={product.altName}
          productName={product.productName}
          originalPrice={product.originalPrice}
          discountedPrice={product.discountedPrice}
        />
      ))}
    </div>
  );
};

export default CardGrid;