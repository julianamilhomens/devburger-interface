import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from 'styled-components';

import stripePromise from './config/stripeConfig';
import AppProvider from './hooks';
import { Router } from './routes';
import GlobalStyles from './styles/globalStyles'
import { standardTheme } from './styles/themes/standard';




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={standardTheme}>
    <AppProvider>
      <Elements stripe={stripePromise}>
      <BrowserRouter>
       <Router />
      </BrowserRouter>
      </Elements>
      <GlobalStyles />
      <ToastContainer autoClose={4000} theme='colored' />
    </AppProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
