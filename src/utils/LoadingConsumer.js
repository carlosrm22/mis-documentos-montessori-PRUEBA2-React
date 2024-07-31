import React from 'react';
import { useLoading } from '../utils/LoadingContext';

const LoadingConsumer = ({ children }) => {
    const context = useLoading();
    if (context === undefined) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return children(context);
};

export default LoadingConsumer;
