// src/utils/sweetAlertUtils.js

import Swal from 'sweetalert2';

export const mostrarAviso = () => {
    return Swal.fire({
        title: 'Se descargar? el documento en PDF para que pueda imprimirlo y firmarlo',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar y Continuar',
        cancelButtonText: 'Revisar'
    });
};

export const mostrarAvisoRevisar = () => {
    return Swal.fire({
        icon: 'info',
        title: 'Revisi?n',
        text: 'Puedes revisar y modificar los datos antes de continuar.'
    });
};

export const mostrarAlertaExito = () => {
    return Swal.fire({
        icon: 'success',
        title: 'Datos almacenados correctamente',
        text: 'Por favor, no actualice la p?gina',
        showConfirmButton: false,
        timer: 1500
    });
};

export const mostrarAlertaError = () => {
    return Swal.fire({
        icon: 'error',
        title: 'Error al guardar los datos',
        text: 'Ocurri? un problema al guardar la informaci?n.'
    });
};
