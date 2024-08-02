// src/containers/App.js
import React from 'react';
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
import { useLoading } from '../utils/LoadingContext';
import LoadingSpinner from '../components/LoadingSpinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/App.css';
import '../styles/LoadingSpinner.css';

function App() {
  const [user] = useAuthState(auth);

  return (
    <Router>
      <LoadingConsumer>
        {({ loading, setLoading }) => (
          <>
            {loading && <LoadingSpinner />}
            <Navbar />
            <div className="container">
              <Routes>
                <Route path="/" element={<Bienvenida />} />
                <Route path="/datos-iniciales" element={<DatosIniciales setLoading={setLoading} />} />
                <Route path="/aviso-privacidad" element={<AvisoPrivacidad setLoading={setLoading} />} />
                <Route path="/datos-personales" element={<DatosPersonales />} />
                <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
                <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
                <Route path="/contrato-reglamento" element={<ContratoReglamento />} />
                <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
              </Routes>
            </div>
            <Footer />
          </>
        )}
      </LoadingConsumer>
    </Router>
  );
}

const LoadingConsumer = ({ children }) => {
  const context = useLoading();
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return children(context);
};

export default App;
