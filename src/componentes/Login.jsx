import React from 'react';
import { firestore, collection, getDocs } from '../firebase';
import logo from '../InovaShop.png';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate


const Login = () => {
  
    const navigate = useNavigate(); // Define el navigate
    const [lista, setLista] = React.useState([]);
    const [cc, setCc] = React.useState('');
    const [pass, setPass] = React.useState('');
    const [val, setVal] = React.useState(true);
  

  React.useEffect(() => {
    const leer = async () => {
      try {
        const data = await getDocs(collection(firestore, 'usuarios'));
        const arrayData = data.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));
        setLista(arrayData);
      } catch (error) {
        console.log(error);
      }
    };
    leer();
  }, []);

  const buscar = async () => {
    if (!cc.trim() || !pass.trim()) {
      swal({
        title: 'Error',
        text: 'No puede dejar ningún campo vacío.',
        icon: 'error',
        button: 'Aceptar',
      });
      return;
    }
  
    try {
      const user = lista.find((dato) => dato.id === cc);
      if (user && user.clave === pass) {
        // Redirige a MenuPrincipal
        navigate('/menu-principal'); // Redirige aquí
        swal({
          title: 'Éxito',
          text: 'Bienvenido!',
          icon: 'success',
          button: 'Aceptar',
        });
      } else {
        swal({
          title: 'Error',
          text: 'Por favor, verifique los datos ingresados.',
          icon: 'error',
          button: 'Aceptar',
        });
      }
    } catch (error) {
      console.log('error');
    }
  };
  

  return (
    <div>
      {val ? (
        <div>
          <div className="container mt-3">
            <nav className="navbar navbar-expand-sm" style={{ backgroundColor: '#343a40' }}>
              <div className="container-fluid">
                <img src={logo} alt="logo" style={{ width: '40px' }} className="rounded-pill" />
                <h5 style={{ color: "white" }}>InovaShop</h5>
                <Link to="/" className="btn" style={{ backgroundColor: '#DAF7A6', color: 'black' }}>
                  <i className="fas fa-hand-point-left"></i>
                </Link>
              </div>
            </nav>
            <br />
            <div className="container" align="center">
              <div className="card border-dark mb-3" style={{ maxWidth: '30rem' }}>
                <div className="row">
                  <div className="card-body text-dark">
                    <div className="card-text">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <img 
                          src="https://png.pngtree.com/png-clipart/20191120/original/pngtree-user-login-or-authenticate-icon-on-gray-background-flat-icon-ve-png-image_5056093.jpg" 
                          alt="" 
                          className="rounded-pill" 
                          style={{ width: '8rem' }} 
                        />
                        <br /><br />
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="Ingresar Usuario" 
                          value={cc} 
                          onChange={(e) => setCc(e.target.value)} 
                        />
                        <br />
                        <input 
                          type="password" 
                          placeholder="Contraseña" 
                          className="form-control" 
                          value={pass} 
                          onChange={(e) => setPass(e.target.value)} 
                        />
                        <br />
                        <input 
                          type="button" 
                          className="btn" 
                          style={{ backgroundColor: '#343a40', color: 'white' }} 
                          value="Ingresar" 
                          onClick={buscar} 
                        />
                        <br /><br />
                      </div>
                      <br />
                      <div className="container">
                        <div className="row">
                          <div className="col-lg-6 ms-auto">
                            <button type="button" className="btn btn-danger btn-floating">
                              <i className="fas fa-exclamation-circle"></i>
                            </button>
                            <p><small><strong>Olvidé mi contraseña</strong></small></p>
                          </div>
                          <div className="col-lg-6 ms-auto">
                            <Link to="/registro" className="btn btn-outline-success btn-floating" style={{ backgroundColor: '#DAF7A6' }}>
                              <i className="fas fa-user-plus"></i>
                            </Link>
                            <p><small><strong>Registrarme</strong></small></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
  
        <div>
          {/* Redirige a otra parte de la aplicación */}
        </div>
      )}
    </div>
  );
};

export default Login;
