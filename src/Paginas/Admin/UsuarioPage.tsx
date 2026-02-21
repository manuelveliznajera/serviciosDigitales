
import AddUser from '../../Components/Admin/UsuariosPage/AddUser';
import ListUser from '../../Components/Admin/UsuariosPage/ListUser';

export const UsuarioPage = () => {
  return (
    <div className='w-full py-6 sm:py-10 px-2 sm:px-4'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-6'>Usuarios</h1>
        <div className='grid grid-cols-1 xl:grid-cols-3 gap-6'>
          <div className='xl:col-span-1'>
            <AddUser />
          </div>
          <div className='xl:col-span-2'>
            <ListUser />
          </div>
        </div>
      </div>
    </div>
  )
}
