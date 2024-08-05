import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { Form as BootstrapForm, Container, Row, Col, Card, FormGroup as BootstrapFormGroup, FormLabel, FormControl } from 'react-bootstrap';
import FormGroup from './FormGroup';
import { calculateAge } from '../utils/dateUtils';

const DatosAlumno = ({ values, handleChange, setFieldValue, isReadOnly }) => (
    <Container className="p-3 mb-4 bg-white border rounded">
        <Row className="mb-3">
            <Col>
                <h2 className="mt-4">Datos del alumno</h2>
            </Col>
        </Row>
        <Row>
            <Col>
                <BootstrapFormGroup controlId="nivelEducativo" className="mb-3">
                    <FormLabel>Nivel Educativo</FormLabel>
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
                    <ErrorMessage name="nivelEducativo" component="div" className="text-danger" />
                </BootstrapFormGroup>
            </Col>
        </Row>
        <Row>
            <Col>
                <FormGroup name="apellidosAlumno" label="Apellidos del alumno" required readOnly={isReadOnly} onChange={handleChange} value={values.apellidosAlumno} />
            </Col>
        </Row>
        <Row>
            <Col>
                <FormGroup name="nombresAlumno" label="Nombre(s) del alumno" required readOnly={isReadOnly} onChange={handleChange} value={values.nombresAlumno} />
            </Col>
        </Row>
        <Row>
            <Col>
                <FormGroup name="fechaNacimientoAlumno" label="Fecha de nacimiento del alumno" type="date" required readOnly={isReadOnly} onChange={(e) => {
                    handleChange(e);
                    const fecha = new Date(e.target.value);
                    setFieldValue('edadAlumno', calculateAge(fecha));
                }} value={values.fechaNacimientoAlumno} />
            </Col>
        </Row>
        <Row>
            <Col>
                <FormGroup name="edadAlumno" label="Edad del alumno" type="number" value={values.edadAlumno} readOnly />
            </Col>
        </Row>
        <Row>
            <Col>
                <FormGroup name="curpAlumno" label="CURP del alumno" required readOnly={isReadOnly} onChange={handleChange} value={values.curpAlumno} />
            </Col>
        </Row>
        <Row>
            <Col>
                <div>
                    <a href="https://consultas.curp.gob.mx/CurpSP/renapo/inicio2020.jsp" target="_blank" rel="noopener noreferrer">
                        Consulta tu CURP aquí
                    </a>
                </div>
            </Col>
        </Row>
    </Container>
);

export default DatosAlumno;
