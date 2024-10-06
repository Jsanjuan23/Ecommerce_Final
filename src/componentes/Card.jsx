import { Link } from 'react-router-dom';

const Card = ({ url, title, price, discountedPrice, description }) => {
  return (
    <div className="card mb-4" style={{ width: '100%', height: '700px' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img 
          src={url} 
          className="card-img-top img-fluid" 
          alt={title} 
          style={{ height: '200px', width: '80%', objectFit: 'contain', marginTop: '10px' }}
        />
      </div>
      <div className="card-body">
        <h5 className="card-title" style={{ fontSize: '1rem' }}>{title}</h5>
        <p className="card-text" style={{ fontSize: '0.800rem' }}>{description}</p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 'auto' }}>
          {price && (
            <p className="card-price" style={{ color: 'green', fontWeight: 'bold' }}>{price}</p>
          )}
          {discountedPrice && (
            <p className="card-discounted-price" style={{ color: 'red', fontWeight: 'bold' }}>
              {discountedPrice} <span style={{ fontSize: '0.8rem', textDecoration: 'line-through' }}>{price}</span>
            </p>
          )}
          <Link 
            to={!discountedPrice ? '/descuentos' : '#'}
            className="btn" 
            style={{
              marginTop: '10px',
              backgroundColor: discountedPrice ? 'white' : '#581845',
              border: discountedPrice ? '1px solid black' : 'none',
              color: discountedPrice ? 'green' : 'white',
              fontWeight: 'bold'
            }}
            disabled={discountedPrice} // Deshabilitar el botón si hay descuento
          >
            {discountedPrice ? 'Descuento Aplicado' : 'Conseguir Descuentos'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;