import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { auth, signInWithEmailAndPassword } from '../../firebase';
import logo from '../../InovaShop.png';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const buscar = async (e) => {
    e.preventDefault();

    if (!correo.trim() || !password.trim()) {
      swal('Error', 'Todos los campos son obligatorios.', 'error');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, correo, password);
      swal('Ingreso exitoso', 'Bienvenido a InovaShop!', 'success');
    } catch (error) {
      swal('Error', 'Correo o contraseña incorrectos.', 'error');
    }
  };

  return (
    <div className="container mt-3">
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <div className="container-fluid">
          <Link to="/">
            <img src={logo} alt="logo" style={{ width: '40px' }} className="rounded-pill" />
          </Link>
          <h5 style={{ color: 'white' }}>InovaShop</h5>
        </div>
      </nav>
      <br />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card border-dark mb-3">
            <div className="card-body text-dark">
              <h5 className="text-dark text-center">Iniciar Sesión</h5>
              <form onSubmit={buscar}>
                <div className="form-group">
                  <label>Correo electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Ingresar correo"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Ingresar contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="d-flex justify-content-start mt-4">
                  <button type="submit" className="btn" style={{backgroundColor: '#DAF7A6', color: '#343a40', fontWeight: 'bold', border: '2px solid #DAF7A6', borderRadius: '5px' , marginRight: '5px'}}>
                    Ingresar
                  </button>
                  <Link to="/registro" className="btn" style={{backgroundColor: '#343a40',color: '#fff', fontWeight: 'bold', border: '2px solid #DAF7A6', borderRadius: '5px'}}>
                    Registrarse
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
