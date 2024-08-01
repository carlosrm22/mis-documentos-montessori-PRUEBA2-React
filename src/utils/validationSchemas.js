// src/utils/validationSchemas.js
import * as Yup from 'yup';

export const datosInicialesValidationSchema = Yup.object().shape({
    nivelEducativo: Yup.string().required('Nivel educativo es requerido'),
    apellidosAlumno: Yup.string().required('Apellidos del alumno son requeridos'),
    nombresAlumno: Yup.string().required('Nombres del alumno son requeridos'),
    fechaNacimientoAlumno: Yup.date().required('Fecha de nacimiento es requerida'),
    edadAlumno: Yup.number().required('Edad del alumno es requerida').min(0, 'Edad no puede ser negativa'),
    curpAlumno: Yup.string().required('CURP del alumno es requerida'),
    apellidosResponsable: Yup.string().required('Apellidos del responsable son requeridos'),
    nombresResponsable: Yup.string().required('Nombres del responsable son requeridos'),
    telefonoContacto: Yup.string().required('Teléfono de contacto es requerido'),
    emailContacto: Yup.string().email('Email no es válido').required('Email de contacto es requerido'),
});
