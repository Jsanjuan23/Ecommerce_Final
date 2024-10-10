import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from './context/CartContext';
import { CategoryProvider } from "./context/CategoriesContext";
import { ProductProvider } from "./context/ProductsContext";
import './index.css';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <CategoryProvider>
            <CartProvider>
                <App />
            </CartProvider>
          </CategoryProvider>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
