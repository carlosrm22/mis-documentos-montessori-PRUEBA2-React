// src/components/Register.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { register } from '../services/firebaseService';
import { mostrarAlertaRegistroExitoso, mostrarAlertaErrorRegistro } from '../utils/sweetAlertUtils';
import AuthLayout from './AuthLayout';
import { useGlobalDispatch } from '../utils/GlobalState';
import { Formik, Field, ErrorMessage } from 'formik';
import { registroValidationSchema } from '../utils/validationSchemas';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useGlobalDispatch();

    const handleRegister = async (values, { setSubmitting }) => {
        console.log('Attempting to register with values:', values);
        if (values.password !== values.confirmPassword) {
            mostrarAlertaErrorRegistro('Las contraseñas no coinciden');
            setSubmitting(false);
            return;
        }
        try {
            const user = await register(values.email, values.password);
            dispatch({ type: 'SET_USER', payload: user });
            mostrarAlertaRegistroExitoso();
            navigate('/datos-iniciales');
        } catch (error) {
            console.error('Error during registration:', error);
            mostrarAlertaErrorRegistro(error.message);
        }
        setSubmitting(false);
    };

    return (
        <AuthLayout>
            <h1 className="text-center mb-4">Registrarse</h1>
            <Formik
                initialValues={{ email: '', password: '', confirmPassword: '' }}
                validationSchema={registroValidationSchema}
                onSubmit={handleRegister}
            >
                {({ isSubmitting }) => (
                    <Form className="text-start">
                        <Form.Group controlId="email" className="mb-3">
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
                        <Form.Group controlId="password" className="mb-3">
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
                        <Form.Group controlId="confirmPassword" className="mb-3">
                            <Form.Label>Confirmar Contraseña</Form.Label>
                            <Field
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirma tu contraseña"
                                className="form-control"
                                required
                            />
                            <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                        </Form.Group>
                        <Button variant="secondary" type="submit" className="w-100 mt-3" disabled={isSubmitting}>
                            {isSubmitting ? 'Cargando...' : 'Registrarse'}
                        </Button>
                    </Form>
                )}
            </Formik>
        </AuthLayout>
    );
};

export default Register;
