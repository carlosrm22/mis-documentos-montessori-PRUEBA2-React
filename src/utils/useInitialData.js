// src/utils/useInitialData.js
import { useState, useEffect } from 'react';
import { useGlobalState, useGlobalDispatch } from '../utils/GlobalState';
import { getAuth } from 'firebase/auth';
import { cargarDatosIniciales } from '../utils/dataUtils';

const useInitialData = () => {
    const [initialData, setInitialData] = useState(null);
    const { formData } = useGlobalState();
    const dispatch = useGlobalDispatch();
    const auth = getAuth();
    const user = auth.currentUser;
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const data = await cargarDatosIniciales(dispatch);
                setInitialData(data);
            } catch (error) {
                console.error('Error in useInitialData:', error);
                setInitialData({ error: error.message });  // Asegúrate de no pasar un objeto de error
            } finally {
                setAuthLoading(false);
            }
        };

        if (user && !formData) {
            fetchInitialData();
        } else {
            setAuthLoading(false);
        }
    }, [user, formData, dispatch]);

    return { formData: initialData || formData, authLoading, user };
};

export default useInitialData;
