// src/components/Dashboard.js

import React, { useState, useEffect } from 'react';
import { getDatosIniciales } from '../services/firebaseService';
import Swal from 'sweetalert2';
import { useGlobalState, useGlobalDispatch } from '../utils/GlobalState';

/**
 * Componente para el Dashboard.
 * Muestra la información inicial del usuario y maneja la carga de datos.
 */
const Dashboard = () => {
    const { formData } = useGlobalState();
    const dispatch = useGlobalDispatch();
    const [error, setError] = useState(null);

    /**
     * Función para obtener los datos iniciales del usuario.
     */
    useEffect(() => {
        const fetchDatos = async () => {
            try {
                const datos = await getDatosIniciales();
                dispatch({ type: 'SET_FORM_DATA', payload: datos });
            } catch (error) {
                setError(error.message);
                // Mostrar alerta de error al usuario
                Swal.fire('Error al cargar datos', error.message, 'error');
            }
        };

        fetchDatos();
    }, [dispatch]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!formData) {
        return <div>Cargando datos...</div>;
    }

    return <div>{/* Aquí va el contenido del dashboard */}</div>;
};

export default Dashboard;
