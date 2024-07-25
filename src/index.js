// src/index.js

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/css/all.min.css';


import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './containers/App';
import './styles/App.css';

// Crear la raíz de React usando createRoot
const container = document.getElementById('root');
const root = createRoot(container);

// Renderizar la aplicación en la raíz
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
