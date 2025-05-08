import AddCategoria from '../../Components/Categoria/AddCategoria';
import ListCategoria from '../../Components/Categoria/ListCategoria';

export const CategoriaPage = () => {
  return (
    <div className="container mx-auto py-2 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Gestión de Categorías</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Componente para agregar una categoría */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
          <AddCategoria />
        </div>

        {/* Componente para listar categorías */}
        <div className="bg-gray-200 p-4 rounded-lg shadow-lg">
          <ListCategoria />
        </div>
      </div>
    </div>
  );
};
