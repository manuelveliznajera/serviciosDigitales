
import { useEffect, useState } from "react";
import AddCupon from "../../Components/Cupon/AddCupon";
import ListCupon from "../../Components/Cupon/ListCupon";
import { fetchWithAuth } from "../../helpers/fetchWithAuth";
import EditCuponModal from "../../Components/Cupon/EditCuponModal";


export interface Cupon {
  id: number;
  codigo: string;
  tipo: string;
  valor: number;
  maxUsos: number;
  usos: number;
  fechaExpira: string;
}

export const CuponPage = () => {
  const [cupones, setCupones] = useState<Cupon[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedCupon, setSelectedCupon] = useState<Cupon>({
    id: 0,
    codigo: "",
    tipo: "",
    valor: 0,
    maxUsos: 0,
    usos: 0,
    fechaExpira: "",
  });

  // Función para traer todos los cupones
  const fetchCupones = async () => {
    try {
      const res = await fetchWithAuth('http://localhost:3000/api/cupones');
      const data = await res.json();
      setCupones(data);
    } catch (error) {
      console.error("Error al obtener cupones:", error);
    }
  };

  useEffect(() => {
    fetchCupones();
  }, []);

  // Handler que pasamos a AddCupon para actualizar la lista
  const handleNuevoCupon = () => {
    fetchCupones();
  };

  const handleClose = () => {
    setOpen(false);
    fetchCupones();
  }

  // Handler para eliminar un cupón
  const handleEliminarCupon = async (id: number) => {
    try {
      await fetchWithAuth(`http://localhost:3000/api/cupones/${id}`, {
        method: "DELETE",
      });
      fetchCupones(); // actualizar lista
    } catch (error) {
      console.error("Error eliminando cupón:", error);
    }
  };

  // Handler para editar un cupón
  const handleEditarCupon = async (cupon: Cupon) => {

    console.log("Editando cupón:", cupon);
    setSelectedCupon(cupon);
    setOpen(true);
    
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <AddCupon onNuevoCupon={handleNuevoCupon} />
      <ListCupon
        cupones={cupones}
        onEliminar={handleEliminarCupon}
        onEditar={handleEditarCupon}
      />
      <EditCuponModal onOpen ={open} onClose={handleClose} cuponEdit={selectedCupon} />
    </div>
  );
};