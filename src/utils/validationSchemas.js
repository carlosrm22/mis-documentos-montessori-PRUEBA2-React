// src/utils/validationSchemas.js

// Importa la librería Yup para la validación de esquemas
import * as Yup from 'yup';

// Define el esquema de validación para los datos iniciales del alumno
export const datosInicialesValidationSchema = Yup.object().shape({
    nivelEducativo: Yup.string().required('Nivel educativo es requerido'), // Campo requerido de tipo string
    apellidosAlumno: Yup.string().required('Apellidos del alumno son requeridos'), // Campo requerido de tipo string
    nombresAlumno: Yup.string().required('Nombres del alumno son requeridos'), // Campo requerido de tipo string
    fechaNacimientoAlumno: Yup.date().required('Fecha de nacimiento es requerida'), // Campo requerido de tipo fecha
    edadAlumno: Yup.number().required('Edad del alumno es requerida').min(0, 'Edad no puede ser negativa'), // Campo requerido de tipo número con valor mínimo de 0
    curpAlumno: Yup.string().required('CURP del alumno es requerida'), // Campo requerido de tipo string
    apellidosResponsable: Yup.string().required('Apellidos del responsable son requeridos'), // Campo requerido de tipo string
    nombresResponsable: Yup.string().required('Nombres del responsable son requeridos'), // Campo requerido de tipo string
    telefonoContacto: Yup.string().required('Teléfono de contacto es requerido'), // Campo requerido de tipo string
    emailContacto: Yup.string().email('Email no es válido').required('Email de contacto es requerido'), // Campo requerido de tipo string con validación de email
});

// Validación para inicio de sesión
export const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email('Email no válido').required('Email es requerido'), // Campo requerido de tipo string con validación de email
    password: Yup.string().required('Contraseña es requerida') // Campo requerido de tipo string
});

// Validación para registro de usuario
export const registroValidationSchema = Yup.object().shape({
    email: Yup.string().email('Email no válido').required('Email es requerido'), // Campo requerido de tipo string con validación de email
    password: Yup.string().required('Contraseña es requerida'), // Campo requerido de tipo string
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir').required('Confirmar contraseña es requerido') // Campo requerido de tipo string que debe coincidir con el campo password
});
