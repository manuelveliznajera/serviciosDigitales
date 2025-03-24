import React from 'react';
import { FaWhatsapp, FaEnvelope, FaFacebook, FaInstagram } from 'react-icons/fa';

interface FooterSectionProps {
  className?: string;
}
const FooterSection: React.FC<FooterSectionProps>= ({className}) => {
  return (
    <footer className={`bg-gradient-to-b from-blue-500 via-[#012FD3] to-[#0101A7] text-white pb-20 ${className}`}>
      <div className="container mx-auto flex justify-between">
        <div>
          <h3 className="text-lg font-bold mb-2">SERVICIOS DIGITALES</h3>
          <p className="mb-4">Digital y verdaderamente tuyo.</p>
          <p className="flex items-center mb-2">
            <FaWhatsapp className="mr-2" /> +502 5872 5595
          </p>
          <p className="flex items-center">
            <FaEnvelope className="mr-2" /> info@serviciosdigitalesgtm.com
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2">Información</h3>
          <ul>
            <li className="mb-2"><a href="#" className="hover:underline">Sobre Nosotros</a></li>
            <li className="mb-2"><a href="#" className="hover:underline">Términos y Condiciones</a></li>
            <li className="mb-2"><a href="#" className="hover:underline">Política de Privacidad</a></li>
            <li><a href="#" className="hover:underline">Política de Reembolso</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2">Servicios</h3>
          <ul>
            <li className="mb-2"><a href="#" className="hover:underline">Softwares</a></li>
            <li><a href="#" className="hover:underline">Diseño Gráfico</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2">Métodos de pago</h3>
          <div className="flex space-x-2">
            <img src="/img/iconsPagos.png" alt="MasterCard" className="h-8" />
            
          </div>
        </div>
      </div>
      <div className="border-t border-gray-300 my-4"></div>
      <div className="container mx-auto flex justify-between items-center mt-8">
        <p>© 2024. SERVICIOS DIGITALES</p>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-300"><FaInstagram /></a>
          <a href="#" className="hover:text-gray-300"><FaFacebook /></a>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;