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
import useAuth from '../utils/useAuth';
// import useLoading from '../utils/useLoading';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/App.css';
import '../styles/LoadingSpinner.css';

function App() {
  const { user, loading } = useGlobalState();
  useAuth(); // Custom hook for handling auth
  // const setLoading = useLoading(); // Custom hook for setting loading state

  return (
    <Router>
      <>
        {loading && <LoadingSpinner />}
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Bienvenida />} />
            <Route path="/datos-iniciales" element={<DatosIniciales />} />
            <Route path="/aviso-privacidad" element={<AvisoPrivacidad />} />
            <Route path="/datos-personales" element={<DatosPersonales />} />
            <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/contrato-reglamento" element={<ContratoReglamento />} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          </Routes>
        </div>
        <Footer />
      </>
    </Router>
  );
}

export default App;
