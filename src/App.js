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
  const generarPDF = (inputId) => {
    const input = document.getElementById(inputId);

    // Ocultar elementos no deseados
    const elementsToHide = input.querySelectorAll('.no-print');
    elementsToHide.forEach(element => {
      element.style.display = 'none';
    });

    return html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'letter'); // 'letter' para tamaño carta
      const margin = 50; // Define el margen en puntos
      const pdfWidth = pdf.internal.pageSize.getWidth() - 2 * margin; // Resta los márgenes del ancho total
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width; // Calcula la altura proporcional de la imagen

      pdf.addImage(imgData, 'PNG', margin, margin, pdfWidth, pdfHeight);

      // Volver a mostrar los elementos no deseados
      elementsToHide.forEach(element => {
        element.style.display = '';
      });

      return pdf.output('blob');
    });
  };

  // Función para mostrar aviso y descargar PDF
  const mostrarAvisoYDescargarPDF = (inputId, navigateTo) => {
    Swal.fire({
      title: 'Se descargará el documento en PDF para que pueda imprimirlo y firmarlo',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar y Continuar',
      cancelButtonText: 'Revisar'
    }).then((result) => {
      if (result.isConfirmed) {
        generarPDF(inputId).then((pdfBlob) => {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(pdfBlob);
          link.download = 'documento.pdf';
          link.click();
          if (navigateTo) {
            navigateTo();
          }
        }).catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al generar el PDF.'
          });
        });
      }
    });
  };

  return (
    <Router basename="/mis-documentos-montessori-PRUEBA2-React">
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<DatosIniciales formData={formData} setFormData={setFormData} />} />
          <Route path="/aviso-privacidad" element={<AvisoPrivacidad formData={formData} getFechaActual={getFechaActual} mostrarAvisoYDescargarPDF={mostrarAvisoYDescargarPDF} />} />
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
