// src/components/Register.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/firebaseService';
import { Form, Button } from 'react-bootstrap';
import { mostrarAlertaExito, mostrarAlertaError } from '../utils/sweetAlertUtils';

/**
 * Componente para la página de registro.
 */
function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register(email, password);
            mostrarAlertaExito();
            navigate('/dashboard');
        } catch (error) {
            mostrarAlertaError();
            console.error('Error al registrar usuario:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1>Registro</h1>
            <Form onSubmit={handleRegister}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label> Usuario</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Ingresa tu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    Registrarse
                </Button>
            </Form>
        </div>
    );
}

export default Register;
