import { useContext } from 'react';
import { LoadingContext } from './LoadingContext';

const useLoading = () => {
    const { loading, setLoading } = useContext(LoadingContext);

    return setLoading;
};

export default useLoading;
