import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useCategories } from '../../context/CategoriesContext';
import { firestore } from '../../firebase';

const ManageCategories = () => {
  const { categories, loading } = useCategories();
  const [categoryName, setCategoryName] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingCategoryId) {
      const categoryRef = doc(firestore, 'categorias', editingCategoryId);
      await updateDoc(categoryRef, { name: categoryName });
      setEditingCategoryId(null);
    } else {
      await addDoc(collection(firestore, 'categorias'), { name: categoryName });
    }
    setCategoryName('');
  };

  const handleEdit = (category) => {
    setCategoryName(category.name);
    setEditingCategoryId(category.id);
  };

  const handleDelete = async (id) => {
    const categoryRef = doc(firestore, 'categorias', id);
    await deleteDoc(categoryRef);
  };

  if (loading) {
    return <p>Cargando categorías...</p>;
  }

  return (
    <div>
      <h2>Gestión de Categorías</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="categoryName" className="form-label">Nombre de la Categoría</label>
          <input
            type="text"
            className="form-control"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editingCategoryId ? 'Actualizar Categoría' : 'Agregar Categoría'}
        </button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEdit(category)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(category.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCategories;
