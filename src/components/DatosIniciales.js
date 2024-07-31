import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { getDatosIniciales } from '../services/firebaseService';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import FormGroup from './FormGroup';
import { datosInicialesValidationSchema } from '../utils/validationSchemas';
import { handleGuardarDatos } from '../utils/sweetAlertUtils';
import { useGlobalState, useGlobalDispatch } from '../utils/GlobalState';
import Swal from 'sweetalert2';
import { useLoading } from '../utils/LoadingContext';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../utils/firebaseConfig';
import { calculateAge } from '../utils/dateUtils';

/**
 * Componente principal para los datos iniciales.
 */
const DatosIniciales = () => {
    const navigate = useNavigate();
    const { formData } = useGlobalState();
    const dispatch = useGlobalDispatch();
    const { setLoading } = useLoading();
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if (loading) {
            return; // Muestra un spinner o algo similar mientras se carga la autenticación
        }
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchData = async () => {
            try {
                const data = await getDatosIniciales();
                if (data) {
                    dispatch({ type: 'SET_FORM_DATA', payload: data });
                } else {
                    console.log('No se encontraron datos iniciales');
                }
            } catch (error) {
                console.error("Error fetching initial data:", error);
                Swal.fire('Error al cargar datos iniciales', error.message, 'error');
            }
        };
        fetchData();
    }, [dispatch, navigate, user, loading]);

    if (loading) {
        return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se verifica la autenticación
    }

    // Solo leer si ya hay datos guardados en formData y no están vacíos
    const isReadOnly = formData && Object.keys(formData).length > 0 && formData.nombresAlumno !== '';

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
                                onSubmit={(values, { setSubmitting }) => handleGuardarDatos(values, data => dispatch({ type: 'SET_FORM_DATA', payload: data }), setSubmitting, navigate, setLoading)}
                                enableReinitialize
                            >
                                {({ values, isSubmitting, errors, touched, handleChange, setFieldValue }) => (
                                    <Form>
                                        <Row>
                                            <Col md={6}>
                                                <div className="p-3 mb-4 bg-white border rounded">
                                                    <h2 className="mt-4">Datos del alumno</h2>
                                                    <div className="mb-3">
                                                        <label htmlFor="nivelEducativo" className="form-label">Nivel Educativo</label>
                                                        <Field
                                                            as="select"
                                                            id="nivelEducativo"
                                                            name="nivelEducativo"
                                                            className="form-select"
                                                            value={values.nivelEducativo}
                                                            onChange={handleChange}
                                                            disabled={isReadOnly}
                                                            required
                                                        >
                                                            <option value="">Selecciona el nivel educativo</option>
                                                            <option value="Maternal (Nido & Casa de Niños)">Maternal (Nido & Casa de Niños)</option>
                                                            <option value="Preescolar (Casa de niños)">Preescolar (Casa de niños)</option>
                                                            <option value="Primaria (Taller)">Primaria (Taller)</option>
                                                        </Field>
                                                    </div>
                                                    <FormGroup name="apellidosAlumno" label="Apellidos del alumno" required readOnly={isReadOnly} />
                                                    <FormGroup name="nombresAlumno" label="Nombre(s) del alumno" required readOnly={isReadOnly} />
                                                    <FormGroup name="fechaNacimientoAlumno" label="Fecha de nacimiento del alumno" type="date" required readOnly={isReadOnly} onChange={(e) => {
                                                        handleChange(e);
                                                        setFieldValue('edadAlumno', calculateAge(new Date(e.target.value)));
                                                    }} />
                                                    <FormGroup name="edadAlumno" label="Edad del alumno" type="number" value={values.edadAlumno} readOnly />
                                                    <FormGroup name="curpAlumno" label="CURP del alumno" required readOnly={isReadOnly} />
                                                    <div>
                                                        <a href="https://consultas.curp.gob.mx/CurpSP/renapo/inicio2020.jsp" target="_blank" rel="noopener noreferrer">
                                                            Consulta tu CURP aquí
                                                        </a>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className="p-3 mb-4 bg-white border rounded">
                                                    <h2 className="mt-4">Datos del responsable legal del alumno</h2>
                                                    <FormGroup name="apellidosResponsable" label="Apellidos del responsable legal del alumno" required readOnly={isReadOnly} />
                                                    <FormGroup name="nombresResponsable" label="Nombre(s) del responsable legal del alumno" required readOnly={isReadOnly} />
                                                    <FormGroup name="telefonoContacto" label="Teléfono de contacto" type="tel" required readOnly={isReadOnly} helperText="Es posible que nos contactemos a este número vía WhatsApp para dar seguimiento a esta información." />
                                                    <FormGroup name="emailContacto" label="Email de contacto" type="email" required readOnly={isReadOnly} helperText="Es posible que nos comuniquemos a este correo para dar seguimiento a esta información." />
                                                </div>
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
                                    </Form>
                                )}
                            </Formik>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default DatosIniciales;
