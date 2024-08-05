import React, { useState, useEffect } from 'react';
import { useGlobalState, useGlobalDispatch } from '../../utils/GlobalState.js';
import { cargarDatosIniciales } from '../../utils/dataUtils';
import useLoading from '../../utils/useLoading';
import useAuth from '../../utils/useAuth';

const Dashboard = () => {
    const { formData } = useGlobalState();
    const dispatch = useGlobalDispatch();
    const setLoading = useLoading();
    useAuth();
    const [error, setError] = useState(null);

    useEffect(() => {
        cargarDatosIniciales(dispatch)
            .then(data => {
                dispatch({ type: 'SET_FORM_DATA', payload: data });
            })
            .catch(setError)
            .finally(() => setLoading(false));
    }, [dispatch, setLoading]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!formData) {
        return <div>Cargando datos...</div>;
    }

    return <div>{/* Aquí va el contenido del dashboard */}</div>;
};

export default Dashboard;
