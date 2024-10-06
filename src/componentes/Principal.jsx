import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../InovaShop.png';

const Principal = () => {
    return (
        <div>
            <nav className="navbar navbar-dark bg-dark"  id="mainNav">
                <div className="container">
                    <h4><strong style={{ color: "white" }}>InovaShop</strong></h4>
                    <Link to="/login" className="navbar-toggler" style={{ backgroundColor: '#DAF7A6' }}>
                        <i className='fas fa-sign-in-alt' style={{ fontSize: "24px", color: "#343a40" }} alt="Iniciar Sesión"></i>
                    </Link>
                </div>
            </nav>
            <header className="masthead" style={{ backgroundColor: '#DAF7A6', marginTop:'30px', padding:'30px'}}>
                <div className="container d-flex align-items-center flex-column">
                    <img 
                        className="rounded-pill" 
                        style={{ width: '100px', border: '5px solid #fff' }} 
                        src={logo} 
                        alt="InovaShop Logo" 
                    />
                    <h1 className="masthead-heading mb-0" style={{ color: '#343a40', fontWeight: 'bold' }}>
                        E-commerce
                    </h1>
                    <div className="divider-custom divider-light">
                        <div className="divider-custom-line"></div>
                        <div className="divider-custom-icon"><i className="fas fa-star"></i></div>
                        <div className="divider-custom-line"></div>
                    </div>
                    <p className="masthead-subheading font-weight-light mb-0">
                        Transforma tu Compra en una Experiencia Inolvidable
                    </p>
                </div>
            </header>
            <section className="page-section" style={{ backgroundColor: '#DAF7A6', padding:'30px'}} id="about">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 ms-auto">
                            <p className="text-center">
                                Bienvenido a nuestra tienda virtual, donde encontrarás una amplia variedad de productos diseñados para satisfacer tus necesidades. Navega por nuestras categorías y aprovecha nuestras ofertas exclusivas. ¡Tu próxima compra está a solo un clic de distancia!
                            </p>
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <Link 
                            to="/registro" 
                            className="btn" 
                            style={{ backgroundColor: '#343a40', color: 'white' }} 
                        >
                            <span><i className="fas fa-download me-2"></i> Quiero registrarme!</span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Principal;
