import React, { useState, useEffect, useCallback } from 'react';
import { useGlobalState, useGlobalDispatch } from '../../utils/GlobalState.js';
import { cargarDatosIniciales } from '../../utils/dataUtils';
import useLoading from '../../utils/useLoading';
import useAuth from '../../utils/useAuth';

const Dashboard = React.memo(() => {
    const { formData } = useGlobalState();
    const dispatch = useGlobalDispatch();
    const setLoading = useLoading();
    useAuth();
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const data = await cargarDatosIniciales(dispatch);
            dispatch({ type: 'SET_FORM_DATA', payload: data });
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [dispatch, setLoading]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!formData) {
        return <div>Cargando datos...</div>;
    }

    return <div>{/* Aquí va el contenido del dashboard */}</div>;
});

export default Dashboard;
