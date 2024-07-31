import Swal from 'sweetalert2';
import { saveData } from '../services/firebaseService';
import { isValid, differenceInYears } from 'date-fns';

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
 * @returns {Promise<void>}
 */
export const handleGuardarDatos = async (values, setFormData, setSubmitting, navigate) => {
    const result = await mostrarAvisoDatos();

    if (result.isConfirmed) {
        const fechaNacimiento = new Date(values.fechaNacimientoAlumno);
        const edadAlumno = isValid(fechaNacimiento) ? differenceInYears(new Date(), fechaNacimiento) : 0;

        // Guardar solo la primera palabra del nivel educativo seleccionado
        const nivelEducativo = values.nivelEducativo.split(' ')[0];

        const dataToSave = { ...values, edadAlumno, nivelEducativo };
        setFormData(dataToSave);

        try {
            await saveData('datosIniciales', dataToSave);
            mostrarAlertaExito();
            setSubmitting(false);
            navigate('/aviso-privacidad'); // Navegar a AvisoPrivacidad
        } catch (error) {
            mostrarAlertaError(error.message);
            console.error('Error al guardar los datos:', error);
            setSubmitting(false);
        }
    } else {
        mostrarAvisoRevisar();
        setSubmitting(false);
    }
};
