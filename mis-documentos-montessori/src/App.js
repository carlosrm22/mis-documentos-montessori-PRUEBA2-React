import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Formulario from './components/Formulario';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <h1 className="mt-5">Datos iniciales</h1>
        <p>
          Por favor, ingresa los datos iniciales para que podamos generar tus documentos. Asegúrate de llenar correctamente cada campo, ya que tu documento se generará exactamente como ingreses la información.
        </p>
        <Formulario />
      </div>
      <Footer />
    </div>
  );
}

export default App;
