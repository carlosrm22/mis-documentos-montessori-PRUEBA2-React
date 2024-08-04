import React from 'react';
import { Formik, Form as FormikForm } from 'formik';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { datosInicialesValidationSchema } from '../utils/validationSchemas';
import { handleGuardarDatos } from '../utils/sweetAlertUtils';
import useInitialData from '../utils/useInitialData';
import { useGlobalDispatch } from '../utils/GlobalState';
import { useNavigate } from 'react-router-dom';
import useLoading from '../utils/useLoading';
import DatosAlumno from './DatosAlumno';
import DatosResponsable from './DatosResponsable';

const DatosIniciales = React.memo(() => {
    const { formData, authLoading } = useInitialData();
    const dispatch = useGlobalDispatch();
    const navigate = useNavigate();
    const setLoading = useLoading();

    console.log("formData:", formData);

    if (authLoading) {
        return <div>Cargando...</div>;
    }

    const isReadOnly = formData && Object.keys(formData).length > 0 && formData.nombresAlumno !== '';

    console.log("isReadOnly:", isReadOnly);

    return (
        <Container fluid className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
            <Row className="w-auto text-center mb-3 justify-content-center">
                <Col className="mx-auto">
                    <h1 className="mb-3">Datos Iniciales del Alumno</h1>
                    <p className="alert alert-info w-100 text-center mx-auto">
                        Ingresa los datos iniciales para generar tus documentos. Llena correctamente cada campo, ya que el documento se generará según la información ingresada.
                    </p>
                </Col>
            </Row>
            <Row className="w-100 justify-content-center">
                <Col md={10}>
                    <Card className="shadow-lg p-0 p-sm-0 p-md-2 p-lg-3 p-xl-4 p-xxl-5 bg-body-tertiary rounded">
                        <Card.Body>
                            <Formik
                                initialValues={{
                                    nivelEducativo: formData?.nivelEducativo || '',
                                    apellidosAlumno: formData?.apellidosAlumno || '',
                                    nombresAlumno: formData?.nombresAlumno || '',
                                    fechaNacimientoAlumno: formData?.fechaNacimientoAlumno || '',
                                    edadAlumno: formData?.edadAlumno || 0,
                                    curpAlumno: formData?.curpAlumno || '',
                                    apellidosResponsable: formData?.apellidosResponsable || '',
                                    nombresResponsable: formData?.nombresResponsable || '',
                                    telefonoContacto: formData?.telefonoContacto || '',
                                    emailContacto: formData?.emailContacto || ''
                                }}
                                validationSchema={datosInicialesValidationSchema}
                                onSubmit={(values, { setSubmitting }) => {
                                    setLoading(true); // Inicia la carga
                                    handleGuardarDatos(values, data => {
                                        dispatch({ type: 'SET_FORM_DATA', payload: data });
                                        setLoading(false); // Termina la carga
                                        navigate('/next-page'); // Navega a la siguiente página después de guardar
                                    }, setSubmitting, navigate, setLoading);
                                }}
                                enableReinitialize
                            >
                                {({ values, isSubmitting, handleChange, setFieldValue, errors, touched }) => (
                                    <FormikForm>
                                        <Row>
                                            <Col md={6}>
                                                <DatosAlumno
                                                    values={values}
                                                    handleChange={handleChange}
                                                    setFieldValue={setFieldValue}
                                                    isReadOnly={isReadOnly}
                                                />
                                            </Col>
                                            <Col md={6}>
                                                <DatosResponsable
                                                    handleChange={handleChange}
                                                    isReadOnly={isReadOnly}
                                                />
                                            </Col>
                                        </Row>
                                        {!isReadOnly && (
                                            <Button variant="primary" type="submit" className="w-100 mt-3" disabled={isSubmitting}>Guardar y continuar</Button>
                                        )}
                                        {Object.keys(errors).length > 0 && touched && (
                                            <div className="alert alert-danger mt-3">
                                                Por favor, completa todos los campos obligatorios.
                                            </div>
                                        )}
                                    </FormikForm>
                                )}
                            </Formik>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
});

export default DatosIniciales;
