

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import { Home } from './Paginas/Home';
import { Softwares } from './Paginas/Softwares';
import { SobreNosotros } from './Paginas/SobreNosotros';
import { ProductoDetalle } from './Paginas/ProductoDetalle';



const DisenoGrafico = () => <div>Diseño Gráfico Page</div>;

function App() {

  return (
    <BrowserRouter >
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/softwares" element={<Softwares />} />
      <Route path="/diseno-grafico" element={<DisenoGrafico />} />
      <Route path="/sobre-nosotros" element={<SobreNosotros />} />
      <Route path="/producto/:id" element={<ProductoDetalle />} />
    </Routes>
  </BrowserRouter >
  )
}

export default App
