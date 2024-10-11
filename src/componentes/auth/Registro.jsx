import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { auth, firestore } from '../../firebase';
import logo from '../../InovaShop.png';

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const resetFields = () => {
    setNombre('');
    setCorreo('');
    setPassword('');
    setConfirmPassword('');
  };

  const guardar = async (e) => {
    e.preventDefault();

    if (!nombre.trim() || !correo.trim() || !password.trim() || !confirmPassword.trim()) {
      swal('Error', 'Todos los campos son obligatorios.', 'error');
      return;
    }

    if (password !== confirmPassword) {
      swal('Error', 'Las contraseñas no coinciden.', 'error');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, correo, password);
      const user = userCredential.user;

      await setDoc(doc(firestore, 'usuarios', user.uid), {
        uid: user.uid,
        nombre,
        rol: 'cliente',
      });

      swal('Registro exitoso', 'Usuario registrado correctamente.', 'success');
      resetFields();
      navigate('/login');
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      swal('Error', 'No se pudo registrar el usuario.', 'error');
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
              <h5 className="text-dark text-center">Registro de Usuario</h5>
              <form onSubmit={guardar}>
                <div className="form-group">
                  <label>Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Correo electrónico</label>
                  <input
                    type="email"
                    className="form-control"
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Confirmar contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="d-flex justify-content-start mt-4">
                  <button type="submit" className="btn" style={{backgroundColor: '#343a40',color: '#fff', fontWeight: 'bold', border: '2px solid #DAF7A6', borderRadius: '5px', marginRight: '5px'}}>
                    Registrarse
                  </button>
                  <Link to="/login" className="btn" style={{backgroundColor: '#DAF7A6', color: '#343a40', fontWeight: 'bold', border: '2px solid #DAF7A6', borderRadius: '5px'}}>
                    Ingresar
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

export default Registro;
