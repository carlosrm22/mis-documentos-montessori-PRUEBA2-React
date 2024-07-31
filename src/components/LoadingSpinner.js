// src/components/LoadingSpinner.js
import React from 'react';
import { Spinner } from 'react-bootstrap';

/**
 * Componente para mostrar un indicador de carga.
 */
const LoadingSpinner = () => {
    return (
        <div className="loading-spinner">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Cargando...</span>
            </Spinner>
        </div>
    );
};

export default LoadingSpinner;
