import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const IndexAdmin = () => {
  const { user, userData, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#343a40'}}>
      <div className="container-fluid">
        <Link to="/admin" className="navbar-brand" style={{ color: '#fff'}}>Admin Dashboard</Link>
        
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/admin/products" className="nav-link" style={{ color: 'white' }}>Manage Products</Link> 
            </li>
            <li className="nav-item">
              <Link to="/admin/categories" className="nav-link" style={{ color: 'white' }}>Manage Categories</Link>
            </li>
          </ul>

          <div className="d-flex">
            {user && <span className="navbar-text mr-3" style={{ color: 'white', fontWeight: 'bold' }}>{userData.nombre}</span>}
            <button className="btn" style={{ backgroundColor: '#343a40', color: '#DAF7A6', fontWeight: 'bold', border: '2px solid #DAF7A6' }} onClick={logout}>Logout</button>
          </div>
      </div>
    </nav>
  );
};

export default IndexAdmin;
