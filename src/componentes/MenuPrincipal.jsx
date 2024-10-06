import { useEffect, useState } from 'react';
import Card from './Card';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../InovaShop.png';

const MenuPrincipal = () => {
    const [productos, setProductos] = useState([]);
    const [descuentoAplicado, setDescuentoAplicado] = useState(false);

    useEffect(() => {
        obtenerproductos();
    }, []);

    const obtenerproductos = async () => {
        const datos = await fetch('https://fakestoreapi.com/products');
        const prod = await datos.json();
        setProductos(prod);
    };
    
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const descuento = urlParams.get('descuento');
        if (descuento === 'aplicado') {
          setDescuentoAplicado(true);
        }
      }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="logo" style={{ width: '40px' }} className="rounded-pill" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link to="/tienda" className="nav-link">Tienda</Link>
              </li>
              <li className="nav-item">
                <Link to="/carrito" className="nav-link">Carrito</Link>
              </li>
              <li className="nav-item">
                <Link to="/perfil" className="nav-link">Perfil</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <h2>Bienvenido al Menú Principal</h2>
        <p>Aquí puedes explorar nuestras ofertas y productos destacados.</p>
      </div>

      <div>
      <h3 style={{ textAlign: 'center', color: '#581845', margin: '40px 0', fontWeight: 'bold' }}>Lista de Productos</h3> {/* Título centrado, negrita y mayor margen */}
      <div className="container">
        <div className="row">
          {productos.map((producto) => {
            const precioConDescuento = (producto.price * 0.75).toFixed(2);
            return (
              <div className="col-md-4" key={producto.id}>
                <Card
                  url={producto.image}
                  title={producto.title}
                  price={descuentoAplicado ? null : `$${producto.price}`} // Oculta precio original si el descuento está aplicado
                  discountedPrice={descuentoAplicado ? `$${precioConDescuento}` : null} // Precio con descuento
                  description={producto.description}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </div>
  );
};

export default MenuPrincipal;
