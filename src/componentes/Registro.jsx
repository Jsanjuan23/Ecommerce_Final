import React from 'react';
import logo from '../InovaShop.png';
import agg_usuario from '../agregar-usuario.png';
import { firestore, collection, getDocs, addDoc, query, where, updateDoc, deleteDoc } from '../firebase';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import Login from './Login';

const Registro = () => {
  const navigate = useNavigate();
  const [lista, setLista] = React.useState([]);
  const [cc, setCc] = React.useState('');
  const [nombre, setNombre] = React.useState('');
  const [apellido, setApellido] = React.useState('');
  const [fechan, setFechan] = React.useState('');
  const [sexo, setSexo] = React.useState('');
  const [correo, setCorreo] = React.useState('');
  const [cel, setCel] = React.useState('');
  const [estado, setEstado] = React.useState(true);
  const [showSearchModal, setShowSearchModal] = React.useState(false);
  const [searchId, setSearchId] = React.useState('');
  const [editMode, setEditMode] = React.useState(false);
  const [adminPassword, setAdminPassword] = React.useState('');
  const [showAdminModal, setShowAdminModal] = React.useState(false);


  

  const resetFields = () => {
    setCc('');
    setNombre('');
    setApellido('');
    setFechan('');
    setSexo('');
    setCorreo('');
    setCel('');
    setSearchId('');
  };

  // Guardar nuevos usuarios
  const guardar = async (e) => {
    e.preventDefault();
    if (!cc.trim() || !nombre.trim() || !apellido.trim() || !fechan.trim() || !sexo.trim() || !correo.trim() || !cel.trim()) {
      swal({
        title: 'Error',
        text: 'No puede dejar ningún campo vacío.',
        icon: 'error',
        button: 'Aceptar',
      });
      return;
    }

    try {
      const pass = Math.floor(Math.random() * 9999) + 1000;
      const nuevo_r = {
        id: cc,
        nombre,
        apellido,
        fecha: fechan,
        sexo,
        correo,
        tel: cel,
        clave: pass.toString(),
      };

      await addDoc(collection(firestore, 'usuarios'), nuevo_r);
      setLista([...lista, nuevo_r]);

      swal({
        title: 'Correcto',
        text: `Su clave para ingresar al sistema es: ${pass}`,
        icon: 'success',
        button: 'Aceptar',
      });

      resetFields(); // Reiniciar campos
      navigate('/login');
    } catch (error) {
      console.error('Error al guardar los datos:', error);
    }
  };

  // Buscar usuario
  const handleSearchUser = async () => {
    if (!searchId) {
      swal("Error", "Por favor ingrese un ID", "error");
      return;
    }

    try {
      const q = query(collection(firestore, 'usuarios'), where('id', '==', searchId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        swal("Error", "Usuario no encontrado", "error");
        return; // Permite que el modal permanezca abierto
      }

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        setCc(data.id);
        setNombre(data.nombre);
        setApellido(data.apellido);
        setFechan(data.fecha);
        setSexo(data.sexo);
        setCorreo(data.correo);
        setCel(data.tel);
        setShowSearchModal(false);
        setEditMode(true); // Activa el modo de edición
      });
    } catch (error) {
      console.error("Error al buscar el usuario:", error);
    }
  };

  // Actualizar usuario
  const handleUpdate = async () => {
    if (!cc.trim() || !nombre.trim() || !apellido.trim() || !fechan.trim() || !sexo.trim() || !correo.trim() || !cel.trim()) {
      swal({
        title: 'Error',
        text: 'No puede dejar ningún campo vacío.',
        icon: 'error',
        button: 'Aceptar',
      });
      return;
    }

    try {
      const q = query(collection(firestore, 'usuarios'), where('id', '==', searchId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        swal("Error", "Usuario no encontrado", "error");
        return;
      }

      querySnapshot.forEach(async (doc) => {
        const userRef = doc.ref;
        await updateDoc(userRef, {
          id: cc,
          nombre:nombre,
          apellido:apellido,
          fecha: fechan,
          sexo:sexo,
          correo:correo,
          tel: cel,
        });
        swal("Éxito", "Usuario actualizado", "success");
        resetFields(); // Reinicia campos
     
        navigate('/login');
      });
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      swal("Error", "No se pudo actualizar el usuario", "error");
    }
  };

  // Eliminar usuario
  const handleDelete = async () => {
    const confirmation = await swal({
      title: "¿Está seguro?",
      text: "Una vez eliminado, no podrá recuperar este registro!",
      icon: "warning",
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true,
    });

    if (confirmation) {
      try {
        const q = query(collection(firestore, 'usuarios'), where('id', '==', searchId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          swal("Error", "Usuario no encontrado", "error");
          return;
        }

        querySnapshot.forEach(async (doc) => {
          const userRef = doc.ref;
          await deleteDoc(userRef);
          swal("Éxito", "Usuario eliminado", "success").then(() => {
            resetFields(); // Reinicia campos
            navigate('/login'); // Navega después de la alerta
          });
        });
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        swal("Error", "No se pudo eliminar el usuario", "error");
      }
    }
  };

  const handleAdminPasswordSubmit = () => {
    if (adminPassword === '0000') {
      setShowAdminModal(false);
      setShowSearchModal(true);
    } else {
      swal("Error", "Contraseña incorrecta", "error");
    }
  };

  const atras = () => {
    setEstado(false);
  };

  return (
    <div>
      {estado ? (
        <div className="container">
          <form onSubmit={guardar}>
            <div className="container mt-3">
              <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <div className="container-fluid">
                  <img src={logo} alt="logo" style={{ width: '40px' }} className="rounded-pill" />
                  <h5 style={{ color: "white" }}>InovaShop</h5>
                  <button type="button" className="btn btn-light" onClick={atras}>
                    <i className="fas fa-hand-point-left"></i>
                  </button>
                </div>
              </nav>
              <br />
              <div className="row justify-content-center">
                <div className="col-md-12">
                  <div className="card border-dark mb-3">
                    <div className="card-body text-dark">
                      <img src={agg_usuario} alt="" style={{ width: '10%' }} className="img-fluid" />
                      <h5 className="text-dark">Registro de Usuarios</h5>
                      <button type="button" className="btn btn-info" onClick={() => setShowAdminModal(true)} style={{ marginBottom: '10px' }}>
                        <i className="fas fa-users"></i>
                      </button>
                      <br />
                      <div className="form-row">
                        <div className="form-group col-md-3">
                          <label><em>Identificación</em></label>
                          <input type="text" className="form-control" value={cc} onChange={(e) => setCc(e.target.value)} required />
                        </div>
                        <div className="form-group col-md-4">
                          <label><em>Nombres</em></label>
                          <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                        </div>
                        <div className="form-group col-md-3">
                          <label><em>Apellidos</em></label>
                          <input type="text" className="form-control" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-3">
                          <label><em>Fecha de nacimiento</em></label>
                          <input type="date" className="form-control" value={fechan} onChange={(e) => setFechan(e.target.value)} required />
                        </div>
                        <div className="form-group col-md-3">
                          <label><em>Sexo</em></label>
                          <select className="form-control" value={sexo} onChange={(e) => setSexo(e.target.value)} required>
                            <option value="">Seleccione...</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                          </select>
                        </div>
                        <div className="form-group col-md-4">
                          <label><em>Correo electrónico</em></label>
                          <input type="email" className="form-control" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
                        </div>
                        <div className="form-group col-md-3">
                          <label><em>Celular</em></label>
                          <input type="text" className="form-control" value={cel} onChange={(e) => setCel(e.target.value)} required />
                        </div>
                      </div>
                      <div className="text-center">
                        {editMode ? (
                          <>
                            <button type="button" onClick={handleUpdate} className="btn btn-warning" style={{ marginRight: '10px' }}>
                              <i className="fas fa-edit"></i> Actualizar
                            </button>
                            <button type="button" onClick={handleDelete} className="btn btn-danger">
                              <i className="fas fa-trash"></i> Eliminar
                            </button>
                          </>
                        ) : (
                          <button type="submit" className="btn btn-success">
                            Guardar registro
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>

          {/* Modal de Contraseña de Administrador */}
          {showAdminModal && (
            <div className="modal show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Ingrese Contraseña de Administrador</h5>
                    <button type="button" className="close" onClick={() => setShowAdminModal(false)}>
                      <span>&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="form-group">
                      <label>Contraseña</label>
                      <input type="password" className="form-control" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={handleAdminPasswordSubmit}>Aceptar</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowAdminModal(false)}>Cerrar</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modal de Búsqueda de Usuario */}
          {showSearchModal && (
            <div className="modal show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Buscar Usuario</h5>
                    <button type="button" className="close" onClick={() => setShowSearchModal(false)}>
                      <span>&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="form-group">
                      <label>Ingrese ID del usuario</label>
                      <input type="text" className="form-control" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={handleSearchUser}>Buscar</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowSearchModal(false)}>Cerrar</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Registro;
