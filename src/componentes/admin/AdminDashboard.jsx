import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import IndexAdmin from './IndexAdmin';
import ManageCategories from './ManageCategories';
import ManageProducts from './ManageProducts';

const AdminDashboard = () => {
  return (
    <div>
      <IndexAdmin />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Navigate to="products" />} />
          <Route path="products" element={<ManageProducts />} />
          <Route path="categories" element={<ManageCategories />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
