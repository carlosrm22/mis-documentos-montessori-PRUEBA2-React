import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DatosIniciales from './components/DatosIniciales';
import AvisoPrivacidad from './components/AvisoPrivacidad';
import DatosPersonales from './components/DatosPersonales';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function App() {
  const [formData, setFormData] = useState({
    apellidosAlumno: '',
    nombresAlumno: '',
    fechaNacimientoAlumno: '',
    edadAlumno: '',
    curpAlumno: '',
    apellidosResponsable: '',
    nombresResponsable: '',
    telefonoContacto: '',
    emailContacto: ''
  });

  // Extraer fecha actual para usarla en otras partes de la app
  const getFechaActual = () => {
    const fecha = new Date();
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const año = fecha.getFullYear();
    return `A los días ${dia} del mes de ${mes} del año ${año}`;
  };

  // Función para generar el PDF
  const generarPDF = () => {
    const input = document.body;
    return html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      return pdf.output('blob');
    });
  };

  return (
    <Router basename="/mis-documentos-montessori-PRUEBA2-React">
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<DatosIniciales formData={formData} setFormData={setFormData} />} />
          <Route path="/aviso-privacidad" element={<AvisoPrivacidad formData={formData} getFechaActual={getFechaActual} generarPDF={generarPDF} />} />
          <Route path="/datos-personales" element={<DatosPersonales formData={formData} />} />
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