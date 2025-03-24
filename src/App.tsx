

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import { Home } from './Paginas/Home';


const Softwares = () => <div>Softwares Page</div>;
const DisenoGrafico = () => <div>Diseño Gráfico Page</div>;
const SobreNosotros = () => <div>Sobre Nosotros Page</div>;

function App() {

  return (
    <BrowserRouter >
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/softwares" element={<Softwares />} />
      <Route path="/diseno-grafico" element={<DisenoGrafico />} />
      <Route path="/sobre-nosotros" element={<SobreNosotros />} />
    </Routes>
  </BrowserRouter >
  )
}

export default App
