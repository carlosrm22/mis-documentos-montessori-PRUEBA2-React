// src/utils/validationSchemas.js

import * as yup from 'yup';

// Función para generar la CURP base
const generarCurpBase = ({ apellidosAlumno, nombresAlumno, fechaNacimientoAlumno }) => {
    const nombre = nombresAlumno.trim().toUpperCase();
    const [primerNombre] = nombre.split(' '); // En caso de que haya más de un nombre
    const apellidos = apellidosAlumno.trim().toUpperCase().split(' ');
    const apellidoPaterno = apellidos[0] || '';
    const apellidoMaterno = apellidos[1] || '';
    const fechaNacimiento = new Date(fechaNacimientoAlumno);
    const año = fechaNacimiento.getFullYear().toString().slice(-2);
    const mes = (fechaNacimiento.getMonth() + 1).toString().padStart(2, '0');
    const día = fechaNacimiento.getDate().toString().padStart(2, '0');

    return (
        apellidoPaterno[0] +
        apellidoPaterno.slice(1).replace(/[^AEIOU]/g, '')[0] +
        apellidoMaterno[0] +
        primerNombre[0] +
        año +
        mes +
        día
    );
};

// Esquema de validación para los datos iniciales
export const datosInicialesValidationSchema = yup.object().shape({
    apellidosAlumno: yup.string().required('Los apellidos del alumno son requeridos'),
    nombresAlumno: yup.string().required('El nombre del alumno es requerido'),
    fechaNacimientoAlumno: yup.date()
        .max(new Date(), "La fecha de nacimiento no puede ser en el futuro")
        .min(new Date(new Date().setFullYear(new Date().getFullYear() - 160)), "La edad del alumno no puede ser mayor a 160 años")
        .required('La fecha de nacimiento es requerida'),
    curpAlumno: yup.string().length(18, 'La CURP debe tener 18 caracteres').required('La CURP del alumno es requerida')
        .test('valid-curp', 'La CURP no es válida', function (value) {
            const { apellidosAlumno, nombresAlumno, fechaNacimientoAlumno } = this.parent;
            const curpBase = generarCurpBase({ apellidosAlumno, nombresAlumno, fechaNacimientoAlumno });
            return value.startsWith(curpBase);
        }),
    apellidosResponsable: yup.string().required('Los apellidos del responsable son requeridos'),
    nombresResponsable: yup.string().required('El nombre del responsable es requerido'),
    telefonoContacto: yup.string().required('El teléfono de contacto es requerido'),
    emailContacto: yup.string().email('El email debe ser válido').required('El email de contacto es requerido')
});
