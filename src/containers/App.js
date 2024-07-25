// src/containers/App.js

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
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/App.css';
import { mostrarAviso } from '../utils/sweetAlertUtils';
import { generarPDF } from '../utils/pdfUtils';
import { subirPDFaFirebase } from '../services/firebaseService';

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

  // Función para obtener la fecha actual
  const getFechaActual = () => {
    const fecha = new Date();
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const año = fecha.getFullYear();
    return `A los días ${dia} del mes de ${mes} del año ${año}`;
  };

  // Función para manejar la generación y subida del PDF
  const handleGenerarYSubirPDF = async (inputId, storagePath, navigateTo) => {
    const result = await mostrarAviso();

    if (result.isConfirmed) {
      const pdfBlob = await generarPDF(inputId);
      await subirPDFaFirebase(pdfBlob, storagePath);

      // Descargar el PDF en la computadora del usuario con el nombre específico
      const nombreAlumno = formData.nombresAlumno.split(' ').join('-') + '-' + formData.apellidosAlumno.split(' ').join('-');
      const nombreArchivo = `${inputId}-${nombreAlumno}.pdf`;

      const link = document.createElement('a');
      link.href = URL.createObjectURL(pdfBlob);
      link.download = nombreArchivo;
      link.click();

      if (navigateTo) {
        navigateTo();
      }
    }
  };

  const [user] = useAuthState(auth);

  return (
    <Router basename="/mis-documentos-montessori-PRUEBA2-React">
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<DatosIniciales formData={formData} setFormData={setFormData} />} />
          <Route path="/aviso-privacidad" element={<AvisoPrivacidad formData={formData} getFechaActual={getFechaActual} onGenerarYSubirPDF={handleGenerarYSubirPDF} />} />
          <Route path="/datos-personales" element={<DatosPersonales formData={formData} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contrato-reglamento" element={<ContratoReglamento formData={formData} nivelEducativo={formData.nivelEducativo} />} />
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="*"
            element={<Navigate to={user ? "/dashboard" : "/login"} />}
          />
        </Routes>
      </div>
      <Footer />
      {/* Botón flotante de WhatsApp */}
      <a href="https://wa.me/5215548885013?text=Hola,%20necesito%20ayuda%20con%20mis%20documentos%20Montessori"
        className="float-whatsapp"
        target="_blank"
        rel="noopener noreferrer">
        <i className="fab fa-whatsapp"></i> ¿Necesitas ayuda? <br /> Chatea con nosotros
      </a>
    </Router>
  );
}

export default App;
