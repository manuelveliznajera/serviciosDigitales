import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useProductStore } from '../../store/productStore';
import { useCategoriaStore } from '../../store/categoriaStore'; // Importa el store de categorías
import { useAuthStore } from '../../store/authStore';

export const AddProduct = () => {
  const [formData, setFormData] = useState({
    nombreProducto: '',
    descripcion: '',
    stock: '',
    precioCosto: '',
    precioPublico: '',
    categoriaId: '',
    favorito: false,
    imagen: null as File | null,
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [errores, setErrores] = useState<any>({});

  const addProducto = useProductStore(state => state.addProducto);
  const token = useAuthStore( state => state.token)
  // Usar zustand para categorías
  const { categorias, fetchCategorias } = useCategoriaStore();

  useEffect(() => {
    fetchCategorias();
  }, [fetchCategorias]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as any;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, imagen: file });
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica
    let newErrores: any = {};
    if (!formData.nombreProducto.trim()) newErrores.nombreProducto = 'El nombre del producto es obligatorio.';
    if (!formData.descripcion.trim()) newErrores.descripcion = 'La descripción es obligatoria.';
    if (!formData.stock) newErrores.stock = 'El stock es obligatorio.';
    if (!formData.precioCosto) newErrores.precioCosto = 'El precio de costo es obligatorio.';
    if (!formData.precioPublico) newErrores.precioPublico = 'El precio público es obligatorio.';
    if (!formData.categoriaId) newErrores.categoriaId = 'La categoría es obligatoria.';
    if (!formData.imagen) newErrores.imagen = 'La imagen es obligatoria.';

    setErrores(newErrores);

    if (Object.keys(newErrores).length > 0) return;

    const data = new FormData();
    data.append('nombreProducto', formData.nombreProducto);
    data.append('descripcion', formData.descripcion);
    data.append('stock', formData.stock);
    data.append('precioCosto', formData.precioCosto);
    data.append('precioPublico', formData.precioPublico);
    data.append('categoriaId', formData.categoriaId);
    data.append('favorito', String(formData.favorito));
    if (formData.imagen) {
      data.append('imagen', formData.imagen);
    }

       try {
        const res = await addProducto(data); // ahora devuelve el producto creado
        console.log("response en addproduct,", res);

        Swal.fire('Éxito', 'Producto creado exitosamente.', 'success');
        setFormData({
          nombreProducto: '',
          descripcion: '',
          stock: '',
          precioCosto: '',
          precioPublico: '',
          categoriaId: '',
          favorito: false,
          imagen: null,
        });
        setPreview(null);
        setErrores({});
      } catch (err: any) {
        console.error("Error en addProduct:", err);
        Swal.fire('Error', err.message || 'Error desconocido', 'error');
      }
  };

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4">Agregar Producto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre del Producto</label>
          <input
            type="text"
            name="nombreProducto"
            value={formData.nombreProducto}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
          />
          {errores.nombreProducto && (
            <p className="text-red-500 text-sm mt-1">{errores.nombreProducto}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
          />
          {errores.descripcion && (
            <p className="text-red-500 text-sm mt-1">{errores.descripcion}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            min={0}
          />
          {errores.stock && (
            <p className="text-red-500 text-sm mt-1">{errores.stock}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Precio Costo</label>
          <input
            type="number"
            name="precioCosto"
            value={formData.precioCosto}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            min={0}
            step="0.01"
          />
          {errores.precioCosto && (
            <p className="text-red-500 text-sm mt-1">{errores.precioCosto}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Precio Público</label>
          <input
            type="number"
            name="precioPublico"
            value={formData.precioPublico}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            min={0}
            step="0.01"
          />
          {errores.precioPublico && (
            <p className="text-red-500 text-sm mt-1">{errores.precioPublico}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Categoría</label>
          <select
            name="categoriaId"
            value={formData.categoriaId}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((cat: any) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
          {errores.categoriaId && (
            <p className="text-red-500 text-sm mt-1">{errores.categoriaId}</p>
          )}
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="favorito"
            checked={formData.favorito}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700">Favorito</label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Imagen</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm bg-gray-100 border border-gray-300 rounded-lg cursor-pointer p-3"
          />
          {preview && (
            <div className="mt-2">
              <img src={preview} alt="Vista previa" className="w-32 h-32 object-cover rounded-lg border" />
            </div>
          )}
          {errores.imagen && (
            <p className="text-red-500 text-sm mt-1">{errores.imagen}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Crear Producto
        </button>
      </form>
    </div>
  );
};
