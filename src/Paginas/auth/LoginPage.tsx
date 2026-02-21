import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuthStore } from '../../store/authStore';

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    correo: '',
    password: '',

  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

const API_URL = import.meta.env.VITE_API_URL;
const urldeveloper = 'http://localhost:3000';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que los campos no estén vacíos
    if (!formData.correo || !formData.password) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, completa todos los campos.',
      });
      return;
    }

    // Validar que el correo sea válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.correo)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, ingresa un correo electrónico válido.',
      });
      return;
    }

    // Validar que la contraseña tenga al menos 6 caracteres
    if (formData.password.length < 6) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La contraseña debe tener al menos 6 caracteres.',
      });
      return;
    }

    try {
      const response = await fetch(`${urldeveloper}/api/usuario/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: formData.correo,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        console.log('Error en la respuesta del servidor:', response.status, response.statusText);
        const errorData = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorData.error || 'Error en la solicitud',
        });
        return;
      }

      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      // Actualizar el estado global con el token y el rol
      useAuthStore.getState().setAuth(true, formData.correo, data.role, data.token, data.id);

      Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión exitoso',
        text: 'Bienvenido a la plataforma',
      });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al iniciar sesión.',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/img/Logo.svg" alt="Logo" className="h-12" />
        </div>

        {/* Título */}
        <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="correo" className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="correo"
              placeholder="correo@ejemplo.com"
              value={formData.correo}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Botón de inicio de sesión */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Iniciar Sesión
          </button>
        </form>

        {/* Enlaces */}
        <div className="flex justify-between items-center mt-4">
          <Link to="/auth/forgot-password" className="text-sm text-blue-600 hover:underline">
            Olvidé mi contraseña
          </Link>
          <Link to="/auth/register" className="text-sm text-blue-600 hover:underline">
            Crear cuenta
          </Link>
        </div>
      </div>
    </div>
  );
};
