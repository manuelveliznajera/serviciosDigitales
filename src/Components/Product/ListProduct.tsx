import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useProductStore } from '../../store/productStore'; // Asegúrate de importar el store
import { useCategoriaStore } from '../../store/categoriaStore';

interface ListProductProps {
  productos: any[];
  fetchProductos: () => void;
}

export const ListProduct: React.FC<ListProductProps> = ({ productos, fetchProductos }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editProducto, setEditProducto] = useState<any>(null);
  const [editNombre, setEditNombre] = useState('');
  const [editDescripcion, setEditDescripcion] = useState('');
  const [editStock, setEditStock] = useState('');
  const [editPrecioCosto, setEditPrecioCosto] = useState('');
  const [editPrecioPublico, setEditPrecioPublico] = useState('');
  const [editFavorito, setEditFavorito] = useState(false);
  const [editImagen, setEditImagen] = useState<File | null>(null);
  const [editCategoriaId, setEditCategoriaId] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);

  const { categorias } = useCategoriaStore();

  const updateProducto = useProductStore(state => state.updateProducto); 
  const deleteProducto = useProductStore(state => state.deleteProducto); // Obtén el método del store
  // Obtén el método del store

  const getProductoById = (id: string) => productos.find(p => p.id === id);

  const handleDelete = async (id: string) => {
    const confirm = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el producto.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });
    if (!confirm.isConfirmed) return;

     // Obtén el método del store
    
    try {
      const productoBorrado = await deleteProducto(id);

     console.log(productoBorrado)
      Swal.fire('Eliminado', 'Producto eliminado exitosamente', 'success');
      // Aquí deberías llamar a fetchProductos desde el padre o el store para actualizar la lista
    } catch (err: any) {
      Swal.fire('Error', err.message || 'Error desconocido', 'error');
    }
  };

  const handleEdit = (producto: any) => {
    const prod = getProductoById(producto.id);
    if (prod) {
      setEditProducto(prod);
      setEditNombre(prod.nombreProducto);
      setEditDescripcion(prod.descripcion);
      setEditStock(String(prod.stock));
      setEditPrecioCosto(String(prod.precioCosto));
      setEditPrecioPublico(String(prod.precioPublico));
      setEditFavorito(prod.favorito);
      setPreview(prod.imagen ? `http://localhost:3000/uploads/${prod.imagen}` : null);
      setEditCategoriaId(prod.categoriaId);
      setEditImagen(null);
      setModalOpen(true);
    } else {
      Swal.fire('Error', 'No se encontró el producto', 'error');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEditImagen(e.target.files[0]);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Enviar cambios al backend
  const handleEditBd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProducto) return;

    const data = new FormData();
    if (editNombre.trim()) data.append('nombreProducto', editNombre);
    if (editDescripcion.trim()) data.append('descripcion', editDescripcion);
    if (editStock) data.append('stock', editStock);
    if (editPrecioCosto) data.append('precioCosto', editPrecioCosto);
    if (editPrecioPublico) data.append('precioPublico', editPrecioPublico);
    if (editCategoriaId) data.append('categoriaId', String(editCategoriaId));
    data.append('favorito', String(editFavorito));
    if (editImagen instanceof File) {
      data.append('imagen', editImagen);
    }

    try {
      await updateProducto(editProducto.id, data);
      setModalOpen(false);
      fetchProductos();
      Swal.fire('Éxito', 'Producto actualizado exitosamente.', 'success');
    } catch (err: any) {
      Swal.fire('Error', err.message || 'Error desconocido', 'error');
    }
  };

  
  if (!productos || !Array.isArray(productos) || productos.length === 0)  {
  return <div className="text-center py-8">No hay productos para mostrar.</div>;
}

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Lista de Productos</h2>
      
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-[#012FD3] text-white">
            <th className="py-2 px-4">Imagen</th>
            <th className="py-2 px-4">Nombre</th>
            <th className="py-2 px-4">Descripción</th>
            <th className="py-2 px-4">Stock</th>
            <th className="py-2 px-4">Precio Costo</th>
            <th className="py-2 px-4">Precio Público</th>
            <th className="py-2 px-4">Favorito</th>
            <th className="py-2 px-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {  productos.map((producto) => (
            <tr key={producto.id} className="border-b border-gray-200">
              <td className="py-2 px-4">
                {producto.imagen ? (
                  <img
                    src={`http://localhost:3000/uploads/${producto.imagen}`}
                    alt={producto.nombreProducto}
                    className="h-12 w-12 object-cover rounded"
                  />
                ) : (
                  <span className="text-gray-400">Sin imagen</span>
                )}
              </td>
              <td className="py-2 px-4">{producto.nombreProducto}</td>
              <td className="py-2 px-4">{producto.descripcion}</td>
              <td className="py-2 px-4">{producto.stock}</td>
              <td className="py-2 px-4">{producto.precioCosto}</td>
              <td className="py-2 px-4">{producto.precioPublico}</td>
              <td className="py-2 px-4">{producto.favorito ? '⭐' : ''}</td>
              <td className="py-2 px-4 flex gap-2">
                <button
                  onClick={() => handleEdit(producto)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(producto.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))
        }
            </tbody>
        
      </table>

      {/* Modal de edición con formulario */}
      {modalOpen && editProducto && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
              onClick={() => setModalOpen(false)}
            >
              ×
            </button>
            <h3 className="text-xl font-bold mb-4">Editar Producto</h3>
            <form onSubmit={handleEditBd} className="space-y-4">
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
              <div>
                <label className="block text-sm font-medium text-gray-700">Stock</label>
                <input
                  type="number"
                  value={editStock}
                  onChange={e => setEditStock(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                  min={0}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Precio Costo</label>
                <input
                  type="number"
                  value={editPrecioCosto}
                  onChange={e => setEditPrecioCosto(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                  min={0}
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Precio Público</label>
                <input
                  type="number"
                  value={editPrecioPublico}
                  onChange={e => setEditPrecioPublico(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                  min={0}
                  step="0.01"
                />
              </div>
<div>
          <label className="block text-sm font-medium text-gray-700">Categoría</label>
          <select
            name="categoriaId"
            value={editCategoriaId}
            onChange={e => setEditCategoriaId(Number(e.target.value))}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((cat: any) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
         
        </div>



              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={editFavorito}
                  onChange={e => setEditFavorito(e.target.checked)}
                  className="mr-2"
                />
                <label className="text-sm font-medium text-gray-700">Favorito</label>
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
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
