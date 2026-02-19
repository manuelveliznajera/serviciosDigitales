import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { ProductoCart } from "../../Interfaces/ProductoCart";

interface CartSidebarProps {
  productos: ProductoCart[];
  isOpen: boolean;
  onClose: () => void;
  aumentarCantidad: (id: string) => void;
  disminuirCantidad: (id: string) => void;
  removeProducto: (id: string) => void;
  onVerTodo: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({
  productos,
  isOpen,
  onClose,
  aumentarCantidad,
  disminuirCantidad,
  removeProducto,
  onVerTodo,
}) => {
  const total = productos.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );

  return (
    <>
      {/* Overlay oscuro */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity ${
          isOpen ? "opacity-60 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-50">
          <h2 className="text-lg font-bold">Carrito</h2>
          <button
            onClick={onClose}
            className="text-gray-700 hover:text-gray-900 transition"
          >
            <AiOutlineClose size={24} />
          </button>
        </div>

        {/* Contenido */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {productos.length === 0 && (
            <p className="text-gray-500">Tu carrito está vacío</p>
          )}
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="flex justify-between items-center border-b border-blue-700 pb-2"
            >
              <div>
                <p className="font-medium text-amber-800">{producto.nombre}</p>
                <p className="text-sm text-gray-500">
                  Subtotal: ${producto.precio * producto.cantidad}
                </p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2">
                  <button
                    className="bg-gray-200 px-2 rounded hover:bg-gray-300 transition"
                    onClick={() => disminuirCantidad(producto.id)}
                  >
                    -
                  </button>
                  <span className="text-amber-950">{producto.cantidad}</span>
                  <button
                    className="bg-gray-200 px-2 rounded hover:bg-gray-300 transition"
                    onClick={() => aumentarCantidad(producto.id)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="text-red-500 text-sm hover:underline"
                  onClick={() => removeProducto(producto.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t">
          <p className="font-bold mb-4 text-lg text-red-700">Total: Q {total}</p>
          <button
            onClick={onVerTodo}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Ver todo
          </button>
        </div>
      </div>
    </>
  );
};