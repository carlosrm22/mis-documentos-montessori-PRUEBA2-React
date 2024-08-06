import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../utils/useAuth';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import { useGlobalState, useGlobalDispatch } from '../utils/GlobalState';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const { user, authLoading } = useAuth();
        const { loading } = useGlobalState();
        const dispatch = useGlobalDispatch();
        const navigate = useNavigate();

        useEffect(() => {
            if (!authLoading) {
                if (!user) {
                    navigate('/login');
                } else {
                    dispatch({ type: 'SET_LOADING', payload: false });
                }
            }
        }, [authLoading, user, navigate, dispatch]);

        if (loading || authLoading) {
            return <LoadingSpinner />;
        }

        return user ? <WrappedComponent {...props} /> : null;
    };
};

export default withAuth;
