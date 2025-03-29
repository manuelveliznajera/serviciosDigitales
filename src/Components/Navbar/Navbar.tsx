import React from 'react';

import { CiUser, CiShoppingCart} from "react-icons/ci";
import { Link, useLocation } from 'react-router-dom';

const MenuItems = [
  { name: 'Softwares', path: '/softwares' },
  { name: 'Diseño Gráfico', path: '/diseno-grafico' },
  { name: 'Sobre Nosotros', path: '/sobre-nosotros' },
];

const Navbar: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  return (
    <nav className={` flex items-center justify-between p-4 ${isHomePage ?   "bg-white shadow-md text-white" : "bg-[#012FD3]"}`}>    
      <div className="flex items-center">
      <Link to="/">
      
          <img src="/img/Logo.svg" alt="Logo" className={` "h-8 mr-2 "${isHomePage ? " ":" invert brightness-0"} `}/> 
        </Link>
      </div>
      <div className="flex space-x-4">
        {
          MenuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-lg font-semibold ${isHomePage ? "text-black" : "text-white"}`}
            >
              {item.name}
            </Link>
          ))
        }
        {/* <Link to="/softwares" className={` ${isHomePage ? "text-black": "text-white"}`}>Softwares</Link>
        <Link to="/diseno-grafico" className="text-black">Diseño Gráfico</Link>
        <Link to="/sobre-nosotros" className="text-black">Sobre Nosotros</Link> */}
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Office 2021..."
            className={`border rounded-full py-1 px-4 ${isHomePage ? "border-blue-600 text-blue-600" : "border-white text-white " }`}
          />
          <span className={` absolute inset-y-0 right-0 flex items-center pr-3  ${isHomePage ? "text-blue-600" : "text-white"}`}>
            <svg
              className={`h-5 w-5 ${ isHomePage ? "text-blue " : "text-white"} `}
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
        <button 
        className={` ${isHomePage ? "bg-blue-600 text-white" : "bg-white text-blue-950"} rounded-full p-2`}
        >
          <CiUser />
        </button>
        <button 
                className={` ${isHomePage ? "bg-blue-600 text-white" : "bg-white text-blue-950"} rounded-full p-2`}

        >
         <CiShoppingCart />
        </button>
        
      </div>
    </nav>
  );
};

export default Navbar;