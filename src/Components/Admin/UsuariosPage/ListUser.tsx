import React, { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import { useUserStore, type UserRole, type Usuario } from '../../../store/userStore';

const getUserId = (user: Usuario) => String(user.id ?? user._id ?? '');
const getCorreo = (user: Usuario) => String(user.correo ?? user.email ?? '');
const getRole = (user: Usuario): UserRole =>
  user.role === 'Administrador' ? 'Administrador' : 'Cliente';

const ListUser: React.FC = () => {
  const { users, loading, fetchUsers, updateUser, deleteUser } = useUserStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState('');
  const [editCorreo, setEditCorreo] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [editRole, setEditRole] = useState<UserRole>('Cliente');

  useEffect(() => {
    fetchUsers().catch((error: any) => {
      Swal.fire('Error', error.message || 'No se pudieron cargar los usuarios.', 'error');
    });
  }, [fetchUsers]);

  const sortedUsers = useMemo(
    () => [...users].sort((a, b) => getCorreo(a).localeCompare(getCorreo(b))),
    [users]
  );

  const openEditModal = (user: Usuario) => {
    setEditId(getUserId(user));
    setEditCorreo(getCorreo(user));
    setEditPassword('');
    setEditRole(getRole(user));
    setModalOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || !editId) return;

    const payload: { correo: string; role: UserRole; password?: string } = {
      correo: editCorreo,
      role: editRole,
    };
    if (editPassword.trim()) payload.password = editPassword;

    try {
      await updateUser(editId, payload);
      setModalOpen(false);
      Swal.fire('Éxito', 'Usuario actualizado correctamente.', 'success');
    } catch (error: any) {
      Swal.fire('Error', error.message || 'No se pudo actualizar el usuario.', 'error');
    }
  };

  const handleDelete = async (user: Usuario) => {
    const id = getUserId(user);
    if (!id) return;

    const confirm = await Swal.fire({
      title: '¿Eliminar usuario?',
      text: `Se eliminará ${getCorreo(user)}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (!confirm.isConfirmed) return;

    try {
      await deleteUser(id);
      Swal.fire('Eliminado', 'Usuario eliminado correctamente.', 'success');
    } catch (error: any) {
      Swal.fire('Error', error.message || 'No se pudo eliminar el usuario.', 'error');
    }
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Usuarios</h2>
        <button
          type="button"
          onClick={() =>
            fetchUsers().catch((error: any) =>
              Swal.fire('Error', error.message || 'No se pudieron cargar los usuarios.', 'error')
            )
          }
          disabled={loading}
          className={`px-4 py-2 rounded-lg text-white text-sm ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          Recargar
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-[#012FD3] text-white text-sm">
              <th className="text-left px-4 py-3">Correo</th>
              <th className="text-left px-4 py-3">Rol</th>
              <th className="text-center px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center px-4 py-6 text-gray-500">
                  {loading ? 'Cargando usuarios...' : 'No hay usuarios disponibles'}
                </td>
              </tr>
            ) : (
              sortedUsers.map((user) => (
                <tr key={getUserId(user)} className="border-t border-gray-200 text-sm">
                  <td className="px-4 py-3">{getCorreo(user)}</td>
                  <td className="px-4 py-3">{getRole(user)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(user)}
                        disabled={loading}
                        className={`px-3 py-1.5 rounded-lg text-white ${
                          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(user)}
                        disabled={loading}
                        className={`px-3 py-1.5 rounded-lg text-white ${
                          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
                        }`}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-5 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Editar Usuario</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label htmlFor="edit-correo" className="block text-sm font-medium text-gray-700 mb-1">
                  Correo
                </label>
                <input
                  id="edit-correo"
                  type="email"
                  value={editCorreo}
                  onChange={(e) => setEditCorreo(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="edit-password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password (opcional)
                </label>
                <input
                  id="edit-password"
                  type="password"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  minLength={6}
                  placeholder="Dejar vacío para no cambiar"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="edit-role" className="block text-sm font-medium text-gray-700 mb-1">
                  Rol
                </label>
                <select
                  id="edit-role"
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value as UserRole)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Administrador">Administrador</option>
                  <option value="Cliente">Cliente</option>
                </select>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-400 text-white hover:bg-gray-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-4 py-2 rounded-lg text-white ${
                    loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {loading ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListUser;
