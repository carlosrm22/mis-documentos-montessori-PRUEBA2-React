import React, { useEffect, useCallback } from 'react';
import { Formik, Form } from 'formik';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { datosPersonalesValidationSchema } from '../utils/validationSchemas';
import FormGroup from '../components/Forms/FormGroup';
import { useGlobalState, useGlobalDispatch } from '../utils/GlobalState';
import { cargarDatosIniciales } from '../utils/dataUtils';
import useAuth from '../utils/hooks/useAuth';
import withAuth from '../hoc/withAuth';
import { useNavigate } from 'react-router-dom';

const DatosPersonales = React.memo(() => {
    const { formData, user, authLoading, loading } = useGlobalState();
    const dispatch = useGlobalDispatch();
    const navigate = useNavigate();

    useAuth(); // Asegurarnos de que el estado de autenticación se maneje

    const fetchData = useCallback(async () => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            const data = await cargarDatosIniciales(dispatch);
            if (data) {
                dispatch({ type: 'SET_FORM_DATA', payload: data });
            } else {
                console.log('No se encontraron datos iniciales');
            }
            dispatch({ type: 'SET_LOADING', payload: false });
        } catch (error) {
            dispatch({ type: 'SET_LOADING', payload: false });
            console.error("Error fetching initial data:", error);
            dispatch({ type: 'SET_FORM_DATA', payload: { error: error.message } });
        }
    }, [dispatch]);

    useEffect(() => {
        if (!authLoading && user) {
            fetchData();
        } else if (!authLoading && !user) {
            navigate('/login');
        }
    }, [fetchData, user, authLoading, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({
            type: 'SET_FORM_DATA',
            payload: {
                ...formData,
                [name]: value
            }
        });
    };

    if (authLoading || loading) {
        return <div>Cargando datos...</div>;
    }

    if (formData?.error) {
        return <div>Error: {formData.error}</div>;
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={10}>
                    <Card className="shadow-lg p-4 bg-body-tertiary rounded">
                        <Card.Body>
                            <h1>Escuela Montessori Kalpilli</h1>
                            <h2>DATOS GENERALES DE LOS PADRES DE FAMILIA Y ALUMNO:</h2>
                            <h3>Ciclo Escolar 2024 – 2025</h3>
                            <p>Bajo protesta de decir verdad, manifestamos que los datos proporcionados son verídicos y actuales y que dicha
                                información se proporciona de manera libre. Los datos e información aquí asentados se encuentran relacionados
                                con el aviso de privacidad que me ha sido dado a conocer previamente, mismo que de forma separada he
                                firmado para constancia y aceptación:</p>
                            <Formik
                                initialValues={formData}
                                validationSchema={datosPersonalesValidationSchema}
                                onSubmit={(values) => {
                                    dispatch({ type: 'SET_FORM_DATA', payload: values });
                                }}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <FormGroup name="nombresAlumno" label="Nombre completo del alumno(a)" type="text" value={formData.nombresAlumno} handleChange={handleChange} required />
                                        <FormGroup name="apellidosAlumno" label="Apellidos del alumno" type="text" value={formData.apellidosAlumno} handleChange={handleChange} required />
                                        <FormGroup name="edadAlumno" label="Edad" type="text" value={formData.edadAlumno} readOnly />
                                        <FormGroup name="lugarNacimientoAlumno" label="Lugar de nacimiento" type="text" value={formData.lugarNacimientoAlumno} handleChange={handleChange} required />
                                        <FormGroup name="nombresMadre" label="Nombre(s) de la madre o tutor" type="text" value={formData.nombresMadre} handleChange={handleChange} required />
                                        <FormGroup name="apellidosMadre" label="Apellidos de la madre o tutor" type="text" value={formData.apellidosMadre} handleChange={handleChange} required />
                                        <FormGroup name="nombresPadre" label="Nombre(s) del padre o tutor" type="text" value={formData.nombresPadre} handleChange={handleChange} required />
                                        <FormGroup name="apellidosPadre" label="Apellidos del padre o tutor" type="text" value={formData.apellidosPadre} handleChange={handleChange} required />
                                        <FormGroup name="domicilioPadres" label="Domicilio particular de los padres o tutores" type="text" value={formData.domicilioPadres} handleChange={handleChange} required />
                                        <Button type="submit" disabled={isSubmitting} className="mt-3">Guardar</Button>
                                    </Form>
                                )}
                            </Formik>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
});

export default withAuth(DatosPersonales);
