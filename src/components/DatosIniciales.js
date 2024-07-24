// src/components/DatosIniciales.js

import React from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { differenceInYears, isValid } from 'date-fns';
import { saveData } from '../services/firebaseService';
import FormGroup from './FormGroup';
import { datosInicialesValidationSchema } from '../utils/validationSchemas';

/**
 * Componente principal para los datos iniciales.
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} props.formData - Los datos del formulario.
 * @param {Function} props.setFormData - La función para actualizar los datos del formulario.
 */
function DatosIniciales({ formData, setFormData }) {
    const navigate = useNavigate();

    const initialValues = formData;

    const handleSubmit = async (values, { setSubmitting }) => {
        const fechaNacimiento = new Date(values.fechaNacimientoAlumno);
        const edadAlumno = isValid(fechaNacimiento) ? differenceInYears(new Date(), fechaNacimiento) : 0;

        const dataToSave = { ...values, edadAlumno };
        setFormData(dataToSave);
        try {
            await saveData('datosIniciales', dataToSave);
            Swal.fire({
                icon: 'success',
                title: 'Datos almacenados correctamente',
                text: 'Por favor, no actualice la página',
                showConfirmButton: false,
                timer: 1500
            });
            setSubmitting(false);
            navigate('/aviso-privacidad');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al guardar los datos',
                text: 'Ocurrió un problema al guardar la información.'
            });
            console.error('Error al guardar los datos:', error);
            setSubmitting(false);
        }
    };

    return (
        <div className="p-3 mb-4 bg-light rounded">
            <h1 className="mt-5">Datos iniciales</h1>
            <p>Ingresa los datos iniciales para generar tus documentos. Llena correctamente cada campo, ya que el documento se generará según la información ingresada. Por motivos de privacidad, no guardamos la información más que temporalmente, así que evita actualizar la página mientras completas tus datos. Gracias.</p>
            <Formik
                initialValues={initialValues}
                validationSchema={datosInicialesValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, isSubmitting, errors, touched }) => (
                    <Form>
                        <div className="p-3 mb-4 bg-white border rounded">
                            <h2 className="mt-4">Datos del alumno</h2>
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
                        <div className="p-3 mb-4 bg-white border rounded">
                            <h2 className="mt-4">Datos del responsable legal del alumno</h2>
                            <FormGroup name="apellidosResponsable" label="Apellidos del responsable legal del alumno" required />
                            <FormGroup name="nombresResponsable" label="Nombre(s) del responsable legal del alumno" required />
                            <FormGroup name="telefonoContacto" label="Teléfono de contacto" type="tel" required helperText="Es posible que nos contactemos a este número vía WhatsApp para dar seguimiento a esta información." />
                            <FormGroup name="emailContacto" label="Email de contacto" type="email" required helperText="Es posible que nos comuniquemos a este correo para dar seguimiento a esta información." />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Guardar y continuar</button>
                        {Object.keys(errors).length > 0 && touched && (
                            <div className="alert alert-danger mt-3">
                                Por favor, completa todos los campos obligatorios.
                            </div>
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default DatosIniciales;
