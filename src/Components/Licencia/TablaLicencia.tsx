import React from "react";

export interface Producto {
  id: number;
  productoId: number;
  clave: string;
  estado: string; // Si querés lo hacemos enum luego
  createdAt: string;
  updatedAt: string;
  Producto: {
    nombreProducto: string;
  };
}

interface Props {
  data: Producto[];
  onEditar: (item: Producto) => void;
  onEliminar: (id: number) => void;
  onAsignar: (item: Producto) => void;
}

const TablaProductos: React.FC<Props> = ({ data, onEditar, onEliminar, onAsignar }) => {

    if (!data || data.length === 0) {
        return <div className="p-4">No hay licencias disponibles.</div>;
      }
  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-left text-sm uppercase">
            <th className="py-3 px-4 border-b">ID</th>
            <th className="py-3 px-4 border-b">Producto</th>
            <th className="py-3 px-4 border-b">Clave</th>
            <th className="py-3 px-4 border-b">Estado</th>
            <th className="py-3 px-4 border-b">Creado</th>
            <th className="py-3 px-4 border-b text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: Producto) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{item.id}</td>
              <td className="py-2 px-4 border-b">{item.Producto.nombreProducto}</td>
              <td className="py-2 px-4 border-b">{item.clave}</td>
              <td className="py-2 px-4 border-b">{item.estado}</td>
              <td className="py-2 px-4 border-b">
                {new Date(item.createdAt).toLocaleString()}
              </td>
            
              <td className="py-2 px-4 border-b text-center space-x-2">
                <button
                  onClick={() => onEditar(item)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                >
                  Editar
                </button>
                <button
                  onClick={() => onEliminar(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  Eliminar
                </button>
                <button
                  onClick={() => onAsignar(item)}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                >
                  Asignar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaProductos;