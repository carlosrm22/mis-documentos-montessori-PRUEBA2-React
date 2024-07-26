import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../utils/firebaseConfig';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DatosIniciales from '../components/DatosIniciales';
import AvisoPrivacidad from '../components/AvisoPrivacidad';
import DatosPersonales from '../components/DatosPersonales';
import Register from '../components/Register';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import ContratoReglamento from '../components/ContratoReglamento';
import Bienvenida from '../components/Bienvenida';
import { saveData } from '../services/firebaseService';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/App.css';

/**
 * Componente principal de la aplicación.
 */
function App() {
  // Estado inicial del formulario
  const [formData, setFormData] = useState({
    apellidosAlumno: '',
    nombresAlumno: '',
    fechaNacimientoAlumno: '',
    edadAlumno: '',
    curpAlumno: '',
    apellidosResponsable: '',
    nombresResponsable: '',
    telefonoContacto: '',
    emailContacto: '',
    lugarNacimientoAlumno: '',
    nombresMadre: '',
    apellidosMadre: '',
    nombresPadre: '',
    apellidosPadre: '',
    domicilioPadres: '',
    nivelEducativo: '' // Añadir el campo nivelEducativo
  });

  // Función para guardar datos iniciales
  const handleGuardarDatosIniciales = async () => {
    try {
      await saveData('datosIniciales', formData);
      alert('Datos guardados exitosamente');
    } catch (error) {
      console.error('Error guardando datos:', error);
      alert('Error al guardar los datos');
    }
  };

  const [user] = useAuthState(auth);

  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Bienvenida />} />
          <Route path="/datos-iniciales" element={<DatosIniciales formData={formData} setFormData={setFormData} onSave={handleGuardarDatosIniciales} />} />
          <Route path="/aviso-privacidad" element={<AvisoPrivacidad formData={formData} />} />
          <Route path="/datos-personales" element={<DatosPersonales formData={formData} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contrato-reglamento" element={<ContratoReglamento formData={formData} nivelEducativo={formData.nivelEducativo} />} />
          <Route
            path="/dashboard"
            element={user ? <Dashboard formData={formData} setFormData={setFormData} /> : <Navigate to="/login" />}
          />
          <Route
            path="*"
            element={<Navigate to={user ? "/dashboard" : "/login"} />}
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
