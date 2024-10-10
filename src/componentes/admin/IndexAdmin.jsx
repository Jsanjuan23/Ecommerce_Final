import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const IndexAdmin = () => {
  const { user, userData, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/admin" className="navbar-brand">Admin Dashboard</Link>
        
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/admin/products" className="nav-link">Manage Products</Link> 
            </li>
            <li className="nav-item">
              <Link to="/admin/categories" className="nav-link">Manage Categories</Link>
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

export default IndexAdmin;
