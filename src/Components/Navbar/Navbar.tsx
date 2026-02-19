import React from 'react';
import { CiUser, CiShoppingCart, CiLogout } from "react-icons/ci";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { CartButton } from './CartButton';

const MenuItems = [
  { name: 'Softwares', path: '/softwares' },
  { name: 'Diseño Gráfico', path: '/diseno-grafico' },
  { name: 'Sobre Nosotros', path: '/sobre-nosotros' },
];

const Navbar: React.FC<{ role: string | null }> = () => {
  const { isLoggedIn, logout } = useAuthStore(); // Obtener el estado y la función de logout desde el store
  const location = useLocation();
  const navigate = useNavigate(); // Para redirigir después del logout
  const isHomePage = location.pathname === '/';

  const handleLogout = () => {
    logout(); // Limpiar el estado en Zustand
    navigate('/auth/login'); // Redirigir al login
  };

  return (
    <div className="flex flex-col p-1 gap-0.5 w-full">
      <nav
        className={`flex items-center justify-between p-4 w-full ${
          isHomePage && !isLoggedIn  ? "bg-white text-[#012fd3]" : "bg-[#012FD3] text-white"
          
        }`}
      >
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img
              src="/img/Logo.svg"
              alt="Logo"
              className={`h-8 mr-2 ${isHomePage ? "" : "invert brightness-0"}`}
            />
          </Link>
        </div>

        {/* Menú principal */}
        <div className="flex space-x-4">
          {MenuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-lg font-semibold ${
                isHomePage ? "text-black" : "text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Barra de búsqueda y botones */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Office 2021..."
              className={`border rounded-full py-1 px-4 ${
                isHomePage
                  ? "border-blue-600 text-blue-600"
                  : "border-white text-white"
              }`}
            />
            <span
              className={`absolute inset-y-0 right-0 flex items-center pr-3 ${
                isHomePage ? "text-blue-600" : "text-white"
              }`}
            >
              <svg
                className={`h-5 w-5 ${isHomePage ? "text-blue" : "text-white"}`}
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
          <Link
            to={isLoggedIn ? "#" : "/auth/login"}
            onClick={isLoggedIn ? handleLogout : undefined}
            className={` ${
              isHomePage
                ? "bg-blue-600 text-white pointer-events-auto"
                : "bg-white text-blue-950 "
            } rounded-full p-2`}
          >
            {isLoggedIn ? (
              <CiLogout className="text-2xl" />
            ) : (
              <CiUser className="text-2xl" />
            )}
          </Link>
          <div
            className={` ${
              isHomePage
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-950"
            } rounded-full p-2`}
          >
           <CartButton />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;