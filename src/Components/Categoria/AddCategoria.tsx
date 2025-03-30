import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useCategoriaStore } from '../../store/categoriaStore';

const AddCategoria: React.FC = () => {
  const [formData, setFormData] = useState({
    imagen: null as File | null,
    nombre: '',
    descripcion: '',
  });

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null); // Estado para la vista previa de la imagen
  const { addCategoria } = useCategoriaStore(); // Obtener la función para agregar categoría al estado global

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, imagen: file });

      // Generar la vista previa de la imagen
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar campos
    if (!formData.imagen) {
      Swal.fire('Error', 'Por favor, selecciona una imagen.', 'error');
      return;
    }
    if (!formData.nombre.trim()) {
      Swal.fire('Error', 'El campo "Nombre" no puede estar vacío.', 'error');
      return;
    }
    if (formData.nombre.length < 3) {
      Swal.fire('Error', 'El nombre debe tener al menos 3 caracteres.', 'error');
      return;
    }
    if (!formData.descripcion.trim()) {
      Swal.fire('Error', 'El campo "Descripción" no puede estar vacío.', 'error');
      return;
    }
    if(formData.descripcion.length < 10)    {
        Swal.fire('Error', 'La descripción debe tener al menos 10 caracteres.', 'error');
        return;
        }

    setLoading(true);

    const data = new FormData();
    data.append('imagen', formData.imagen as File);
    data.append('nombre', formData.nombre);
    data.append('descripcion', formData.descripcion);

    try {
      const response = await fetch('http://localhost:3000/api/categoria/', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al crear la categoría');
      }

      const result = await response.json();
      console.log('Categoría creada:', result);

      // Agregar la nueva categoría al estado global
      addCategoria(result);

      // Reiniciar el formulario
      setFormData({
        imagen: null,
        nombre: '',
        descripcion: '',
      });
      setPreview(null); // Reiniciar la vista previa

      Swal.fire('Éxito', 'Categoría creada exitosamente.', 'success');
    } catch (err: any) {
      console.error('Error al crear la categoría:', err);

      // Mostrar el error del backend con SweetAlert2
      Swal.fire('Error', err.message || 'Error desconocido', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-4">Agregar Categoría</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="imagen" className="block text-sm font-medium text-gray-700">
            Imagen <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {/* Vista previa de la imagen */}
          {preview && (
            <div className="mt-4">
              <img
                src={preview}
                alt="Vista previa"
                className="w-80 h-80 object-cover rounded-lg border"
              />
            </div>
          )}
        </div>
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
            Nombre <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre de la categoría"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
            Descripción <span className="text-red-500">*</span>
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Descripción de la categoría"
            rows={4}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-lg transition ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            disabled={loading}
          >
            {loading ? 'Creando...' : 'Crear Categoría'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoria;