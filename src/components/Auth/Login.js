import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form as BootstrapForm } from 'react-bootstrap';
import { login } from '../../services/firebaseService';
import { mostrarAlertaLoginExitoso, mostrarAlertaErrorLogin } from '../../utils/sweetAlertUtils';
import AuthLayout from '../Layout/AuthLayout';
import { useGlobalDispatch } from '../../utils/GlobalState';
import { Formik, Field, ErrorMessage, Form as FormikForm } from 'formik';
import { loginValidationSchema } from '../../utils/validationSchemas';

/**
 * Componente de inicio de sesión.
 * Proporciona un formulario para que los usuarios inicien sesión en la aplicación.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {Function} [props.onSuccess] - Callback que se llama después de un inicio de sesión exitoso.
 * @param {boolean} [props.useLayout=true] - Determina si se debe usar el layout de autenticación.
 * @param {boolean} [props.showTitle=true] - Determina si se debe mostrar el título.
 */
const Login = ({ onSuccess, useLayout = true, showTitle = true }) => {
    const navigate = useNavigate();
    const dispatch = useGlobalDispatch();

    /**
     * Maneja el envío del formulario de inicio de sesión.
     *
     * @param {Object} values - Los valores del formulario.
     * @param {Object} actions - Las acciones de Formik.
     */
    const handleLogin = async (values, { setSubmitting }) => {
        console.log('Handle login called with values:', values);
        try {
            const user = await login(values.email, values.password);
            console.log('User logged in:', user);
            dispatch({ type: 'SET_USER', payload: user });
            mostrarAlertaLoginExitoso();

            // Redirigir al dashboard o a datos iniciales después del inicio de sesión
            navigate('/dashboard');
        } catch (error) {
            console.error('Error during login:', error);
            mostrarAlertaErrorLogin(navigate);
        } finally {
            setSubmitting(false);
        }
    };

    /**
     * Formulario de inicio de sesión.
     */
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
