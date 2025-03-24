import React from 'react';

const SuscribirseSection: React.FC = () => {
  return (
    <div className="relative rounded-2xl -bottom-16 bg-radial from-[#0098DB]  to-[#015AFC] text-center py-16">
      <div className="absolute inset-0  bg-center" style={{ backgroundImage: 'url(/img/Vector.svg)', opacity: 0.5 }}></div>
      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-white mb-8">¡Suscríbete para estar atento a nuestras ofertas!</h2>
        <div className="flex justify-center items-center">
          <input
            type="email"
            placeholder="Introduce tu email"
            className="py-2 px-4 rounded-l-full border-none outline-none"
          />
          <button className="bg-black text-white py-2 px-4 rounded-r-full">Suscribirme</button>
        </div>
      </div>
    </div>
  );
};

export default SuscribirseSection;