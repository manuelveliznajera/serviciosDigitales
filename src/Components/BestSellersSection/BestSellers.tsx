import React from 'react';
import { Product } from '../../Interfaces/Product';
import CardGrid from '../ProductCard/CardGrid';

interface ProductListProps {
  products: Product[];
}

const BestSellers: React.FC<ProductListProps> = ( {products }) => {
  return (
    <div className="py-30   flex flex-col justify-center ">
      <div className='flex justify-between mb-20'>
      <h2 className="text-3xl font-bold ">Productos más vendidos</h2>
      <button className=" bg-white text-blue-600 border border-blue-600 py-2 px-4 rounded-full">Más Productos</button>

      </div>
      
      <CardGrid products={products} />
    </div>
  );
};

export default BestSellers;