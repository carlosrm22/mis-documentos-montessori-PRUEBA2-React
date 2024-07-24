// src/utils/validationSchemas.js
import * as Yup from 'yup';

export const datosInicialesValidationSchema = Yup.object().shape({
    apellidosAlumno: Yup.string().required('Requerido'),
    nombresAlumno: Yup.string().required('Requerido'),
    fechaNacimientoAlumno: Yup.date().required('Requerido'),
    curpAlumno: Yup.string().required('Requerido'),
    apellidosResponsable: Yup.string().required('Requerido'),
    nombresResponsable: Yup.string().required('Requerido'),
    telefonoContacto: Yup.string().required('Requerido'),
    emailContacto: Yup.string().email('Email inválido').required('Requerido')
});
