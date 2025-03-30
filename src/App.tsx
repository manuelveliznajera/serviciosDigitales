import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { Home } from './Paginas/Home';
import { Softwares } from './Paginas/Softwares';
import { SobreNosotros } from './Paginas/SobreNosotros';
import { ProductoDetalle } from './Paginas/ProductoDetalle';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import { LoginPage } from './Paginas/auth/LoginPage';
import { RegisterPage } from './Paginas/auth/RegisterPage';
import { useAuthStore } from './store/authStore';
import Sidebar from './Components/Sidebar/Sidebar';
import { DashboardPage } from './Paginas/Admin/dashboard';

const DisenoGrafico = () => <div>Diseño Gráfico Page</div>;

function App() {
  const { isLoggedIn, role } = useAuthStore(); // Obtener el estado de autenticación desde el store
  console.log("aqui inicia app ", isLoggedIn, role);

  return (
    <BrowserRouter>
      {/* Grid layout */}
      <div className="grid grid-rows-[auto_1fr] grid-cols-[auto_1fr] h-screen">
        {/* Navbar en la parte superior */}
        <div className="row-span-1 col-span-2">
          <Navbar role={isLoggedIn ? role : null} />
        </div>

        {/* Sidebar en el lado izquierdo (solo para Administrador) */}
        {role === 'Administrador' && (
          <div className="row-span-1 col-span-1 bg-[#012FD3] text-white">
            <Sidebar />
          </div>
        )}

        {/* Contenido principal */}
        <div className={`row-span-1 ${role === 'Administrador' ? 'col-span-1' : 'col-span-2'} p-4`}>
          <Routes>
            <Route path="/" element={ isLoggedIn  ?  <DashboardPage /> : <Home />} />

            {/* Redirigir si el usuario ya está logueado */}
            <Route
              path="/auth/login"
              element={
                isLoggedIn ? <Navigate to="/" replace /> : <LoginPage />
              }
            />
            <Route
              path="/auth/registrar"
              element={
                isLoggedIn ? <Navigate to="/" replace /> : <RegisterPage />
              }
            />

            <Route path="/softwares" element={<Softwares role={role} />} />
            <Route path="/diseno-grafico" element={<DisenoGrafico />} />
            <Route path="/sobre-nosotros" element={<SobreNosotros />} />
            <Route path="/producto/:id" element={<ProductoDetalle />} />

            {/* Ruta protegida para el administrador */}
            <Route
              path="/admin"
              element={
                isLoggedIn ? (
                  <AdminDashboard />
                ) : (
                  <Navigate to="/auth/login" replace />
                )
              }
            />

            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
