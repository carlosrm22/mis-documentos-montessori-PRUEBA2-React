// src/components/Login.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form as BootstrapForm } from 'react-bootstrap'; // Uso de BootstrapForm para evitar conflictos con Formik
import { login } from '../services/firebaseService';
import { mostrarAlertaLoginExitoso, mostrarAlertaErrorLogin } from '../utils/sweetAlertUtils';
import AuthLayout from './AuthLayout';
import { useGlobalDispatch } from '../utils/GlobalState';
import { Formik, Field, ErrorMessage, Form as FormikForm } from 'formik'; // Importando Form como FormikForm
import { loginValidationSchema } from '../utils/validationSchemas';

const Login = ({ onSuccess, useLayout = true, showTitle = true }) => {
    const navigate = useNavigate();
    const dispatch = useGlobalDispatch();

    const handleLogin = async (values, { setSubmitting }) => {
        console.log('Handle login called with values:', values);
        try {
            const user = await login(values.email, values.password);
            console.log('User logged in:', user);
            dispatch({ type: 'SET_USER', payload: user });
            mostrarAlertaLoginExitoso();
            if (onSuccess) {
                onSuccess();
            } else {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Error during login:', error);
            mostrarAlertaErrorLogin(navigate); // No await aquí si no es necesario
        }
        setSubmitting(false);
    };

    const loginForm = (
        <>
            {showTitle && <h1 className="text-center mb-4">Inicio de Sesión</h1>}
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={loginValidationSchema}
                onSubmit={handleLogin}
            >
                {({ isSubmitting }) => (
                    <FormikForm className="text-start">
                        <BootstrapForm.Group controlId="email" className="mb-3">
                            <BootstrapForm.Label>Email</BootstrapForm.Label>
                            <Field
                                name="email"
                                type="email"
                                placeholder="Ingresa tu email"
                                className="form-control"
                                required
                            />
                            <ErrorMessage name="email" component="div" className="text-danger" />
                        </BootstrapForm.Group>
                        <BootstrapForm.Group controlId="password" className="mb-3">
                            <BootstrapForm.Label>Contraseña</BootstrapForm.Label>
                            <Field
                                name="password"
                                type="password"
                                placeholder="Ingresa tu contraseña"
                                className="form-control"
                                required
                            />
                            <ErrorMessage name="password" component="div" className="text-danger" />
                        </BootstrapForm.Group>
                        <Button variant="primary" type="submit" className="w-100 mt-3" disabled={isSubmitting}>
                            {isSubmitting ? 'Cargando...' : 'Iniciar Sesión'}
                        </Button>
                    </FormikForm>
                )}
            </Formik>
        </>
    );

    return useLayout ? <AuthLayout>{loginForm}</AuthLayout> : loginForm;
};

export default Login;
