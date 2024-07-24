// src/components/DatosIniciales.js

import React from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

/**
 * Componente principal para los datos iniciales.
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} props.formData - Los datos del formulario.
 * @param {Function} props.setFormData - La función para actualizar los datos del formulario.
 */
function DatosIniciales({ formData, setFormData }) {
    const navigate = useNavigate();

    const initialValues = formData;

    const validationSchema = Yup.object().shape({
        apellidosAlumno: Yup.string().required('Requerido'),
        nombresAlumno: Yup.string().required('Requerido'),
        fechaNacimientoAlumno: Yup.date().required('Requerido'),
        curpAlumno: Yup.string().required('Requerido'),
        apellidosResponsable: Yup.string().required('Requerido'),
        nombresResponsable: Yup.string().required('Requerido'),
        telefonoContacto: Yup.string().required('Requerido'),
        emailContacto: Yup.string().email('Email inválido').required('Requerido')
    });

    const handleSubmit = async (values) => {
        setFormData(values);
        try {
            await addDoc(collection(db, 'datosIniciales'), values);
            console.log('Datos guardados exitosamente');
            mostrarAlerta('success', 'Datos almacenados correctamente', 'Por favor, no actualice la página', false, 1500);
            navigate('/aviso-privacidad');
        } catch (error) {
            console.error('Error guardando datos:', error);
            mostrarAlerta('error', 'Error al guardar los datos', 'Ocurrió un problema al guardar la información.');
        }
    };

    const mostrarAlerta = (icon, title, text, showConfirmButton = true, timer = null) => {
        Swal.fire({
            icon,
            title,
            text,
            showConfirmButton,
            timer
        });
    };

    return (
        <div className="p-3 mb-4 bg-light rounded">
            <h1 className="mt-5">Datos iniciales</h1>
            <p>Ingresa los datos iniciales para generar tus documentos. Llena correctamente cada campo, ya que el documento se generará según la información ingresada. Por motivos de privacidad, no guardamos la información más que temporalmente, así que evita actualizar la página mientras completas tus datos. Gracias.</p>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, handleChange }) => (
                    <Form>
                        <div className="p-3 mb-4 bg-white border rounded">
                            <h2 className="mt-4">Datos del alumno</h2>
                            <div className="form-group">
                                <label htmlFor="apellidosAlumno">Apellidos del alumno: <span className="text-danger">*</span></label>
                                <Field type="text" name="apellidosAlumno" className="form-control" />
                                <ErrorMessage name="apellidosAlumno" component="div" className="text-danger" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="nombresAlumno">Nombre(s) del alumno: <span className="text-danger">*</span></label>
                                <Field type="text" name="nombresAlumno" className="form-control" />
                                <ErrorMessage name="nombresAlumno" component="div" className="text-danger" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="fechaNacimientoAlumno">Fecha de nacimiento del alumno: <span className="text-danger">*</span></label>
                                <Field type="date" name="fechaNacimientoAlumno" className="form-control" />
                                <ErrorMessage name="fechaNacimientoAlumno" component="div" className="text-danger" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="curpAlumno">CURP del alumno: <span className="text-danger">*</span></label>
                                <Field type="text" name="curpAlumno" className="form-control" />
                                <ErrorMessage name="curpAlumno" component="div" className="text-danger" />
                            </div>
                        </div>
                        <div className="p-3 mb-4 bg-white border rounded">
                            <h2 className="mt-4">Datos del responsable legal del alumno</h2>
                            <div className="form-group">
                                <label htmlFor="apellidosResponsable">Apellidos del responsable legal del alumno: <span className="text-danger">*</span></label>
                                <Field type="text" name="apellidosResponsable" className="form-control" />
                                <ErrorMessage name="apellidosResponsable" component="div" className="text-danger" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="nombresResponsable">Nombre(s) del responsable legal del alumno: <span className="text-danger">*</span></label>
                                <Field type="text" name="nombresResponsable" className="form-control" />
                                <ErrorMessage name="nombresResponsable" component="div" className="text-danger" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="telefonoContacto">Teléfono de contacto: <span className="text-danger">*</span></label>
                                <Field type="tel" name="telefonoContacto" className="form-control" />
                                <ErrorMessage name="telefonoContacto" component="div" className="text-danger" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="emailContacto">Email de contacto: <span className="text-danger">*</span></label>
                                <Field type="email" name="emailContacto" className="form-control" />
                                <ErrorMessage name="emailContacto" component="div" className="text-danger" />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Guardar y continuar</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default DatosIniciales;
