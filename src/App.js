import { Route, Routes } from 'react-router-dom';
import './App.css';
import AdminDashboard from './componentes/admin/AdminDashboard';
import Login from './componentes/auth/Login';
import RoleBasedRoute from './componentes/auth/PrivateRoute';
import Registro from './componentes/auth/Registro';
import Principal from './componentes/Principal';
import ClienteDashboard from './componentes/user/ClienteDashboard';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/admin/*" element={
            <RoleBasedRoute
              element={<AdminDashboard />}
              requiredRole="admin"
              fallbackRoute="/cliente"
            />
          }
        />
        <Route path="/cliente/*" element={<ClienteDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
