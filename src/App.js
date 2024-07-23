import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DatosIniciales from './components/DatosIniciales';
import AvisoPrivacidad from './components/AvisoPrivacidad';

function App() {
  return (
    <Router basename="/mis-documentos-montessori-PRUEBA2-React">
      <div>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<DatosIniciales />} />
            <Route path="/aviso-privacidad" element={<AvisoPrivacidad />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
