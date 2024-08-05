import React from 'react';
import { Spinner } from 'react-bootstrap';
import '../../styles/LoadingSpinner.css';

const LoadingSpinner = () => (
    <div className="loading-spinner">
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
        </Spinner>
    </div>
);

export default LoadingSpinner;
