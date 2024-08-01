// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { register } from '../services/firebaseService';
import Swal from 'sweetalert2';
import AuthLayout from './AuthLayout';
import { useGlobalDispatch } from '../utils/GlobalState';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email no válido').required('Email es requerido'),
    password: Yup.string().required('Contraseña es requerida'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir').required('Confirmar contraseña es requerido')
});

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useGlobalDispatch();

    const handleRegister = async (values, { setSubmitting }) => {
        if (values.password !== values.confirmPassword) {
            Swal.fire('Las contraseñas no coinciden', '', 'error');
            return;
        }
        try {
            const user = await register(values.email, values.password);
            dispatch({ type: 'SET_USER', payload: user });
            Swal.fire('Registro exitoso', '', 'success');
            navigate('/datos-iniciales');
        } catch (error) {
            Swal.fire('Error al registrarse', error.message, 'error');
        }
        setSubmitting(false);
    };

    return (
        <AuthLayout>
            <h1 className="text-center mb-4">Registrarse</h1>
            <Formik
                initialValues={{ email: '', password: '', confirmPassword: '' }}
                validationSchema={validationSchema}
                onSubmit={handleRegister}
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
                        <Form.Group controlId="formBasicConfirmPassword" className="mb-3">
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
