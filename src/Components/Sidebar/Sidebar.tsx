import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore'; // Importar el store de Zustand
import { FiLogOut } from 'react-icons/fi'; // Icono de logout

const Sidebar: React.FC = () => {
  const { isLoggedIn, logout } = useAuthStore(); // Obtener el estado y la función de logout desde el store

  return (
    <div className="w-64 h-screen bg-[#012FD3] text-white flex flex-col p-4 space-y-4 shadow-lg">
      <h2 className="text-xl font-bold mb-4">Administrador</h2>
          {/* Botón de Logout */}
          {isLoggedIn && (
        <button
          onClick={logout}
          className="flex items-center px-4 py-2  bg-red-600 hover:bg-red-700 rounded-lg"
        >
          <FiLogOut className="mr-2 text-2xl text-white" /> Logout
        </button>
      )}
      <Link
        to="/admin/agregar-producto"
        className="px-4 py-2 hover:bg-blue-700 rounded-lg"
      >
        Agregar Producto
      </Link>
      <Link
        to="/admin/categoria"
        className="px-4 py-2 hover:bg-blue-700 rounded-lg"
      >
        Categoría
      </Link>
      <Link
        to="/admin/cliente"
        className="px-4 py-2 hover:bg-blue-700 rounded-lg"
      >
        Cliente
      </Link>

  
    </div>
  );
};

export default Sidebar;