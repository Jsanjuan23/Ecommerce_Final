import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Carrito from './Carrito';
import IndexCliente from './IndexCliente';
import Shop from './Shop';

const ClienteDashboard = () => {
  return (
    <div>
      <IndexCliente />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Navigate to="shop" />} />
          <Route path="shop" element={<Shop />} />
          <Route path="carrito" element={<Carrito />} />
        </Routes>
      </div>
    </div>
  );
};

export default ClienteDashboard;
