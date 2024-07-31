// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { login } from '../services/firebaseService';
import Swal from 'sweetalert2';
import AuthLayout from './AuthLayout';
import { useGlobalDispatch } from '../utils/GlobalState';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useGlobalDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const user = await login(email, password);
            dispatch({ type: 'SET_USER', payload: user });
            Swal.fire('Inicio de sesión exitoso', '', 'success');
            navigate('/dashboard');
        } catch (error) {
            Swal.fire('Error al iniciar sesión', error.message, 'error');
        }
    };

    return (
        <AuthLayout>
            <h1 className="text-center mb-4">Inicio de Sesión</h1>
            <Form onSubmit={handleLogin}>
                <Form.Group controlId="formBasicEmail" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Ingresa tu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPassword" className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mt-3">
                    Iniciar Sesión
                </Button>
            </Form>
        </AuthLayout>
    );
};

export default Login;
