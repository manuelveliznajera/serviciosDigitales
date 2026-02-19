import React, { useEffect,  useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { fetchWithAuth } from "../../helpers/fetchWithAuth";

// ===== Tipos mínimos (ajusta a tu proyecto) =====
export interface LicenciaDetalle {
  id: number;
  productoId: number;
  clave: string;            // serial
  estado: string;
  createdAt: string;
  updatedAt: string;
  Producto?: { nombreProducto: string };
}

export interface Venta {
  id: number;
  clienteNombre?: string;
  // agrega los campos que uses en UI (fecha, total, etc.)
}

// ===== Props del modal =====
interface ModalAsignarLicenciaProps {
  open: boolean;
  licenciaId: number | null;
  onClose: () => void;
  // si prefieres que el padre haga la asignación, puedes pasar un callback:
  onAssigned?: (ventaId: number, licenciaId: number) => Promise<void> | void;
}

export const ModalAsignarLicencia: React.FC<ModalAsignarLicenciaProps> = ({
  open,
  licenciaId,
  onClose,
 
}) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [licencia, setLicencia] = useState<LicenciaDetalle | null>(null);

  const [search, setSearch] = useState("");
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [ventasLoading, setVentasLoading] = useState(false);
  const [selectedVentaId, setSelectedVentaId] = useState<number | "">("");

  // Cargar licencia al abrir
  useEffect(() => {
    const loadLicencia = async () => {
      if (!open || !licenciaId) return;
      setLoading(true);
      try {
        // 🔧 Ajusta el endpoint de tu API:
        const res = await fetchWithAuth(`http://localhost:3000/api/licencia/${licenciaId}`);
        const data = await res.json();
        console.log(data,"data de licencia")
        if (!res.ok) throw new Error(data?.error || "No se pudo cargar la licencia");
        setLicencia(data);
      } catch (e: any) {
        console.error(e);
        toast.error(e?.message || "Error cargando licencia");
        onClose();
      } finally {
        setLoading(false);
      }
    };
    loadLicencia();
  }, [open, licenciaId, onClose]);

  // Buscar ventas con debounce
  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    const t = setTimeout(async () => {
      try {
        setVentasLoading(true);
        // 🔧 Ajusta tu endpoint de búsqueda de ventas:
        // e.g. GET /api/venta?search=<texto> (puede aceptar nombre o id)
        const url = new URL("http://localhost:3000/api/ventas");
        if (search.trim()) url.searchParams.set("search", search.trim());
        const res = await fetchWithAuth(url.toString(), { signal: controller.signal as any });
        const data = await res.json();
        console.log(data,"data de linea 83 modalasignalicencias")
        if (!res.ok) throw new Error(data?.error || "No se pudo buscar ventas");
        setVentas(Array.isArray(data) ? data : []);
      } catch (e: any) {
        if (e?.name !== "AbortError") {
          console.error(e);
          toast.error(e?.message || "Error buscando ventas");
        }
      } finally {
        setVentasLoading(false);
      }
    }, 350); // debounce 350ms

    return () => {
      controller.abort();
      clearTimeout(t);
    };
  }, [search, open]);

  const handleAssign = async () => {
    if (!licencia || !licenciaId || !selectedVentaId) {
      toast.error("Selecciona una venta.");
      return;
    }

    const confirm = await Swal.fire({
      title: "Asignar licencia a esta venta",
      html: `
        <div style="text-align:left">
          <div><b>Licencia:</b> #${licencia.id} — ${licencia.Producto?.nombreProducto || "Producto"}</div>
          <div><b>Serial:</b> ${licencia.clave}</div>
          <div><b>Venta ID:</b> ${selectedVentaId}</div>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Asignar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    setSaving(true);
    try {
      alert("llegue a handleasign")
        const res = await fetchWithAuth(
          `http://localhost:3000/api/licencia/asignar/detalle/${selectedVentaId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              licenciaId: licenciaId,
              serial: licencia.clave, // el "Serial" de la licencia
            }),
          }
        );
        

        const data = await res.json();
        alert(data)
        console.log(data,"data de linea 142, modalasignagrlicenia")
        if (!res.ok) throw new Error(data?.error || "No se pudo asignar la licencia");
      

      toast.success("Licencia asignada correctamente");
      onClose();
    } catch (e: any) {
     
    toast.error(e?.message || "Error al asignar la licencia");
    } finally {
      setSaving(false);
    }
  };

  // Cerrar con ESC
  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose(); // close on overlay
      }}
    >
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h3 className="text-lg font-semibold">Asignar licencia a venta</h3>
          <button
            onClick={onClose}
            className="rounded p-1 hover:bg-gray-100"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5">
          {/* Licencia */}
          <div className="rounded-lg border p-4 bg-gray-50">
            {loading ? (
              <div className="text-sm text-gray-600">Cargando licencia…</div>
            ) : licencia ? (
              <div className="text-sm">
                <div className="font-medium">
                  #{licencia.id} — {licencia.Producto?.nombreProducto || "Producto"}
                </div>
                <div className="mt-1">
                  <span className="text-gray-600">Serial:</span>{" "}
                  <span className="font-mono">{licencia.clave}</span>
                </div>
                <div className="mt-1">
                  <span className="text-gray-600">Estado:</span> {licencia.estado}
                </div>
              </div>
            ) : (
              <div className="text-sm text-red-600">No se pudo cargar la licencia.</div>
            )}
          </div>

          {/* Buscador de ventas */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Buscar venta (por nombre o ID)</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Ej. 123 o Juan Pérez"
              className="w-full border rounded px-3 py-2"
            />
            <div>
              <select
                className="w-full border rounded px-3 py-2"
                value={selectedVentaId}
                onChange={(e) => setSelectedVentaId(e.target.value ? Number(e.target.value) : "")}
              >
                <option value="">Selecciona una venta</option>
                {ventas.map((v) => (
                  <option key={v.id} value={v.id}>
                    #{v.id} {v.clienteNombre ? `— ${v.clienteNombre}` : ""}
                  </option>
                ))}
              </select>
              {ventasLoading && (
                <div className="mt-1 text-xs text-gray-500">Buscando ventas…</div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-5 py-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border hover:bg-gray-50 disabled:opacity-50"
            disabled={saving}
          >
            Cancelar
          </button>
          <button
            onClick={handleAssign}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            disabled={saving || !selectedVentaId || !licencia}
          >
            {saving ? "Asignando…" : "Asignar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAsignarLicencia;