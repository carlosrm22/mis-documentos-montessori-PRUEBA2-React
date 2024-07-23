// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DatosIniciales from './components/DatosIniciales';
import AvisoPrivacidad from './components/AvisoPrivacidad';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<DatosIniciales />} />
          <Route path="/aviso-privacidad" element={<AvisoPrivacidad />} />
          {/* Define otras rutas aquí según sea necesario */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
