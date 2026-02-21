import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useUserStore, type UserRole } from '../../../store/userStore';

interface AddUserFormData {
  correo: string;
  password: string;
  role: UserRole;
}

const AddUser: React.FC = () => {
  const { createUser, loading } = useUserStore();
  const [formData, setFormData] = useState<AddUserFormData>({
    correo: '',
    password: '',
    role: 'Cliente',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    try {
      await createUser(formData);

      setFormData({
        correo: '',
        password: '',
        role: 'Cliente',
      });
      Swal.fire('Éxito', 'Usuario creado correctamente.', 'success');
    } catch (error: any) {
      Swal.fire('Error', error.message || 'No se pudo crear el usuario.', 'error');
    }
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-5">
        Agregar Usuario
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-1">
          <label htmlFor="correo" className="block text-sm font-medium text-gray-700 mb-1">
            Correo
          </label>
          <input
            id="correo"
            name="correo"
            type="email"
            value={formData.correo}
            onChange={handleChange}
            required
            placeholder="correo@ejemplo.com"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="md:col-span-1">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            placeholder="******"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
            Rol
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm sm:text-base bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Administrador">Administrador</option>
            <option value="Cliente">Cliente</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className={`w-full sm:w-auto rounded-lg px-5 py-2.5 text-white font-medium ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Guardando...' : 'Agregar Usuario'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
