import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const IndexCliente = () => {
  const { user, userData, logout } = useAuth();
  const { cart } = useCart();

  const totalItemsInCart = cart.reduce((total, product) => total + product.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/cliente" className="navbar-brand">Dashboard Cliente</Link>
        
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link to="/cliente/shop" className="nav-link">Shop</Link> 
          </li>
          <li className="nav-item">
            <Link to="/cliente/carrito" className="nav-link">
              Carrito {totalItemsInCart > 0 && `(${totalItemsInCart})`}
            </Link>
          </li>
        </ul>

        <div className="d-flex">
          {user && <span className="navbar-text mr-3">{userData.nombre}</span>}
          <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default IndexCliente;
