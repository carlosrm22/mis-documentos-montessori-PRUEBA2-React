import * as yup from 'yup';

export const datosInicialesValidationSchema = yup.object().shape({
    apellidosAlumno: yup.string().required('Este campo es obligatorio'),
    nombresAlumno: yup.string().required('Este campo es obligatorio'),
    fechaNacimientoAlumno: yup.date().required('Este campo es obligatorio').nullable(),
    curpAlumno: yup.string().matches(/^([A-Z]{4}\d{6}[A-Z]{6}\d{2})$/, 'CURP inválido').required('Este campo es obligatorio'),
    apellidosResponsable: yup.string().required('Este campo es obligatorio'),
    nombresResponsable: yup.string().required('Este campo es obligatorio'),
    telefonoContacto: yup.string().matches(/^\d{10}$/, 'Número de teléfono inválido').required('Este campo es obligatorio'),
    emailContacto: yup.string().email('Correo electrónico inválido').required('Este campo es obligatorio'),
    nivelEducativo: yup.string().required('Este campo es obligatorio')
});
