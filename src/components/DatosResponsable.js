import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import FormGroup from './FormGroup';

const DatosResponsable = ({ values, handleChange, isReadOnly }) => (
    <Container className="p-3 mb-4 bg-white border rounded">
        <Row className="mb-3">
            <Col>
                <h2 className="mt-4">Datos del responsable legal del alumno</h2>
            </Col>
        </Row>
        <Row>
            <Col>
                <FormGroup name="apellidosResponsable" label="Apellidos del responsable legal del alumno" required readOnly={isReadOnly} onChange={handleChange} value={values.apellidosResponsable} />
            </Col>
        </Row>
        <Row>
            <Col>
                <FormGroup name="nombresResponsable" label="Nombre(s) del responsable legal del alumno" required readOnly={isReadOnly} onChange={handleChange} value={values.nombresResponsable} />
            </Col>
        </Row>
        <Row>
            <Col>
                <FormGroup name="telefonoContacto" label="Teléfono de contacto" type="tel" required readOnly={isReadOnly} helperText="Es posible que nos contactemos a este número vía WhatsApp para dar seguimiento a esta información." onChange={handleChange} value={values.telefonoContacto} />
            </Col>
        </Row>
        <Row>
            <Col>
                <FormGroup name="emailContacto" label="Email de contacto" type="email" required readOnly={isReadOnly} helperText="Es posible que nos comuniquemos a este correo para dar seguimiento a esta información." onChange={handleChange} value={values.emailContacto} />
            </Col>
        </Row>
    </Container>
);

export default DatosResponsable;
