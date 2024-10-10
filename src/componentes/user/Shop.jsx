import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useCategories } from '../../context/CategoriesContext';
import { useProducts } from '../../context/ProductsContext';

const Shop = () => {
  const { products } = useProducts();
  const { categories } = useCategories();
  const { addToCart } = useCart();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(categoryId)
        ? prevCategories.filter((id) => id !== categoryId)
        : [...prevCategories, categoryId]
    );
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(product.category);

    return matchesSearchTerm && matchesCategory;
  });

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <h4>Filtrar por Categoría</h4>
          <div className="form-group">
            {categories.map((category) => (
              <div key={category.id} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={category.id}
                  id={`category-${category.id}`}
                  onChange={() => handleCategoryChange(category.id)}
                />
                <label className="form-check-label" htmlFor={`category-${category.id}`}>
                  {category.name}
                </label>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <h4>Buscar Producto</h4>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="col-md-9">
          <div className="row">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="col-md-4 mb-4">
                  <div className="card">
                    <img
                      src={product.image}
                      className="card-img-top"
                      alt={product.name}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">Precio: ${product.price}</p>
                      <p className="card-text">{product.description}</p>
                      <p className="card-text">
                        <small className="text-muted">
                          Categoría: {categories.find((cat) => cat.id === product.category)?.name || 'N/A'}
                        </small>
                      </p>
                      <button
                        className="btn btn-primary"
                        onClick={() => addToCart(product, 1)}
                      >
                        Agregar al Carrito
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No se encontraron productos.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
