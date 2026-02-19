import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { fetchWithAuth } from "../../helpers/fetchWithAuth";

interface Cupon {
  id: number;
  codigo: string;
  tipo: string;
  valor: number;
  maxUsos: number;
  usos: number;
  fechaExpira: string;
 
}

interface EditCuponModalProps {
  onOpen: boolean;
  onClose: () => void;
  cuponEdit: Cupon;
}

const EditCuponModal: React.FC<EditCuponModalProps> = ({ onOpen, onClose, cuponEdit }) => {
  const [formData, setFormData] = useState({
    codigo: "",
    tipo: "",
    valor: 0,
    maxUsos: "",
    usos: "",
    fechaExpira: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Cargar datos del cupón al abrir el modal
  useEffect(() => {
    if (cuponEdit) {
      setFormData({
        codigo: cuponEdit.codigo || "",
        tipo: cuponEdit.tipo || "",
        valor: cuponEdit.valor || 0,
        maxUsos: cuponEdit.maxUsos?.toString() || "",
        usos: cuponEdit.usos?.toString() || "",
        fechaExpira: cuponEdit.fechaExpira
          ? cuponEdit.fechaExpira.slice(0, 16)
          : "",
      });
    }
  }, [cuponEdit]);

  // Manejar cambios en inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Enviar actualización
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetchWithAuth(`http://localhost:3000/api/cupones/${cuponEdit.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          maxUsos: Number(formData.maxUsos),
          usos: Number(formData.usos),
        }),
      });

      if (!response.ok) throw new Error("Error al actualizar el cupón");

      setMessage("✅ Cupón actualizado correctamente");
        onClose();
    } catch (error) {
      console.error(error);
      setMessage("❌ Error al actualizar el cupón");
    } finally {
      setLoading(false);
    }
  };

  if (!onOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 relative">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Editar Cupón
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Código
            </label>
            <input
              type="text"
              name="codigo"
              value={formData.codigo}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Tipo
            </label>
            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200"
            >
              <option value="fijo">Fijo</option>
              <option value="porcentaje">Porcentaje</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Valor
              </label>
              <input
                type="number"
                name="valor"
                value={formData.valor}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Máx. Usos
              </label>
              <input
                type="number"
                name="maxUsos"
                value={formData.maxUsos}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Usos actuales
              </label>
              <input
                type="number"
                name="usos"
                value={formData.usos}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Fecha de expiración
              </label>
              <input
                type="datetime-local"
                name="fechaExpira"
                value={formData.fechaExpira}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200"
              />
            </div>
          </div>

          {message && (
            <p
              className={`text-sm ${
                message.includes("Error") ? "text-red-500" : "text-green-600"
              }`}
            >
              {message}
            </p>
          )}

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCuponModal;