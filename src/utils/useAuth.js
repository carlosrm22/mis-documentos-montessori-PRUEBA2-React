import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useGlobalDispatch } from './GlobalState';

const useAuth = () => {
    const dispatch = useGlobalDispatch();

    useEffect(() => {
        const auth = getAuth();
        dispatch({ type: 'SET_LOADING', payload: true });

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch({ type: 'SET_USER', payload: user });
            } else {
                dispatch({ type: 'SET_USER', payload: null });
            }
            dispatch({ type: 'SET_LOADING', payload: false });
        }, (error) => {
            console.error('Error in useAuth:', error);
            dispatch({ type: 'SET_USER', payload: null });
            dispatch({ type: 'SET_LOADING', payload: false });
        });

        return () => unsubscribe();
    }, [dispatch]);

    return { user: null, authLoading: true }; // Devuelve un objeto para evitar el error de desestructuración
};

export default useAuth;
