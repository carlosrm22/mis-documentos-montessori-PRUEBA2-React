// Componente para manejar la autenticación de usuarios ↓
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useGlobalDispatch } from './GlobalState';

const useAuth = () => {
    const dispatch = useGlobalDispatch(); // Obtener el dispatch del estado global
    const [authState, setAuthState] = useState({ user: null, loading: true }); // Estado inicial

    useEffect(() => {//
        const auth = getAuth(); // Obtener la instancia de autenticación de Firebase
        dispatch({ type: 'SET_LOADING', payload: true }); // Establecer el estado de carga en true

        const unsubscribe = onAuthStateChanged(auth, (user) => { // Suscribirse a los cambios de estado de autenticación
            dispatch({ type: 'SET_USER', payload: user || null }); // Actualizar el usuario en el estado global
            dispatch({ type: 'SET_LOADING', payload: false }); // Establecer el estado de carga en false
            setAuthState({ user, loading: false }); // Actualizar el estado local
            console.log("User state updated: ", user);
        }, (error) => { // Manejar errores
            console.error('Error in useAuth:', error); // Mostrar error en consola
            dispatch({ type: 'SET_USER', payload: null }); // Establecer usuario en null en caso de error
            dispatch({ type: 'SET_LOADING', payload: false }); // Establecer el estado de carga en false
            setAuthState({ user: null, loading: false }); // Actualizar el estado local
        });

        return () => unsubscribe(); // Limpiar la suscripción al desmontar el componente
    }, [dispatch]);

    return authState; // Devolver el estado de autenticación
};

export default useAuth; // Exportar el hook