// src/components/Register.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { register } from '../services/firebaseService';
import Swal from 'sweetalert2';
import AuthLayout from './AuthLayout';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            Swal.fire('Las contraseñas no coinciden', '', 'error');
            return;
        }
        try {
            await register(email, password);
            Swal.fire('Registro exitoso', '', 'success');
            navigate('/datos-iniciales');
        } catch (error) {
            Swal.fire('Error al registrarse', error.message, 'error');
        }
    };

    return (
        <AuthLayout>
            <h1 className="text-center mb-4">Registrarse</h1>
            <Form onSubmit={handleRegister}>
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
                <Form.Group controlId="formBasicConfirmPassword" className="mb-3">
                    <Form.Label>Confirmar Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirma tu contraseña"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="secondary" type="submit" className="w-100 mt-3">
                    Registrarse
                </Button>
            </Form>
        </AuthLayout>
    );
};

export default Register;
