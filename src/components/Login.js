// src/components/Login.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { login } from '../services/firebaseService';
import Swal from 'sweetalert2';
import AuthLayout from './AuthLayout';
import { useGlobalDispatch } from '../utils/GlobalState';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email no válido').required('Email es requerido'),
    password: Yup.string().required('Contraseña es requerida')
});

const Login = ({ onSuccess }) => {
    const navigate = useNavigate();
    const dispatch = useGlobalDispatch();

    const handleLogin = async (values, { setSubmitting }) => {
        console.log('Attempting to login with values:', values);
        try {
            const user = await login(values.email, values.password);
            dispatch({ type: 'SET_USER', payload: user });
            Swal.fire('Inicio de sesión exitoso', '', 'success');
            if (onSuccess) {
                onSuccess();
            } else {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Error during login:', error);
            Swal.fire({
                icon: 'error',
                title: 'No se pudo iniciar sesión',
                text: 'Usuario o contraseña no encontrada, por favor intenta de nuevo o regístrate.',
                showCancelButton: true,
                confirmButtonText: 'Registrarse',
                cancelButtonText: 'Regresar'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/register');
                }
            });
        }
        setSubmitting(false);
    };

    return (
        <AuthLayout>
            <h1 className="text-center mb-4">Inicio de Sesión</h1>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
            >
                {({ isSubmitting }) => (
                    <Form className="text-start">
                        <Form.Group controlId="formBasicEmail" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Field
                                name="email"
                                type="email"
                                placeholder="Ingresa tu email"
                                className="form-control"
                                required
                            />
                            <ErrorMessage name="email" component="div" className="text-danger" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword" className="mb-3">
                            <Form.Label>Contraseña</Form.Label>
                            <Field
                                name="password"
                                type="password"
                                placeholder="Ingresa tu contraseña"
                                className="form-control"
                                required
                            />
                            <ErrorMessage name="password" component="div" className="text-danger" />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100 mt-3" disabled={isSubmitting}>
                            {isSubmitting ? 'Cargando...' : 'Iniciar Sesión'}
                        </Button>
                    </Form>
                )}
            </Formik>
        </AuthLayout>
    );
};

export default Login;
