import React, { useEffect, useState } from 'react';
import { useCategoriaStore } from '../../store/categoriaStore';
import Swal from 'sweetalert2';
import { fetchWithAuth } from '../../helpers/fetchWithAuth';

const ListCategoria: React.FC = () => {
  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const { categorias, fetchCategorias, deleteCategoria, updateCategoria, loading, error } = useCategoriaStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editCategoria, setEditCategoria] = useState<any>(null);
  const [editNombre, setEditNombre] = useState('');
  const [editDescripcion, setEditDescripcion] = useState('');
  const [editImagen, setEditImagen] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [editando, setEditando] = useState(false);
  

  // useEffect para cargar las categorías al montar el componente
  useEffect(() => {
    fetchCategorias();
  }, [fetchCategorias]);

  const handleEdit = (categoria: any) => {
    setEditCategoria(categoria);
    setEditNombre(categoria.nombre);
    setEditDescripcion(categoria.descripcion);
    setPreview(`https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${categoria.imagen}`);
    setEditImagen(null);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const confirm = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la categoría.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });
    if (!confirm.isConfirmed) return;

    try {
      await fetch(`http://localhost:3000/api/categoria/${id}`, {
        method: 'DELETE',
      });

      deleteCategoria(id);
      Swal.fire('Eliminado', 'Categoría eliminada exitosamente', 'success');
    } catch (err: any) {
      console.error('Error al eliminar la categoría:', err);
      Swal.fire('Error', err.message || 'Error desconocido', 'error');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editando) return;
    if (!editNombre.trim() || !editDescripcion.trim()) {
      Swal.fire('Error', 'Todos los campos son obligatorios.', 'error');
      return;
    }
    setEditando(true);
    try {
      const data = new FormData();
      data.append('nombre', editNombre);
      data.append('descripcion', editDescripcion);
      if (editImagen) {
        data.append('imagen', editImagen);
      }
     

      const response = await fetchWithAuth(`http://localhost:3000/api/categoria/${editCategoria.id}`, {
        method: 'PUT',
        body: data,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al actualizar la categoría');
      }
      const updated = await response.json();
      updateCategoria(editCategoria.id, updated);
      setModalOpen(false);
      Swal.fire('Éxito', 'Categoría actualizada exitosamente.', 'success');
    } catch (err: any) {
      Swal.fire('Error', err.message || 'Error desconocido', 'error');
    } finally {
      setEditando(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEditImagen(e.target.files[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
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
                  src={`https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${categoria.imagen}`}
                  alt={categoria.nombre}
                  className="h-12 w-12 object-cover rounded-full"
                  />

              </td>
              <td className="py-2 px-4">{categoria.nombre}</td>
              <td className="py-2 px-4">{categoria.descripcion}</td>
              <td className="py-2 px-4 flex justify-center space-x-2">
                <button
                  onClick={() => handleEdit(categoria)}
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

      {/* Modal para editar */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
              onClick={() => setModalOpen(false)}
            >
              ×
            </button>
            <h3 className="text-xl font-bold mb-4">Editar Categoría</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Imagen actual</label>
                {preview && (
                  <img
                    src={preview}
                    alt="Vista previa"
                    className="w-32 h-32 object-cover rounded-lg border mb-2"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  value={editNombre}
                  onChange={e => setEditNombre(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea
                  value={editDescripcion}
                  onChange={e => setEditDescripcion(e.target.value)}
                  rows={3}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  disabled={editando}

                >
                  {editando ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListCategoria;
