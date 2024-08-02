// src/components/Login.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { login } from '../services/firebaseService';
import { mostrarAlertaLoginExitoso, mostrarAlertaErrorLogin } from '../utils/sweetAlertUtils';
import AuthLayout from './AuthLayout';
import { useGlobalDispatch } from '../utils/GlobalState';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email no válido').required('Email es requerido'),
    password: Yup.string().required('Contraseña es requerida')
});

const Login = ({ onSuccess, useLayout = true, showTitle = true }) => {
    const navigate = useNavigate();
    const dispatch = useGlobalDispatch();

    const handleLogin = async (values, { setSubmitting }) => {
        try {
            const user = await login(values.email, values.password);
            dispatch({ type: 'SET_USER', payload: user });
            mostrarAlertaLoginExitoso();
            if (onSuccess) {
                onSuccess();
            } else {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Error during login:', error);
            mostrarAlertaErrorLogin(navigate);
        }
        setSubmitting(false);
    };

    const loginForm = (
        <>
            {showTitle && <h1 className="text-center mb-4">Inicio de Sesión</h1>}
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
        </>
    );

    return useLayout ? <AuthLayout>{loginForm}</AuthLayout> : loginForm;
};

export default Login;
