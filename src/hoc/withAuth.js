import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../utils/useAuth';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import { useGlobalState } from '../utils/GlobalState';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const { user, authLoading } = useAuth();
        const { loading } = useGlobalState();
        const navigate = useNavigate();

        useEffect(() => {
            if (!authLoading && !user) {
                navigate('/login');
            }
        }, [authLoading, user, navigate]);

        if (loading || authLoading) {
            return <LoadingSpinner />;
        }

        return user ? <WrappedComponent {...props} /> : null;
    };
};

export default withAuth;
