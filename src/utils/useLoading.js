import { useCallback } from 'react';
import { useGlobalDispatch } from './GlobalState';

/**
 * Custom hook to set the loading state in the global state.
 * @returns {Function} setLoading - Function to set the loading state.
 */
const useLoading = () => {
    const dispatch = useGlobalDispatch();

    const setLoading = useCallback((isLoading) => {
        dispatch({ type: 'SET_LOADING', payload: isLoading });
    }, [dispatch]);

    return setLoading;
};

export default useLoading;
