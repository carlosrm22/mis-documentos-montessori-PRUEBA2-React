import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { Form as BootstrapForm } from 'react-bootstrap';
import FormGroup from './FormGroup';
import { calculateAge } from '../utils/dateUtils';

const DatosAlumno = ({ values, handleChange, setFieldValue, isReadOnly }) => (
    <div className="p-3 mb-4 bg-white border rounded">
        <h2 className="mt-4">Datos del alumno</h2>
        <BootstrapForm.Group controlId="nivelEducativo" className="mb-3">
            <BootstrapForm.Label>Nivel Educativo</BootstrapForm.Label>
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
        </BootstrapForm.Group>
        <FormGroup name="apellidosAlumno" label="Apellidos del alumno" required readOnly={isReadOnly} onChange={handleChange} value={values.apellidosAlumno} />
        <FormGroup name="nombresAlumno" label="Nombre(s) del alumno" required readOnly={isReadOnly} onChange={handleChange} value={values.nombresAlumno} />
        <FormGroup name="fechaNacimientoAlumno" label="Fecha de nacimiento del alumno" type="date" required readOnly={isReadOnly} onChange={(e) => {
            handleChange(e);
            const fecha = new Date(e.target.value);
            setFieldValue('edadAlumno', calculateAge(fecha));
        }} value={values.fechaNacimientoAlumno} />
        <FormGroup name="edadAlumno" label="Edad del alumno" type="number" value={values.edadAlumno} readOnly />
        <FormGroup name="curpAlumno" label="CURP del alumno" required readOnly={isReadOnly} onChange={handleChange} value={values.curpAlumno} />
        <div>
            <a href="https://consultas.curp.gob.mx/CurpSP/renapo/inicio2020.jsp" target="_blank" rel="noopener noreferrer">
                Consulta tu CURP aquí
            </a>
        </div>
    </div>
);

export default DatosAlumno;
