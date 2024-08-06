import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import DatosIniciales from '../containers/DatosIniciales';
import AvisoPrivacidad from '../containers/AvisoPrivacidad';
import DatosPersonales from '../containers/DatosPersonales';
import Register from '../components/Auth/Register';
import Login from '../components/Auth/Login';
import Dashboard from '../containers/Dashboard/Dashboard';
import ContratoReglamento from '../containers/ContratoReglamento';
import Bienvenida from '../containers/Bienvenida';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import { useGlobalState } from '../utils/GlobalState';
import useAuth from '../utils/hooks/useAuth';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/App.css';
import '../styles/LoadingSpinner.css';

function App() {
  const { user, loading } = useGlobalState();
  useAuth(); // Inicializa la autenticación

  console.log("User in App: ", user);

  if (loading) {
    return <LoadingSpinner />; // Si está cargando entonces mostrar Spinner de carga
  }

  return (
    <Router>
      <>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Bienvenida />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {user ? ( // si el usuario está logueado entonces ir a:
              <>
                <Route path="/datos-iniciales" element={<DatosIniciales />} />
                <Route path="/aviso-privacidad" element={<AvisoPrivacidad />} />
                <Route path="/datos-personales" element={<DatosPersonales />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/inicio" element={<Dashboard />} />
                <Route path="/contrato-reglamento" element={<ContratoReglamento />} />
                <Route path="*" element={<Dashboard />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" />} /> // Ruta comodín si el usuario no está logueado siempre manda a login
            )}
          </Routes>
        </div>
        <Footer />
      </>
    </Router>
  );
}

export default App;
