import { useState, useEffect } from 'react';
import { useGlobalState, useGlobalDispatch } from '../GlobalState';
import { cargarDatosIniciales } from '../dataUtils';
import { useNavigate } from 'react-router-dom';
import { mostrarAlertaError, mostrarAlertaExito } from '../sweetAlertUtils';

const useInitialData = () => {
    const [initialData, setInitialData] = useState(null);
    const [error, setError] = useState(null);
    const [dataLoaded, setDataLoaded] = useState(false);

    const { formData, loading, user } = useGlobalState();
    const dispatch = useGlobalDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInitialData = async () => {
            dispatch({ type: 'SET_LOADING', payload: true });
            try {
                const data = await cargarDatosIniciales(dispatch);
                setInitialData(data);
                setDataLoaded(true);
                if (!formData) mostrarAlertaExito(); // Mostrar alerta de éxito solo si no hay datos previos
            } catch (error) {
                console.error('Error in useInitialData:', error);
                setError(error.message);
                setDataLoaded(true);
                if (!formData) mostrarAlertaError(error.message); // Mostrar alerta de error solo si no hay datos previos
            } finally {
                dispatch({ type: 'SET_LOADING', payload: false });
            }
        };

        if (user) {
            if (!formData && !dataLoaded) {
                fetchInitialData();
            } else if (!formData && dataLoaded) {
                navigate('/datos-iniciales');
            }
        }
    }, [user, formData, dataLoaded, dispatch, navigate]);

    return { formData: initialData || formData, loading, user, error };
};

export default useInitialData;
