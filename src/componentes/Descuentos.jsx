import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert';
import { Link } from 'react-router-dom';

const Descuentos = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mostrar modal de éxito con SweetAlert
    Swal.fire({
      title: 'Descuento Aplicado!',
      text: 'Has diligenciado tu información correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      background: '#ffffff',
      color: '#343a40',
      confirmButtonColor: '#DAF7A6',
    }).then(() => {
      // Redirigir a la página de "Quiénes somos" con un parámetro en la URL
      navigate('/quienessomos?descuento=aplicado');
    });
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <nav className="navbar navbar-dark bg-dark" id="mainNav">
        <div className="container">
          <h4><strong style={{ color: "#DAF7A6" }}>InovaShop</strong></h4>
          <Link to="/login" className="navbar-toggler" style={{ backgroundColor: '#DAF7A6' }}>
            <i className='fas fa-sign-in-alt' style={{ fontSize: "24px", color: "#343a40" }} alt="Iniciar Sesión"></i>
          </Link>
        </div>
      </nav>
      <h2 style={{ color: '#343a40', marginTop: '20px' }}>¡Diligencia tu información para aplicar el 25% de descuento!</h2>
      <form onSubmit={handleSubmit} style={{ display: 'inline-block', marginTop: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ color: '#343a40' }}>
            Nombre:
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              style={{ marginLeft: '10px', padding: '8px', border: '1px solid #343a40', borderRadius: '5px', outline: 'none' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ color: '#343a40' }}>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ marginLeft: '10px', padding: '8px', border: '1px solid #343a40', borderRadius: '5px', outline: 'none' }}
            />
          </label>
        </div>
        <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#DAF7A6', color: '#343a40', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Aplicar
        </button>
      </form>
    </div>
  );
};

export default Descuentos;
