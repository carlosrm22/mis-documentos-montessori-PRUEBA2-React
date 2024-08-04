// src/utils/dateUtils.js

/**
 * Array de nombres de los meses.
 */
const MESES = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];

/**
 * Función para formatear una fecha en el formato deseado.
 * @param {Date} date - La fecha a formatear.
 * @returns {string} - La fecha formateada.
 * @throws {Error} - Si el parámetro no es una instancia de Date.
 */
export const formatearFecha = (date) => {
    if (!(date instanceof Date) || isNaN(date)) {
        throw new Error('El parámetro debe ser una instancia válida de Date.');
    }

    const dias = date.getDate();
    const mes = MESES[date.getMonth()];
    const año = date.getFullYear();

    return `A los ${dias} días del mes de ${mes} del año ${año}.`;
};

/**
 * Calcula la edad a partir de una fecha de nacimiento.
 * @param {Date} fechaNacimiento - La fecha de nacimiento.
 * @returns {number} - La edad calculada.
 * @throws {Error} - Si el parámetro no es una instancia de Date.
 */
export const calculateAge = (fechaNacimiento) => {
    if (!(fechaNacimiento instanceof Date) || isNaN(fechaNacimiento)) {
        throw new Error('El parámetro debe ser una instancia válida de Date.');
    }

    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }
    return edad;
};