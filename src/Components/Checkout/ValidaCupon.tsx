import React, { useState } from "react";

interface CuponResponse {
  id: string;
  codigo: string;
  tipo: string;
  valor: number;
}

interface CuponValidatorProps {
  onDescuento: (valor: number) => void;
  setCupon?: (codigo: string) => void;
}
const ValidaCupon: React.FC<CuponValidatorProps> = ( {onDescuento, setCupon}) => {
  const [codigo, setCodigo] = useState("");
  const [resultado, setResultado] = useState<CuponResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onValidarCupon = async () => {
    if (!codigo.trim()) {
      setError("Por favor ingresa un código de cupón.");
      return;
    }
    setError(null);
    setResultado(null);
    setLoading(true);

    try {
       
      const response = await fetch("http://localhost:3000/api/cupones/validar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ codigo }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error );
        setLoading(false);
        return;
      }

      const data: CuponResponse = await response.json();
      setCupon && setCupon(data.codigo);
      setResultado(data);
      onDescuento(data.valor);
      setCodigo("");
      setError(null);
    } catch (err: any) {
      setError(err.message || "Error al validar el cupón.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
  <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
    Validar Cupón
  </h2>

  <div className="flex flex-col gap-4">
    <input
      type="text"
      placeholder="Ingresa el código del cupón"
      value={codigo}
      onChange={(e) => setCodigo(e.target.value)}
      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      
    />

    <button
      type="button" // ❌ Cambiado de "submit" a "button"
      onClick={onValidarCupon} // función que hace la petición al backend
      disabled={loading}
      className={`w-full py-2 rounded-lg text-white font-semibold transition-colors ${
        loading
          ? "bg-blue-300 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {loading ? "Validando..." : "Validar Cupón"}
    </button>
  </div>

  {error && (
    <p className="text-red-600 mt-4 text-center font-medium">{error}</p>
  )}

  {resultado && (
    <div className="mt-6 p-5 rounded-xl bg-green-50 border border-green-200 text-green-800 text-center shadow-sm">
      <h3 className="text-lg font-semibold mb-2">🎉 ¡Cupón aplicado con éxito!</h3>
      <p className="text-base">
        Has aplicado el cupón{" "}
        <span className="font-bold">{resultado.codigo}</span> con un valor de{" "}
        <span className="font-bold">Q{resultado.valor}</span>.
      </p>
      <p className="mt-1 text-sm text-green-700">
        ¡Felicitaciones! Tu descuento se ha aplicado correctamente.
      </p>
    </div>
  )}
</div>
  );
};

export default ValidaCupon;