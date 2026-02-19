import React, { useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { CartSidebar } from "./CartSideBar";
import { useCartStore } from "../../store/useCartStore";

export const CartButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const {
    productos,
   
    aumentarCantidad,
    disminuirCantidad,
    removeProducto,
   
  } = useCartStore();



  const handleVerTodo = () => {
    navigate("/checkout");
    setIsOpen(false);
  };

  return (
    <>
      {/* Botón del carrito con badge */}
      <button
        className="bg-blue-600 text-white rounded-full p-2 relative"
        onClick={() => setIsOpen(true)}
      >
        <CiShoppingCart size={24} />

        {/* Badge de cantidad */}
        {productos.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
            {productos.reduce((acc, p) => acc + p.cantidad, 0)}
          </span>
        )}
      </button>

      {/* Sidebar del carrito */}
      <CartSidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        productos={productos}
        aumentarCantidad={aumentarCantidad}
        disminuirCantidad={disminuirCantidad}
        removeProducto={removeProducto}
        onVerTodo={handleVerTodo}
      />
    </>
  );
};