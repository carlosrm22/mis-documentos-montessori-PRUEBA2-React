// src/utils/sweetAlertUtils.js

import Swal from 'sweetalert2';

// Función para mostrar el aviso de SweetAlert
export const mostrarAviso = async () => {
    return await Swal.fire({
        title: 'Se descargará el documento en PDF para que pueda imprimirlo y firmarlo',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar y Continuar',
        cancelButtonText: 'Revisar'
    });
};

// Función para mostrar el aviso de revisión
export const mostrarAvisoRevisar = () => {
    Swal.fire({
        icon: 'info',
        title: 'Revisión',
        text: 'Puedes revisar y modificar los datos antes de continuar.'
    });
};

// Función para mostrar alerta de éxito
export const mostrarAlertaExito = () => {
    return Swal.fire({
        icon: 'success',
        title: 'Datos almacenados correctamente',
        text: 'Por favor, no actualice la página',
        showConfirmButton: false,
        timer: 1500
    });
};

// Función para mostrar alerta de error
export const mostrarAlertaError = () => {
    return Swal.fire({
        icon: 'error',
        title: 'Error al guardar los datos',
        text: 'Ocurrió un problema al guardar la información.'
    });
};
