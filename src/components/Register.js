// src/components/Register.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form as BootstrapForm } from 'react-bootstrap'; // Uso de BootstrapForm para evitar conflictos con Formik
import { register } from '../services/firebaseService';
import { mostrarAlertaRegistroExitoso, mostrarAlertaErrorRegistro } from '../utils/sweetAlertUtils';
import AuthLayout from './AuthLayout';
import { useGlobalDispatch } from '../utils/GlobalState';
import { Formik, Field, ErrorMessage, Form as FormikForm } from 'formik'; // Importando Form como FormikForm
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
                        <BootstrapForm.Group controlId="confirmPassword" className="mb-3">
                            <BootstrapForm.Label>Confirmar Contraseña</BootstrapForm.Label>
                            <Field
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirma tu contraseña"
                                className="form-control"
                                required
                            />
                            <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                        </BootstrapForm.Group>
                        <Button variant="secondary" type="submit" className="w-100 mt-3" disabled={isSubmitting}>
                            {isSubmitting ? 'Cargando...' : 'Registrarse'}
                        </Button>
                    </FormikForm>
                )}
            </Formik>
        </AuthLayout>
    );
};

export default Register;
