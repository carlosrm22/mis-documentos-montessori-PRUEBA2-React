// src/utils/dateUtils.js

/**
 * Función para formatear una fecha en el formato deseado.
 * @param {Date} date - La fecha a formatear.
 * @returns {string} - La fecha formateada.
 */
export const formatearFecha = (date) => {
    const dias = date.getDate();
    const meses = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    const mes = meses[date.getMonth()];
    const año = date.getFullYear();

    return `A los ${dias} días del mes de ${mes} del año ${año}.`;
};

/**
 * Calcula la edad a partir de una fecha de nacimiento.
 * @param {Date} fechaNacimiento - La fecha de nacimiento.
 * @returns {number} - La edad calculada.
 */
export const calculateAge = (fechaNacimiento) => {
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }
    return edad;
};
