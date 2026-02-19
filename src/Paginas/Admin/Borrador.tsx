// LicenciasPage.tsx
import React, { useEffect, useState } from "react";
import { fetchWithAuth } from "../../helpers/fetchWithAuth";
import TablaProductos from "../../Components/Licencia/TablaLicencia";
import { AddLicencia } from "../../Components/Licencia/AddLicencia";
import { ProductoDb } from "../../Interfaces/Product";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export interface LicenciaProducto {
  id: number;
  productoId: number;
  clave: string;
  estado: string;
  createdAt: string;
  updatedAt: string;
  Producto: { nombreProducto: string };
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

  // === Fetchers ===
  const fetchProductos = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/producto");
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Error fetching productos");
      setProductos(data);
    } catch (error) {
      console.error(error);
      toast.error("No se pudieron cargar los productos");
    }
  };

  const fetchLicencias = async () => {
    try {
      const res = await fetchWithAuth("http://localhost:3000/api/licencia");
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Error fetching licencias");
      setLicencias(data);
    } catch (error) {
      console.error(error);
      toast.error("No se pudieron cargar las licencias");
    }
  };

  useEffect(() => {
    fetchProductos();
    fetchLicencias();
  }, []);

  // === Crear/Actualizar ===
  const handleSubmit = async (productoId: number, clave: string, estado: string) => {
    if (!productoId || !clave.trim()) {
      toast.error("productoId y clave son requeridos");
      return;
    }

    if (initialData.id > 0) {
      // EDITAR
      await toast.promise(
        (async () => {
          const res = await fetchWithAuth(
            `http://localhost:3000/api/licencia/${initialData.id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ productoId, clave: clave.trim(), estado }),
            }
          );
          const data = await res.json();
          if (!res.ok) throw new Error(data?.error || "Error actualizando licencia");
          await fetchLicencias();
          setInitialData(emptyInitial);
        })(),
        {
          loading: "Actualizando licencia...",
          success: "Licencia actualizada ✅",
          error: (e) => e?.message || "Error actualizando licencia",
        }
      );
      return;
    }

    // CREAR
    await toast.promise(
      (async () => {
        const res = await fetchWithAuth("http://localhost:3000/api/licencia", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productoId, clave: clave.trim(), estado }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Error creando licencia");
        await fetchLicencias();
        setInitialData(emptyInitial);
      })(),
      {
        loading: "Creando licencia...",
        success: "Licencia creada 🎉",
        error: (e) => e?.message || "Error creando licencia",
      }
    );
  };

  // === Editar (carga en el form) ===
  const handleEditar = (item: LicenciaProducto) => {
    setInitialData({
      id: item.id,
      productoId: item.productoId,
      clave: item.clave,
      estado: item.estado,
    });
    toast("Editando licencia…", { icon: "✏️" });
  };

  // === Eliminar con confirmación SweetAlert2 ===
  const handleEliminar = async (id: number) => {
    const { isConfirmed } = await Swal.fire({
      title: "¿Eliminar licencia?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
    });

    if (!isConfirmed) return;

    await toast.promise(
      (async () => {
        const res = await fetchWithAuth(`http://localhost:3000/api/licencia/${id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Error eliminando licencia");
        await fetchLicencias();
        if (initialData.id === id) setInitialData(emptyInitial);
      })(),
      {
        loading: "Eliminando...",
        success: "Licencia eliminada 🗑️",
        error: (e) => e?.message || "Error eliminando licencia",
      }
    );
  };

  return (
    <div className="flex h-screen p-6 gap-6 bg-gray-100">
      <AddLicencia
        key={initialData.id || "create"}
        productos={productos}
        onSubmit={handleSubmit}
        initialData={initialData}
        onCancel={() => setInitialData(emptyInitial)}
      />

      <div className="flex-1 bg-white p-6 rounded shadow overflow-auto">
        <TablaProductos
          data={licencias}
          onAsignar={() => {}}
          onEditar={handleEditar}
          onEliminar={handleEliminar}
        />
      </div>
    </div>
  );
};

export default LicenciasPage;