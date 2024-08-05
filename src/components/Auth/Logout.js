// src/components/Logout.js

import React from 'react';
import { logout } from '../../services/firebaseService';

/**
 * Componente para cerrar sesión.
 * Llama a la función de logout del servicio de Firebase.
 */
const Logout = () => {
    /**
     * Maneja el evento de clic para cerrar sesión.
     */
    const handleLogout = () => {
        logout();
    };

    return (
        <button onClick={handleLogout}>Cerrar Sesión</button>
    );
};

export default Logout;
