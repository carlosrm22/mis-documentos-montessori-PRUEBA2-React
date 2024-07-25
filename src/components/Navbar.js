// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../utils/firebaseConfig';

/**
 * Componente para la barra de navegación.
 */
function Navbar() {
  const [user] = useAuthState(auth);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand text-white" to="/">
          <img src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} alt="Logo" width="30" height="30" className="d-inline-block align-top" />
          Mi Cuenta Montessori
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">Inicio</Link>
            </li>
            {user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/aviso-privacidad">Aviso de privacidad</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/contrato-reglamento">Contrato y reglamento</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/datos-personales">Datos Personales</Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link className="nav-link text-white" to="/contacto">Contacto</Link>
            </li>
            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/login">Iniciar Sesión</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/register">Registrarse</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/dashboard">Mi Cuenta</Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link text-white" onClick={() => auth.signOut()}>Cerrar Sesión</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
