import { useState } from "react";
import { fetchWithAuth } from "../../helpers/fetchWithAuth"; // importa tu helper

interface AddCuponProps {
  onNuevoCupon: () => void;
}

const AddCupon = ({ onNuevoCupon }: AddCuponProps) => {
  const [codigo, setCodigo] = useState("");
  const [tipo, setTipo] = useState("fijo");
  const [valor, setValor] = useState("");
  const [maxUsos, setMaxUsos] = useState("");
  const [fechaExpira, setFechaExpira] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetchWithAuth("http://localhost:3000/api/cupones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          codigo,
          tipo,
          valor: parseFloat(valor),
          maxUsos: parseInt(maxUsos),
          usos: 0,
          fechaExpira,
        }),
      });

      // limpiar formulario
      setCodigo("");
      setTipo("fijo");
      setValor("");
      setMaxUsos("");
      setFechaExpira("");

      // avisar al padre
      onNuevoCupon();
    } catch (error) {
      console.error("Error al agregar cupón:", error);
      alert("Error al agregar cupón: " + (error as Error).message);
    }
  };

  return (
    <div className="flex justify-center items-start bg-[#d1d1d1] p-4 rounded-xl">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className=" text-2xl font-bold mb-6 text-center">
          Crear Cupón
        </h2>

        <label className="block  mb-2">Código</label>
        <input
          type="text"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          className="w-full p-2 mb-4 rounded-md border border-[#0098db] focus:outline-none focus:ring-2 focus:ring-[#0098db]"
          required
        />

        <label className="block  mb-2">Tipo</label>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="w-full p-2 mb-4 rounded-md border border-[#0098db] focus:outline-none focus:ring-2 focus:ring-[#0098db]"
        >
          <option value="fijo">Fijo</option>
          <option value="porcentaje">Porcentaje</option>
        </select>

        <label className="block  mb-2">Valor</label>
        <input
          type="number"
          step="0.01"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          className="w-full p-2 mb-4 rounded-md border border-[#0098db] focus:outline-none focus:ring-2 focus:ring-[#0098db]"
          required
        />

        <label className="block  mb-2">Máximo de Usos</label>
        <input
          type="number"
          value={maxUsos}
          onChange={(e) => setMaxUsos(e.target.value)}
          className="w-full p-2 mb-4 rounded-md border border-[#0098db] focus:outline-none focus:ring-2 focus:ring-[#0098db]"
          required
        />

        <label className="block  mb-2">Fecha de Expiración</label>
        <input
          type="datetime-local"
          value={fechaExpira}
          onChange={(e) => setFechaExpira(e.target.value)}
          className="w-full p-2 mb-6 rounded-md border border-[#0098db] focus:outline-none focus:ring-2 focus:ring-[#0098db]"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#0098db] hover:bg-[#007bbd] text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Agregar Cupón
        </button>
      </form>
    </div>
  );
};

export default AddCupon;