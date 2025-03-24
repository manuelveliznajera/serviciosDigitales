import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import SuscribirseSection from '../SuscribirseSection/SuscribirseSection';

const reviews = [
  {
    text: "Compré una licencia de Windows y funcionó sin problema alguno, recomiendo totalmente este lugar para compras de software, rápido sencillo y útil!",
    name: "Mario Roberto Gonzalez",
    avatar: "/img/avatars/mario.jpeg",
  },
  {
    text: "Una excelente atención y por supuesto un buen servicio; 100% recomendado para todas aquellas personas que estén interesadas en adquirir alguno de sus productos o servicio.",
    name: "Erick Rivera",
    avatar: "/img/avatars/erick.jpg",
  },
];

const ResenaSection = () => {
  return (
    <div className="flex flex-col w-full py-50  text-white ">
      <div className='flex'>
    
      <div className="flex flex-col justify-between w-1/3  mb-8 ">
        <h2 className="text-3xl text-black font-bold">Más de 100 clientes eligen a Servicios Digitales para potenciar su negocio</h2>
        
      </div>
      <div className="flex justify-center w-2/3 space-x-8 ">
        {reviews.map((review, index) => (
          <div key={index} className="bg-white text-black rounded-lg p-6 shadow-2xl w-1/3">
            <FaQuoteLeft className="text-blue-600 text-2xl mb-4" />
            <p className="mb-4">{review.text}</p>
            <div className="flex items-center">
              <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full mr-4" />
              <p className="font-bold">{review.name}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
      <div className="">
        <button className="bg-blue-600 text-white rounded-full p-2 mx-2">
          <FaQuoteLeft />
        </button>
        <button className="bg-blue-600 text-white rounded-full p-2 mx-2">
          <FaQuoteLeft />
        </button>
        </div>
      
    </div>
  );
};

export default ResenaSection;