// src/utils/useInitialData.js
import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalState, useGlobalDispatch } from './GlobalState';
import { cargarDatosIniciales } from './dataUtils';
import useAuth from './useAuth';
import useLoading from './useLoading';

const useInitialData = () => {
    const navigate = useNavigate();
    const { formData } = useGlobalState();
    const dispatch = useGlobalDispatch();
    const setLoading = useLoading();
    const { user, authLoading } = useAuth();
    const MAX_RETRIES = 1;

    const fetchData = useCallback(async () => {
        setLoading(true);
        let retries = 0;

        while (retries < MAX_RETRIES) {
            try {
                const data = await cargarDatosIniciales(dispatch);
                if (data) {
                    dispatch({ type: 'SET_FORM_DATA', payload: data });
                } else {
                    dispatch({ type: 'SET_FORM_DATA', payload: {} });
                }
                break;
            } catch (error) {
                console.error("Error fetching initial data:", error);
                retries += 1;
                if (retries >= MAX_RETRIES) {
                    console.error('Error al cargar datos iniciales:', error.message);
                }
            }
        }
        setLoading(false);
    }, [dispatch, setLoading]);

    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            navigate('/login');
            return;
        }
        if (!formData || Object.keys(formData).length === 0) {
            fetchData();
        }
    }, [authLoading, user, navigate, formData, fetchData]);

    return { formData, user, authLoading };
};

export default useInitialData;