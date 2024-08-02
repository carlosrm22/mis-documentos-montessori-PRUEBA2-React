// src/utils/sweetAlertUtils.js
import Swal from 'sweetalert2';
import { saveData, updateDatosIniciales } from '../services/firebaseService';
import { calculateAge } from './dateUtils'; // Asegúrate de importar calculateAge

/**
 * Muestra una alerta de aviso con opciones para aceptar y continuar o revisar.
 * @returns {Promise<SweetAlertResult>} - El resultado de la alerta.
 */
export const mostrarAvisoDatos = () => {
    return Swal.fire({
        title: 'Se registrarán sus datos, no podrá cambiarlos más adelante, por favor revise que sean correctos.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar y Continuar',
        cancelButtonText: 'Revisar'
    });
};

/**
 * Muestra una alerta de aviso para PDF.
 * @returns {Promise<SweetAlertResult>} - El resultado de la alerta.
 */
export const mostrarAvisoPDF = () => {
    return Swal.fire({
        title: 'Se descargará el documento en PDF para que pueda imprimirlo y firmarlo',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar y Continuar',
        cancelButtonText: 'Revisar'
    });
};

/**
 * Muestra una alerta de revisión.
 * @returns {Promise<SweetAlertResult>} - El resultado de la alerta.
 */
export const mostrarAvisoRevisar = () => {
    return Swal.fire({
        icon: 'info',
        title: 'Revisión',
        text: 'Revisa atentamente los datos, ya que no podrás cambiarlos después.'
    });
};

/**
 * Muestra una alerta de éxito.
 * @returns {Promise<SweetAlertResult>} - El resultado de la alerta.
 */
export const mostrarAlertaExito = () => {
    return Swal.fire({
        icon: 'success',
        title: 'Datos almacenados correctamente',
        text: 'Por favor, no actualice la página',
        showConfirmButton: false,
        timer: 1500
    });
};

/**
 * Muestra una alerta de error.
 * @param {string} mensaje - El mensaje de error a mostrar.
 * @returns {Promise<SweetAlertResult>} - El resultado de la alerta.
 */
export const mostrarAlertaError = (mensaje) => {
    return Swal.fire({
        icon: 'error',
        title: 'Error al guardar los datos',
        text: mensaje
    });
};

/**
 * Función para guardar datos iniciales y mostrar alertas.
 * @param {Object} values - Los valores del formulario.
 * @param {Function} setFormData - Función para actualizar el estado del formulario.
 * @param {Function} setSubmitting - Función para actualizar el estado de envío del formulario.
 * @param {Function} navigate - Función para navegar a otra ruta.
 * @param {Function} setLoading - Función para actualizar el estado de carga.
 * @returns {Promise<void>}
 */
export const handleGuardarDatos = async (values, setFormData, setSubmitting, navigate, setLoading) => {
    const result = await mostrarAvisoDatos();

    if (result.isConfirmed) {
        const fechaNacimiento = new Date(values.fechaNacimientoAlumno);
        const edadAlumno = calculateAge(fechaNacimiento);

        // Guardar solo la primera palabra del nivel educativo seleccionado
        const nivelEducativo = values.nivelEducativo.split(' ')[0];

        const dataToSave = { ...values, edadAlumno, nivelEducativo };
        setFormData(dataToSave);

        try {
            setLoading(true);
            await saveData('datosIniciales', dataToSave);
            mostrarAlertaExito();
            setSubmitting(false);
            setLoading(false);
            navigate('/aviso-privacidad'); // Navegar a AvisoPrivacidad
        } catch (error) {
            setLoading(false);
            mostrarAlertaError(error.message);
            console.error('Error al guardar los datos:', error);
            setSubmitting(false);
        }
    } else {
        mostrarAvisoRevisar();
        setSubmitting(false);
    }
};

/**
 * Muestra una alerta de error de inicio de sesión.
 * @returns {Promise<SweetAlertResult>} - El resultado de la alerta.
 */
export const mostrarAlertaErrorLogin = (navigate) => {
    return Swal.fire({
        icon: 'error',
        title: 'Error al iniciar sesión',
        text: 'Usuario o contraseña no encontrada, por favor intenta de nuevo o regístrate.',
        showCancelButton: true,
        confirmButtonText: 'Registrarse',
        cancelButtonText: 'Regresar'
    }).then((result) => {
        if (result.isConfirmed) {
            navigate('/register');
        }
    });
};

/**
 * Muestra una alerta de inicio de sesión exitoso.
 * @returns {Promise<SweetAlertResult>} - El resultado de la alerta.
 */
export const mostrarAlertaLoginExitoso = () => {
    return Swal.fire('Inicio de sesión exitoso', '', 'success');
};

/**
 * Muestra una alerta de error de registro.
 * @param {string} mensaje - El mensaje de error a mostrar.
 * @returns {Promise<SweetAlertResult>} - El resultado de la alerta.
 */
export const mostrarAlertaErrorRegistro = (mensaje) => {
    return Swal.fire('Error al registrarse', mensaje, 'error');
};

/**
 * Muestra una alerta de registro exitoso.
 * @returns {Promise<SweetAlertResult>} - El resultado de la alerta.
 */
export const mostrarAlertaRegistroExitoso = () => {
    return Swal.fire('Registro exitoso', '', 'success');
};
