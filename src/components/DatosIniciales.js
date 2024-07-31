// src/components/DatosIniciales.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { differenceInYears, isValid } from 'date-fns';
import { saveData, getDatosIniciales } from '../services/firebaseService';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import FormGroup from './FormGroup';
import { datosInicialesValidationSchema } from '../utils/validationSchemas';
import Swal from 'sweetalert2';

/**
 * Componente principal para los datos iniciales.
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} props.formData - Los datos del formulario.
 * @param {Function} props.setFormData - La función para actualizar los datos del formulario.
 */
const DatosIniciales = ({ formData, setFormData }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDatosIniciales();
                if (data) {
                    setFormData(data);
                }
            } catch (error) {
                console.error("Error fetching initial data:", error);
            }
        };
        fetchData();
    }, [setFormData]);

    const handleSubmit = async (values, { setSubmitting }) => {
        const fechaNacimiento = new Date(values.fechaNacimientoAlumno);
        const edadAlumno = isValid(fechaNacimiento) ? differenceInYears(new Date(), fechaNacimiento) : 0;

        // Guardar solo la primera palabra del nivel educativo seleccionado
        const nivelEducativo = values.nivelEducativo.split(' ')[0];

        const dataToSave = { ...values, edadAlumno, nivelEducativo };
        setFormData(dataToSave);
        try {
            await saveData('datosIniciales', dataToSave);
            Swal.fire('Datos guardados exitosamente', '', 'success');
            setSubmitting(false);
            navigate('/aviso-privacidad'); // Navegar a AvisoPrivacidad
        } catch (error) {
            Swal.fire('Error al guardar los datos', error.message, 'error');
            console.error('Error al guardar los datos:', error);
            setSubmitting(false);
        }
    };

    return (
        <Container fluid className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
            <Row className="w-auto text-center mb-3 justify-content-center">
                <Col className="mx-auto">
                    <h1 className="mb-3 ">Datos Iniciales del Alumno</h1>
                    <p className="alert alert-info w-100 text-center mx-auto ">
                        Ingresa los datos iniciales para generar tus documentos. Llena correctamente cada campo, ya que el documento se generará según la información ingresada.
                    </p>
                </Col>
            </Row>
            <Row className="w-100 justify-content-center">
                <Col md={10}>
                    <Card className="shadow-lg p-0 p-sm-0 p-md-2 p-lg-3 p-xl-4 p-xxl-5 bg-body-tertiary rounded">
                        <Card.Body>
                            <Formik
                                initialValues={formData}
                                validationSchema={datosInicialesValidationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ values, isSubmitting, errors, touched }) => (
                                    <Form>
                                        <Row>
                                            <Col md={6}>
                                                <div className="p-3 mb-4 bg-white border rounded">
                                                    <h2 className="mt-4">Datos del alumno</h2>
                                                    <div className="mb-3">
                                                        <label htmlFor="nivelEducativo" className="form-label">Nivel Educativo</label>
                                                        <select
                                                            id="nivelEducativo"
                                                            name="nivelEducativo"
                                                            className="form-select"
                                                            value={values.nivelEducativo}
                                                            onChange={(e) => setFormData({ ...values, nivelEducativo: e.target.value })}
                                                            required
                                                        >
                                                            <option value="">Selecciona el nivel educativo</option>
                                                            <option value="Maternal (Nido & Casa de Niños)">Maternal (Nido & Casa de Niños)</option>
                                                            <option value="Preescolar (Casa de niños)">Preescolar (Casa de niños)</option>
                                                            <option value="Primaria (Taller)">Primaria (Taller)</option>
                                                        </select>
                                                    </div>
                                                    <FormGroup name="apellidosAlumno" label="Apellidos del alumno" required />
                                                    <FormGroup name="nombresAlumno" label="Nombre(s) del alumno" required />
                                                    <FormGroup name="fechaNacimientoAlumno" label="Fecha de nacimiento del alumno" type="date" required />
                                                    <FormGroup name="edadAlumno" label="Edad del alumno" type="number" value={isValid(new Date(values.fechaNacimientoAlumno)) ? differenceInYears(new Date(), new Date(values.fechaNacimientoAlumno)) : 0} readOnly />
                                                    <FormGroup name="curpAlumno" label="CURP del alumno" required />
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
                                                    <FormGroup name="apellidosResponsable" label="Apellidos del responsable legal del alumno" required />
                                                    <FormGroup name="nombresResponsable" label="Nombre(s) del responsable legal del alumno" required />
                                                    <FormGroup name="telefonoContacto" label="Teléfono de contacto" type="tel" required helperText="Es posible que nos contactemos a este número vía WhatsApp para dar seguimiento a esta información." />
                                                    <FormGroup name="emailContacto" label="Email de contacto" type="email" required helperText="Es posible que nos comuniquemos a este correo para dar seguimiento a esta información." />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Button variant="primary" type="submit" className="w-100 mt-3" disabled={isSubmitting}>Guardar y continuar</Button>
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
