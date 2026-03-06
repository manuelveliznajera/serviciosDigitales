import React from 'react';
import CardGrid from '../ProductCard/CardGrid';
import { Link } from 'react-router-dom';



const BestSellers: React.FC<any> = ( { products }) => {

  
  return (
    <div className="py-30   flex flex-col justify-center ">
      <div className='flex justify-between mb-20'>
      <h2 className="text-3xl font-bold ">Productos más vendidos</h2>
      <Link to="/softwares" className=" bg-white text-blue-600 border border-blue-600 py-2 px-4 rounded-full">Mas Productos</Link>
      </div>
      
      <CardGrid products={products} />
    </div>
  );
};

export default BestSellers;