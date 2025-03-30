import React, { useEffect } from 'react';
import { useCategoriaStore } from '../../store/categoriaStore';

const ListCategoria: React.FC = () => {
  const { categorias, fetchCategorias, deleteCategoria, loading, error } = useCategoriaStore();
console.log(categorias);
  // useEffect para cargar las categorías al montar el componente
  useEffect(() => {
    fetchCategorias();
  }, [fetchCategorias]);

  const handleEdit = (id: string) => {
    console.log(`Editar categoría con ID: ${id}`);
    // Aquí puedes redirigir a una página de edición o abrir un modal
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm('¿Estás seguro de que deseas eliminar esta categoría?');
    if (!confirm) return;

    try {
      await fetch(`http://localhost:3000/api/categoria/${id}`, {
        method: 'DELETE',
      });

      deleteCategoria(id); // Actualizar el estado global después de eliminar
      alert('Categoría eliminada exitosamente');
    } catch (err: any) {
      console.error('Error al eliminar la categoría:', err);
      alert(err.message || 'Error desconocido');
    }
  };

  if (loading) {
    return <p className="text-center">Cargando categorías...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Lista de Categorías</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-[#012FD3] text-white">
            <th className="py-2 px-4 text-left">Imagen</th>
            <th className="py-2 px-4 text-left">Nombre</th>
            <th className="py-2 px-4 text-left">Descripción</th>
            <th className="py-2 px-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id} className="border-b border-gray-200">
              <td className="py-2 px-4">
                <img
                  src={` http://localhost:3000/uploads/${categoria.imagen}`}
                  alt={categoria.nombre}
                  className="h-12 w-12 object-cover rounded-full"
                />
              </td>
              <td className="py-2 px-4">{categoria.nombre}</td>
              <td className="py-2 px-4">{categoria.descripcion}</td>
              <td className="py-2 px-4 flex justify-center space-x-2">
                <button
                  onClick={() => handleEdit(categoria.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(categoria.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListCategoria;