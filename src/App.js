import './App.css';
import { Routes, Route } from 'react-router-dom';
import Principal from './componentes/Principal';
import Login from './componentes/Login';
import Registro from './componentes/Registro';
import MenuPrincipal from './componentes/MenuPrincipal';
import Descuentos from './componentes/Descuentos';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/menu-principal" element={<MenuPrincipal />} />
        <Route path="/descuentos" element={<Descuentos />} />
      </Routes>
    </div>
  );
}

export default App;
