import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Formulario from './components/DatosIniciales'

function App() {
  return (
    <div>
      <Navbar />
      <div className="container">

        <Formulario />
      </div>
      <Footer />
    </div>
  );
}

export default App;
