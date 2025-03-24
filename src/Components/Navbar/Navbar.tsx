import React from 'react';

import { CiUser, CiShoppingCart} from "react-icons/ci";
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="flex items-center">
      <Link to="/">
          <img src="/img/Logo.svg" alt="Logo" className="h-8 mr-2" />
        </Link>
      </div>
      <div className="flex space-x-4">
        <Link to="/softwares" className="text-black">Softwares</Link>
        <Link to="/diseno-grafico" className="text-black">Diseño Gráfico</Link>
        <Link to="/sobre-nosotros" className="text-black">Sobre Nosotros</Link>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Office 2021..."
            className="border border-blue-600 rounded-full py-1 px-4"
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              className="h-5 w-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
          </span>
        </div>
        <button className="bg-blue-600 text-white rounded-full p-2">
          <CiUser />
        </button>
        <button className="bg-blue-600 text-white rounded-full p-2">
         <CiShoppingCart />
        </button>
        
      </div>
    </nav>
  );
};

export default Navbar;