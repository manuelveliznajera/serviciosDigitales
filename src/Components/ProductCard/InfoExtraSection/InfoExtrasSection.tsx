import React from 'react';
import { FaGem, FaWpforms} from "react-icons/fa";
import { CiPercent } from "react-icons/ci";

const infoExtras = [
  {
    icon: <FaGem />,
    title: 'Comodidad',
    description: 'Compra desde cualquier lugar y en cualquier momento.',
  },
  {
    icon: <CiPercent />,
    title: 'Ofertas',
    description: 'Aprovecha nuestras promociones y precios competitivos.',
  },
  {
    icon: <FaWpforms />,
    title: 'Información Detallada',
    description: 'Descripciones, especificaciones y opiniones de otros clientes.',
  },
];

const InfoExtras: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-b from-[#0101a7] to-[#015afc]  py-16">
      <h2 className="text-3xl text-center font-bold text-white mb-20">Ventajas de comprar con nosotros</h2>
      <div className=" flex  justify-center space-x-8 absolute -bottom-16">
        {infoExtras.map((advantage, index) => (
          <div key={index} className="bg-white flex flex-col items-start shadow-md rounded-lg p-4 w-1/4 ">
            <div className="text-4xl mb-4 text-[#0101a7]"> {advantage.icon} </div>
            <h3 className="text-xl font-bold text-[#0101a7] mb-2">{advantage.title}</h3>
            <p className="text-gray-600">{advantage.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoExtras;