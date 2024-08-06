import { useState, useEffect } from 'react';
import { useGlobalState, useGlobalDispatch } from '../utils/GlobalState';
import { getAuth } from 'firebase/auth';
import { cargarDatosIniciales } from '../utils/dataUtils';
import { useNavigate } from 'react-router-dom';
import { mostrarAlertaError, mostrarAlertaExito } from '../utils/sweetAlertUtils';

const useInitialData = () => {
    const [initialData, setInitialData] = useState(null);
    const [error, setError] = useState(null);
    const [dataLoaded, setDataLoaded] = useState(false);

    const { formData, loading } = useGlobalState();
    const dispatch = useGlobalDispatch();
    const auth = getAuth();
    const user = auth.currentUser;
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

        if (user && !formData && !dataLoaded) {
            fetchInitialData();
        } else if (user && !formData && dataLoaded) {
            navigate('/datos-iniciales');
        } else {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, [user, formData, dataLoaded, dispatch, navigate]);

    return { formData: initialData || formData, loading, user, error };
};

export default useInitialData;
