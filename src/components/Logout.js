// src/components/Logout.js

import React from 'react';
import { logout } from '../services/firebaseService';

const Logout = () => {
    const handleLogout = () => {
        logout();
    };

    return (
        <button onClick={handleLogout}>Cerrar Sesión</button>
    );
};

export default Logout;
