import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../utils/useAuth';
import useLoading from '../utils/useLoading';
import LoadingSpinner from '../components/Shared/LoadingSpinner';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const { user, authLoading } = useAuth();
        const setLoading = useLoading();
        const navigate = useNavigate();

        useEffect(() => {
            if (!authLoading) {
                if (!user) {
                    navigate('/login');
                } else {
                    setLoading(false);
                }
            }
        }, [authLoading, user, navigate, setLoading]);

        if (authLoading) {
            return <LoadingSpinner />;
        }

        return user ? <WrappedComponent {...props} /> : null;
    };
};

export default withAuth;
