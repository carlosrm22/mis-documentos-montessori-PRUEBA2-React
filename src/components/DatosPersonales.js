// src/components/DatosPersonales.js

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { datosPersonalesValidationSchema } from '../utils/validationSchemas';
import FormGroup from './FormGroup';
import { Button } from 'react-bootstrap';

/**
 * Componente para los datos personales del alumno y los padres.
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} props.formData - Los datos del formulario.
 * @param {Function} props.setFormData - La función para actualizar los datos del formulario.
 */
function DatosPersonales({ formData, setFormData }) {
    /**
     * Maneja los cambios en los campos del formulario.
     * @param {Object} e - El evento de cambio.
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div className="container mt-5">
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
                onSubmit={(values) => setFormData(values)}
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
                        <Button type="submit" disabled={isSubmitting}>Guardar</Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default DatosPersonales;
