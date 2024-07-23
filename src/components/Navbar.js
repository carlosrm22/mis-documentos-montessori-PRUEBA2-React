import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand text-white" to="/">
          <img src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} width="30" height="30" className="d-inline-block align-top" alt="Logo" />
          Mis Documentos Montessori
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/aviso-privacidad">Aviso de privacidad</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/datos-personales">Datos Personales</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/contrato-reglamento">Contrato y reglamento</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/contacto">Contacto</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
