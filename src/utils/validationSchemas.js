import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email('Correo electrónico inválido').required('Correo electrónico es requerido'),
    password: Yup.string().required('Contraseña es requerida')
});

export const registroValidationSchema = Yup.object().shape({
    email: Yup.string().email('Correo electrónico inválido').required('Correo electrónico es requerido'),
    password: Yup.string().required('Contraseña es requerida'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir').required('Confirmar contraseña es requerido')
});

export const datosInicialesValidationSchema = Yup.object().shape({
    nivelEducativo: Yup.string().required('Nivel educativo es requerido'),
    apellidosAlumno: Yup.string().required('Apellidos del alumno son requeridos'),
    nombresAlumno: Yup.string().required('Nombre(s) del alumno es requerido'),
    fechaNacimientoAlumno: Yup.date().required('Fecha de nacimiento del alumno es requerida').nullable(),
    edadAlumno: Yup.number().min(0, 'El alumno debe haber nacido ya, ¡no aceptamos viajeros del tiempo!').max(100, 'Lo sentimos, el alumno no puede ser inmortal').required('La edad del alumno no puede ser mayor a 100 años, ¡no aceptamos inmortales!'),
    curpAlumno: Yup.string().required('CURP del alumno es requerido'),
    apellidosResponsable: Yup.string().required('Apellidos del responsable son requeridos'),
    nombresResponsable: Yup.string().required('Nombre(s) del responsable es requerido'),
    telefonoContacto: Yup.string().required('Teléfono de contacto es requerido'),
    emailContacto: Yup.string().email('Correo electrónico inválido').required('Correo electrónico es requerido')
});

export const datosPersonalesValidationSchema = Yup.object().shape({
    lugarNacimientoAlumno: Yup.string().required('Lugar de nacimiento es requerido'),
    nombresMadre: Yup.string().required('Nombre de la madre es requerido'),
    apellidosMadre: Yup.string().required('Apellidos de la madre son requeridos'),
    nombresPadre: Yup.string().required('Nombre del padre es requerido'),
    apellidosPadre: Yup.string().required('Apellidos del padre son requeridos'),
    domicilioPadres: Yup.string().required('Domicilio es requerido')
});
