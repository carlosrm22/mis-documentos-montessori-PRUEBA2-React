// src/utils/validationSchemas.js

import * as yup from 'yup';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const isPhoneNumberValid = (value) => {
    if (!value) return false;
    const phoneNumber = parsePhoneNumberFromString(value, 'MX');
    return phoneNumber && phoneNumber.isValid();
};

// Esquema de validación para los datos iniciales
export const datosInicialesValidationSchema = yup.object().shape({
    apellidosAlumno: yup.string().required('Los apellidos del alumno son requeridos'),
    nombresAlumno: yup.string().required('El nombre del alumno es requerido'),
    fechaNacimientoAlumno: yup.date()
        .max(new Date(), "La fecha de nacimiento no puede ser en el futuro")
        .min(new Date(new Date().setFullYear(new Date().getFullYear() - 100)), "La edad del alumno no es válida")
        .required('La fecha de nacimiento es requerida'),
    curpAlumno: yup.string().matches(/^[A-Z0-9]{18}$/, 'La CURP no es válida').required('La CURP del alumno es requerida'),
    apellidosResponsable: yup.string().required('Los apellidos del responsable son requeridos'),
    nombresResponsable: yup.string().required('El nombre del responsable es requerido'),
    telefonoContacto: yup.string()
        .test('is-valid-phone', 'El teléfono de contacto no es válido', isPhoneNumberValid)
        .required('El teléfono de contacto es requerido'),
    emailContacto: yup.string()
        .email('El email debe ser válido')
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'El email debe tener un dominio válido')
        .required('El email de contacto es requerido')
});
