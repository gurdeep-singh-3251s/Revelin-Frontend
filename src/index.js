import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/auth';
import { SearchProvider } from './context/Search';
import { CartProvider } from './context/cart';
import { TransactionProvider } from './context/transaction';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        <TransactionProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </TransactionProvider>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>
);
reportWebVitals();
