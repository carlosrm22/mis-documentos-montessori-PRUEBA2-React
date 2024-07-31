// src/components/Dashboard.js

import React, { useState, useEffect } from 'react';
import { getDatosIniciales } from '../services/firebaseService';
import Swal from 'sweetalert2';

/**
 * Componente para el Dashboard.
 */
const Dashboard = () => {
    const [datosIniciales, setDatosIniciales] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDatos = async () => {
            try {
                const datos = await getDatosIniciales();
                setDatosIniciales(datos);
            } catch (error) {
                setError(error.message);
                // Mostrar alerta de error al usuario
                Swal.fire('Error al cargar datos', error.message, 'error');
            }
        };

        fetchDatos();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!datosIniciales) {
        return <div>Cargando datos...</div>;
    }

    return <div>{/* Aquí va el contenido del dashboard */}</div>;
};

export default Dashboard;