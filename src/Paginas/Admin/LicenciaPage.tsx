// LicenciasPage.tsx
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { fetchWithAuth } from "../../helpers/fetchWithAuth";
import TablaProductos from "../../Components/Licencia/TablaLicencia";
import { AddLicencia } from "../../Components/Licencia/AddLicencia";
import { ProductoDb } from "../../Interfaces/Product";
import ModalAsignarLicencia from "../../Components/Licencia/ModalAsignarLicencia";

export interface LicenciaProducto {
  id: number;
  productoId: number;
  clave: string;
  estado: string;
  createdAt: string;
  updatedAt: string;
  Producto: {
    nombreProducto: string;
  };
}

export interface InitialDataType {
  id: number;
  productoId: number;
  clave: string;
  estado: string;
}

const emptyInitial: InitialDataType = {
  id: 0,
  productoId: 0,
  clave: "",
  estado: "Disponible",
};

const LicenciasPage: React.FC = () => {
  const [productos, setProductos] = useState<ProductoDb[]>([]);
  const [licencias, setLicencias] = useState<LicenciaProducto[]>([]);
  const [initialData, setInitialData] = useState<InitialDataType>(emptyInitial);
  const [assignOpen, setAssignOpen] = useState(false);
  const [assignLicenciaId, setAssignLicenciaId] = useState<number | null>(null);

  // Fetch productos
  const fetchProductos = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/producto");
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Error fetching productos");
      setProductos(data);
    } catch (error) {
      console.error("Error fetching productos:", error);
    }
  };

  // Fetch licencias
  const fetchLicencias = async () => {
    try {
      const res = await fetchWithAuth("http://localhost:3000/api/licencia");
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Error fetching licencias");
      setLicencias(data);
    } catch (error) {
      console.error("Error fetching licencias:", error);
    }
  };

  useEffect(() => {
    fetchProductos();
    fetchLicencias();
  }, []);

  // Crear o actualizar licencia (según initialData.id)
  const handleSubmit = async (productoId: number, clave: string, estado: string) => {
    if (!productoId || !clave) {
      alert("productoId y clave son requeridos");
      return;
    }

    try {
      if (initialData.id > 0) {
        // EDITAR
        const res = await fetchWithAuth(
          `http://localhost:3000/api/licencia/${initialData.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productoId, clave, estado }),
          }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Error actualizando licencia");
        // Refrescar lista y limpiar estado de edición
        await fetchLicencias();
        setInitialData(emptyInitial);
        return;
      }

      // CREAR
      const res = await fetchWithAuth("http://localhost:3000/api/licencia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productoId, clave, estado }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Error creando licencia");

      await fetchLicencias();
      toast.success("Licencia creada con éxito");
      setInitialData(emptyInitial);
    } catch (error: any) {
      console.error(error);
      alert(error?.message || "Error guardando licencia");
    }
  };

  const handleEditar = (item: LicenciaProducto) => {
    setInitialData({
      id: item.id,
      productoId: item.productoId,
      clave: item.clave,
      estado: item.estado,
    });
  };

  const handleEliminar = async (id: number) => {
    if (!confirm("¿Eliminar esta licencia?")) return;
    try {
      const res = await fetchWithAuth(`http://localhost:3000/api/licencia/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Error eliminando licencia");
      await fetchLicencias();
      if (initialData.id === id) setInitialData(emptyInitial);
    } catch (error: any) {
      console.error(error);
      alert(error?.message || "Error eliminando licencia");
    }
  };

  const handleAbrirAsignar = (item: LicenciaProducto) => {
    setAssignLicenciaId(item.id);
    setAssignOpen(true);
  };

  return (
    <div className="flex h-screen p-6 gap-6 bg-gray-100">
      {/* Formulario crear/editar */}
      <AddLicencia
        key={initialData.id || "create"} // fuerza re-render al entrar en modo edición
        productos={productos}
        onSubmit={handleSubmit}
        initialData={initialData}
        onCancel={() => setInitialData(emptyInitial)}
      />

      {/* Tabla */}
      <div className="flex-1 bg-white p-6 rounded shadow overflow-auto">
        <TablaProductos
          data={licencias}
          onEditar={handleEditar}
          onEliminar={handleEliminar}
          onAsignar={handleAbrirAsignar}
        />
      </div>
      <ModalAsignarLicencia
            open={assignOpen}
            licenciaId={assignLicenciaId}
            onClose={() => setAssignOpen(false)}
            // Si quieres delegar la asignación al padre (opcional):
            // onAssigned={async (ventaId, licenciaId) => {
            //   await fetchWithAuth(`http://localhost:3000/api/venta/${ventaId}/detalle`, {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({ licenciaId }),
            //   });
            //   await fetchLicencias(); // refrescar si cambia estado de licencia
            // }}
          />
    </div>
  );
};

export default LicenciasPage;