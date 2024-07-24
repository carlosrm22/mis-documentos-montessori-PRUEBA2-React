// src/index.js

import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './App';

// Crear la raíz de React usando createRoot
const container = document.getElementById('root');
const root = createRoot(container);

// Renderizar la aplicación en la raíz
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);