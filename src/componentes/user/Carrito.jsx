import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';

const Carrito = () => {
  const { cart, updateCartQuantity, removeFromCart, clearCart } = useCart();

  const [coupon, setCoupon] = useState('');
  const [shippingCost] = useState(10);
  
  const [isShippingFree, setIsShippingFree] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(0);

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const discountAmount = (subtotal * discountPercentage) / 100;
  const total = subtotal - discountAmount + (isShippingFree ? 0 : shippingCost);

  const handleCouponChange = (e) => {
    const selectedCoupon = e.target.value;
    setCoupon(selectedCoupon);

    if (selectedCoupon === 'FREE_SHIPPING') {
      setIsShippingFree(true);
      setDiscountPercentage(0);
    } else if (selectedCoupon === '10_OFF') {
      setIsShippingFree(false);
      setDiscountPercentage(10);
    } else if (selectedCoupon === '20_OFF') {
      setIsShippingFree(false);
      setDiscountPercentage(20);
    } else {
      setIsShippingFree(false);
      setDiscountPercentage(0);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          <h4 className="mb-4">Tu Carrito de Compras</h4>
          {cart.length > 0 ? (
            cart.map((product) => (
              <div key={product.id} className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img 
                      src={product.image} 
                      className="img-fluid rounded-start" 
                      alt={product.name} 
                      style={{ height: '150px', objectFit: 'cover' }} 
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">Precio: ${product.price.toFixed(2)}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <span>Cantidad:</span>
                          <input 
                            type="number" 
                            value={product.quantity} 
                            min="1" 
                            className="form-control d-inline-block ms-2" 
                            style={{ width: '60px' }} 
                            onChange={(e) => updateCartQuantity(product.id, Number(e.target.value))} 
                          />
                        </div>
                        <p className="card-text">
                          Total: ${(product.price * product.quantity).toFixed(2)}
                        </p>
                      </div>
                      <button 
                        className="btn btn-danger btn-sm mt-2" 
                        onClick={() => removeFromCart(product.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No tienes productos en el carrito.</p>
          )}
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h4>Resumen de la Compra</h4>
              <p className="card-text">Número de artículos: {cart.reduce((total, item) => total + item.quantity, 0)}</p>
              <p className="card-text">Subtotal: ${subtotal.toFixed(2)}</p>
              <p className="card-text">Costo de envío: ${isShippingFree ? 'Envío Gratis' : shippingCost.toFixed(2)}</p>
              {discountPercentage > 0 && (
                <p className="card-text">Descuento aplicado: -${discountAmount.toFixed(2)} ({discountPercentage}%)</p>
              )}
              <p className="card-text">Total a pagar: ${total.toFixed(2)}</p>

              <div className="form-group mt-3">
                <label htmlFor="coupon">Selecciona un cupón:</label>
                <select
                  id="coupon"
                  className="form-control"
                  value={coupon}
                  onChange={handleCouponChange}
                >
                  <option value="">Sin cupón</option>
                  <option value="FREE_SHIPPING">Cupón de Envío Gratis</option>
                  <option value="10_OFF">Cupón 10% de Descuento</option>
                  <option value="20_OFF">Cupón 20% de Descuento</option>
                </select>
              </div>

              <button className="btn btn-success btn-block mt-3">
                Proceder al pago
              </button>
              <button className="btn btn-secondary btn-block mt-2" onClick={clearCart}>
                Vaciar carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
