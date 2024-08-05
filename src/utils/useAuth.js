import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useGlobalDispatch } from './GlobalState';

const useAuth = () => {
    const dispatch = useGlobalDispatch();
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        dispatch({ type: 'SET_LOADING', payload: true });

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch({ type: 'SET_USER', payload: user });
                setUser(user);
            } else {
                dispatch({ type: 'SET_USER', payload: null });
                setUser(null);
            }
            dispatch({ type: 'SET_LOADING', payload: false });
            setAuthLoading(false);
        }, (error) => {
            console.error('Error in useAuth:', error);
            dispatch({ type: 'SET_USER', payload: null });
            dispatch({ type: 'SET_LOADING', payload: false });
            setAuthLoading(false);
        });

        return () => unsubscribe();
    }, [dispatch]);

    return { user, authLoading };
};

export default useAuth;