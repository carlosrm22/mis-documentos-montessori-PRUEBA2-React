// src/components/Bienvenida.js

import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Componente para la pantalla de bienvenida.
 */
const Bienvenida = () => {
    return (
        <div className="container mt-5">
            <h1 className="text-center">Bienvenido a Mi Cuenta Montessori</h1>
            <p className="text-center">Por favor, inicia sesión o regístrate para continuar.</p>
            <div className="d-flex justify-content-center">
                <Link to="/login" className="btn btn-primary mx-2">Iniciar Sesión</Link>
                <Link to="/register" className="btn btn-secondary mx-2">Registrarse</Link>
            </div>
        </div>
    );
};

export default Bienvenida;
