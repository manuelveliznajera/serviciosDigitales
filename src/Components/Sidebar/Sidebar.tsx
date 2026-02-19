import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore'; // Importar el store de Zustand
import { FiLogOut } from 'react-icons/fi'; // Icono de logout

const Sidebar: React.FC = () => {
  const { isLoggedIn, logout } = useAuthStore(); // Obtener el estado y la función de logout desde el store
  const location = useLocation(); // Obtener la ruta actual

  return (
    <div className="w-64 h-screen bg-gray-100 flex flex-col p-4 space-y-4 shadow-lg">
      <h2 className="text-xl text-gray-600 font-bold mb-4">Administrador</h2>
      {/* Botón de Logout */}
      {isLoggedIn && (
        <button
          onClick={logout}
          className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
        >
          <FiLogOut className="mr-2 text-2xl" /> Logout
        </button>
      )}
      <Link
        to="/admin/agregar-producto"
        className={`px-4 py-2 rounded-lg ${
          location.pathname === '/admin/agregar-producto'
            ? 'bg-gray-600 text-white'
            : 'hover:bg-gray-400 border-1 text-gray-600 border-solid border-gray-700'
        }`}
      >
        Agregar Producto
      </Link>
      <Link
        to="/admin/categoria"
        className={`px-4 py-2 rounded-lg ${
          location.pathname === '/admin/categoria'
          ? 'bg-gray-600 text-white'
            : 'hover:bg-gray-400 border-1 text-gray-600 border-solid border-gray-700'
        }`}
      >
        Categoría
      </Link>
      <Link
        to="/admin/cliente"
        className={`px-4 py-2 rounded-lg ${
          location.pathname === '/admin/cliente'
           ? 'bg-gray-600 text-white'
            : 'hover:bg-gray-400 border-1 text-gray-600 border-solid border-gray-700'
        }`}
      >
        Cliente
      </Link>
       <Link
        to="/admin/usuarios"
        className={`px-4 py-2 rounded-lg ${
          location.pathname === '/admin/usuarios'
           ? 'bg-gray-600 text-white'
            : 'hover:bg-gray-400 border-1 text-gray-600 border-solid border-gray-700'
        }`}
      >
        Usuarios
      </Link>
      <Link
        to="/admin/cupones"
        className={`px-4 py-2 rounded-lg ${
          location.pathname === '/admin/cupones'
           ? 'bg-gray-600 text-white'
            : 'hover:bg-gray-400 border-1 text-gray-600 border-solid border-gray-700'
        }`}
      >
        
        Cupones
      </Link>
      <Link
        to="/admin/ventas"
        className={`px-4 py-2 rounded-lg ${
          location.pathname === '/admin/ventas'
           ? 'bg-gray-600 text-white'
            : 'hover:bg-gray-400 border-1 text-gray-600 border-solid border-gray-700'
        }`}
      >
        
        Ventas
      </Link>
       <Link
        to="/admin/licencias"
        className={`px-4 py-2 rounded-lg ${
          location.pathname === '/admin/licencias'
           ? 'bg-gray-600 text-white'
            : 'hover:bg-gray-400 border-1 text-gray-600 border-solid border-gray-700'
        }`}
      >
        
        Licencias
      </Link>
    </div>
  );
};

export default Sidebar;