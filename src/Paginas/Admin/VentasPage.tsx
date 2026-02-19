import { useEffect, useState } from "react";
import { fetchWithAuth } from "../../helpers/fetchWithAuth";
import { Eye, Edit } from "lucide-react";

interface Venta {
  id: number;
  clienteNombre: string;
  clienteTelefono: string;
  clienteCorreo: string;
  MetodoPago: { id: number; nombre: string } | null;
  fecha: string;
  total: number;
  metodoPagoId: number;
  estado: "Rechazada" | "En Proceso" | "Entregada";
  comprobantePago: string;
}

export const VentasPage = () => {
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedComprobante, setSelectedComprobante] = useState<string | null>(null);

  // Cargar ventas desde el backend
  const fetchVentas = async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth("http://localhost:3000/api/ventas");
      const data = await res.json();
      setVentas(data);
    } catch (error) {
      console.error("Error al obtener ventas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVentas();
  }, []);

  const actualizarEstadoVenta = async (ventaId: number, nuevoEstado: "En_Proceso" | "Rechazada" | "Entregada") => {
  try {
    await fetchWithAuth(`http://localhost:3000/api/ventas/estado/${ventaId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado: nuevoEstado }),
    });
    fetchVentas(); // refrescar lista
  } catch (error) {
    console.error("Error actualizando estado:", error);
  }
};
  console.log("ventas", ventas);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">📦 Lista de Ventas</h2>

      {loading ? (
        <div className="text-center py-10">Cargando ventas...</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="py-3 px-4">Cliente</th>
                <th className="py-3 px-4">Teléfono</th>
                <th className="py-3 px-4">Correo</th>
                <th className="py-3 px-4">Fecha</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Método de Pago</th>
                <th className="py-3 px-4">Estado</th>
                <th className="py-3 px-4">Cambiar Estado</th>

                <th className="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ventas.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-6 text-gray-500">
                    No hay ventas registradas.
                  </td>
                </tr>
              ) : (
                ventas.map((venta) => (
                  <tr key={venta.id} className="border-t hover:bg-gray-50 transition">
                    <td className="py-3 px-4">{venta.clienteNombre}</td>
                    <td className="py-3 px-4">{venta.clienteTelefono}</td>
                    <td className="py-3 px-4">{venta.clienteCorreo}</td>
                    <td className="py-3 px-4">
                      {new Date(venta.fecha).toLocaleDateString("es-GT")}
                    </td>
                    <td className="py-3 px-4 font-semibold">Q {venta.total.toFixed(2)}</td>
                    <td className="py-3 px-4">{venta.MetodoPago?.nombre || "N/A"}</td>
                    <td
                      className={`py-3 px-4 font-medium ${
                        venta.estado === "Entregada"
                          ? "text-green-600"
                          : venta.estado === "Rechazada"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {venta.estado}
                    </td>
                    <td className="px-4 py-2">
        <select
          value={venta.estado}
          onChange={(e) =>
            actualizarEstadoVenta(venta.id, e.target.value as "En_Proceso" | "Rechazada" | "Entregada")
          }
          className="border px-2 py-1 rounded"
        >
          <option value="En_Proceso">En Proceso</option>
          <option value="Rechazada">Rechazada</option>
          <option value="Entregada">Entregada</option>
        </select>
      </td>
                    <td className="py-3 px-4 flex justify-center gap-3">
                      {/* Ver comprobante */}
                      <button
                        onClick={() =>
                          setSelectedComprobante(
                            `http://localhost:3000/${venta.comprobantePago}`
                          )
                        }
                        className="text-blue-600 hover:text-blue-800 transition"
                        title="Ver comprobante"
                      >
                        <Eye className="w-5 h-5" />
                      </button>

                      {/* Editar venta */}
                      <button
                        className="text-gray-600 hover:text-gray-900 transition"
                        title="Editar venta"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      {
                        venta.estado == "Entregada"  && (
                             <button
                        onClick={() =>
                            window.open(`http://localhost:3000/api/ventas/${venta.id}/factura`, "_blank")
                        }
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                        >
                        Ver Factura
                        </button>
                        )
                      }
                      
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal para ver comprobante */}
      {selectedComprobante && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-4 relative max-w-lg w-full">
            <button
              onClick={() => setSelectedComprobante(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
            <h3 className="text-lg font-semibold mb-3">Comprobante de Pago</h3>
            <img
              src={selectedComprobante}
              alt="Comprobante"
              className="w-full rounded-lg border"
            />
          </div>
        </div>
      )}
    </div>
  );
};