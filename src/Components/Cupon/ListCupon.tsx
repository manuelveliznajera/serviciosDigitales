
 // Importa la interfaz
interface Cupon {
  id: number;
  codigo: string;
  tipo: string;
  valor: number;
  maxUsos: number;
  usos: number;
  fechaExpira: string;
}
interface ListCuponProps {
  cupones: Cupon[];
  onEliminar: (id: number) => void;
  onEditar: (cupon: Cupon) => void;
}

const ListCupon = ({ cupones, onEliminar, onEditar }: ListCuponProps) => {
  return (
    <div className="p-4 bg-[#d1d1d1] min-h-screen w-full">
      <h2 className="text-2xl font-bold mb-4 text-[#0101a7]">Cupones</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-[#0101a7] text-white">
            <tr>
              <th className="py-2 px-4 text-left">Código</th>
              <th className="py-2 px-4 text-left">Tipo</th>
              <th className="py-2 px-4 text-left">Valor</th>
              <th className="py-2 px-4 text-left">Máx Usos</th>
              <th className="py-2 px-4 text-left">Usos</th>
              <th className="py-2 px-4 text-left">Expira</th>
              <th className="py-2 px-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cupones.length > 0 ? (
              cupones.map((cupon) => (
                <tr
                  key={cupon.id}
                  className="border-b hover:bg-[#0098db]/10 transition-colors"
                >
                  <td className="py-2 px-4">{cupon.codigo}</td>
                  <td className="py-2 px-4">{cupon.tipo}</td>
                  <td className="py-2 px-4">{cupon.valor}</td>
                  <td className="py-2 px-4">{cupon.maxUsos}</td>
                  <td className="py-2 px-4">{cupon.usos}</td>
                  <td className="py-2 px-4">{cupon.fechaExpira}</td>
                  <td className="py-2 px-4 flex justify-center gap-2">
                    <button
                      onClick={() => onEditar(cupon)}
                      className="bg-[#0098db] hover:bg-[#007bbd] text-white px-3 py-1 rounded-md"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onEliminar(cupon.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-4 text-gray-500 font-medium"
                >
                  No hay cupones disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListCupon;