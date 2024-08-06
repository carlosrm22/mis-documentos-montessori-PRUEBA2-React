import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form as BootstrapForm } from 'react-bootstrap';
import { register } from '../../services/firebaseService';
import { mostrarAlertaRegistroExitoso, mostrarAlertaErrorRegistro } from '../../utils/sweetAlertUtils';
import AuthLayout from '../Layout/AuthLayout';
import { useGlobalDispatch, useGlobalState } from '../../utils/GlobalState';
import { Formik, Field, ErrorMessage, Form as FormikForm } from 'formik';
import { registroValidationSchema } from '../../utils/validationSchemas';

/**
 * Componente de registro de usuarios.
 * Proporciona un formulario para que los usuarios se registren en la aplicación.
 */
const Register = () => {
    const navigate = useNavigate();
    const dispatch = useGlobalDispatch();
/* The line `const { user } = useGlobalState();` is using object destructuring to extract the `user`
property from the object returned by the `useGlobalState()` hook. */
    const { user } = useGlobalState();

    /**
     * Maneja el envío del formulario de registro.
     *
     * @param {Object} values - Los valores del formulario.
     * @param {Object} actions - Las acciones de Formik.
     */
    const handleRegister = async (values, { setSubmitting }) => {
        console.log('Attempting to register with values:', values);
        if (values.password !== values.confirmPassword) {
            mostrarAlertaErrorRegistro('Las contraseñas no coinciden');
            setSubmitting(false);
            return;
        }
        try {
            const user = await register(values.email, values.password);
            console.log('User registered:', user);
            dispatch({ type: 'SET_USER', payload: user });
            mostrarAlertaRegistroExitoso();
            console.log('Navigating to /datos-iniciales');
            navigate('/datos-iniciales');
        } catch (error) {
            console.error('Error during registration:', error);
            mostrarAlertaErrorRegistro(error.message);
        }
        setSubmitting(false);
    };

    // useEffect para redirigir al usuario si ya está registrado y logueado
    React.useEffect(() => {
        if (user) {
            console.log('User already logged in, redirecting to /datos-iniciales');
            navigate('/datos-iniciales');
        }
    }, [user, navigate]);

    /**
     * Formulario de registro.
     */
    const registerForm = (
        <>
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
        </>
    );

    return <AuthLayout>{registerForm}</AuthLayout>;
};

export default Register;
