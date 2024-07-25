// src/components/Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/firebaseService';
import { Form, Button } from 'react-bootstrap';
import { mostrarAlertaExito, mostrarAlertaError } from '../utils/sweetAlertUtils';

/**
 * Componente para la página de inicio de sesión.
 */
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            mostrarAlertaExito();
            navigate('/dashboard');
        } catch (error) {
            mostrarAlertaError();
            console.error('Error al iniciar sesión:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1>Inicio de Sesión</h1>
            <Form onSubmit={handleLogin}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
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
                    Iniciar Sesión
                </Button>
            </Form>
        </div>
    );
}

export default Login;
