import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useCategories } from '../../context/CategoriesContext';
import { useProducts } from '../../context/ProductsContext';
import { firestore } from '../../firebase';

const ManageProducts = () => {
  const { categories, loading: loadingCategories } = useCategories();
  const { products } = useProducts();
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [editingProductId, setEditingProductId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingProductId) {
      const productRef = doc(firestore, 'productos', editingProductId);
      await updateDoc(productRef, {
        name: productName,
        price: parseFloat(productPrice),
        image: productImage,
        category: productCategory,
        description: productDescription,
      });
      setEditingProductId(null);
    } else {
      await addDoc(collection(firestore, 'productos'), {
        name: productName,
        price: parseFloat(productPrice),
        image: productImage,
        category: productCategory,
        description: productDescription,
      });
    }

    setProductName('');
    setProductPrice('');
    setProductImage('');
    setProductCategory('');
    setProductDescription('');
  };

  const handleEdit = (product) => {
    setProductName(product.name);
    setProductPrice(product.price);
    setProductImage(product.image);
    setProductCategory(product.category);
    setProductDescription(product.description);
    setEditingProductId(product.id);
  };

  const handleDelete = async (id) => {
    const productRef = doc(firestore, 'productos', id);
    await deleteDoc(productRef);
  };

  if (loadingCategories) {
    return <p>Cargando categorías...</p>;
  }

  return (
    <div>
      <h2>Gestión de Productos</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">Nombre del Producto</label>
          <input
            type="text"
            className="form-control"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productPrice" className="form-label">Precio</label>
          <input
            type="number"
            className="form-control"
            id="productPrice"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productImage" className="form-label">URL de la Imagen</label>
          <input
            type="text"
            className="form-control"
            id="productImage"
            value={productImage}
            onChange={(e) => setProductImage(e.target.value)}
            required
          />
        </div>
        <div className="d-flex align-items-center mb-3">
          <span className="form-label mr-3">Categoría</span>
          <select
            className="form-select"
            id="productCategory"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            required
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="productDescription" className="form-label">Descripción</label>
          <textarea
            className="form-control"
            id="productDescription"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit"   className="btn" style={{ backgroundColor: '#343a40',color: '#fff',border: '2px solid #DAF7A6'}}>
          {editingProductId ? 'Actualizar Producto' : 'Agregar Producto'}
        </button>
      </form>

      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col mb-4">
            <div className="card">
              <img src={product.image} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Precio: ${product.price}</p>
                <p className="card-text">{product.description}</p>
                <button
                  className="btn" style={{ backgroundColor: '#343a40',color: '#DAF7A6',border: '2px solid #DAF7A6',borderRadius: '5px'}}
                  onClick={() => handleEdit(product)}
                >
                  <i className="fas fa-edit" style={{ color: 'white', marginRight: '5px' }}></i>
                </button>
                <button
                  className="btn" style={{ backgroundColor: '#343a40',color: '#DAF7A6',border: '2px solid #DAF7A6',borderRadius: '5px'}}
                  onClick={() => handleDelete(product.id)}
                >
                  <i className="fas fa-trash" style={{ color: 'white', marginRight: '5px' }}></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProducts;
