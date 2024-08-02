// src/utils/LoadingContext.js
import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const LoadingContext = createContext(false);

export const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

LoadingProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useLoading = () => useContext(LoadingContext);
