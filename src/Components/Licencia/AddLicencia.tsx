import React, { useEffect, useMemo, useState } from "react";
import type { ProductoDb } from "../../Interfaces/Product";

export type EstadoLicencia = "Disponible" | "Usada";

export interface InitialDataType {
  id: number;
  productoId: number;
  clave: string;
  estado: string; // si quieres, cámbialo a EstadoLicencia
}

export interface AddLicenciaProps {
  productos: ProductoDb[]; // Debe incluir al menos: { id: number; nombreProducto: string; }
  onSubmit: (productoId: number, clave: string, estado: string) => void | Promise<void>;
  initialData: InitialDataType;
  onCancel?: () => void;
}

export const AddLicencia: React.FC<AddLicenciaProps> = ({
  productos,
  onSubmit,
  initialData,
  onCancel,
}) => {
  const [productoId, setProductoId] = useState<number>(0);
  const [clave, setClave] = useState<string>("");
  const [estado, setEstado] = useState<string>("Disponible");

  // Determina si estamos en modo edición
  const isEditing = useMemo(() => initialData?.id > 0, [initialData]);
  console.log(isEditing, "isEditing en add licencia");

  // Carga datos en el formulario cuando cambie initialData (crear/editar)
  useEffect(() => {
    if (isEditing) {
      setProductoId(initialData.productoId ?? 0);
      setClave(initialData.clave ?? "");
      setEstado((initialData.estado as EstadoLicencia) ?? "Disponible");
    } else {
      setProductoId(0);
      setClave("");
      setEstado("Disponible");
    }
  }, [isEditing, initialData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!productoId || !clave.trim()) return;
    await onSubmit(productoId, clave.trim(), estado);
  };

  return (
    <div className="w-full max-w-md bg-white p-6 rounded shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">
          {isEditing ? "Editar Licencia" : "Crear Licencia"}
        </h2>
        {isEditing && (
          <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800">
            ID #{initialData.id}
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="text-sm font-medium">
          Producto
          <select
            value={productoId || ""}
            onChange={(e) => setProductoId(Number(e.target.value))}
            className="mt-1 w-full border p-2 rounded"
            required
          >
            <option value="">Selecciona un producto</option>
            {productos.map((prod) => (
              <option key={prod.id} value={prod.id}>
                {prod.nombreProducto}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm font-medium">
          Clave
          <input
            type="text"
            placeholder="Ej: ABC-123-XYZ"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            className="mt-1 w-full border p-2 rounded"
            required
          />
        </label>

        <label className="text-sm font-medium">
          Estado
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="mt-1 w-full border p-2 rounded"
          >
            <option value="Disponible">Disponible</option>
            <option value="Usada">Usada</option>
          </select>
        </label>

        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={!productoId || !clave.trim()}
          >
            {isEditing ? "Guardar cambios" : "Crear licencia"}
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded border hover:bg-gray-50"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddLicencia;