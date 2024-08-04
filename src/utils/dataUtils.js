// src/utils/dataUtils.js
import { getDatosIniciales } from '../services/firebaseService';

/**
 * Carga los datos iniciales desde Firebase y los despacha al estado global.
 * @param {Function} dispatch - Función para despachar acciones al estado global.
 * @returns {Promise<Object>} - Datos iniciales cargados.
 * @throws {Error} - Si ocurre un error al cargar los datos.
 */
export const cargarDatosIniciales = async (dispatch) => {
    try {
        const datos = await Promise.race([
            getDatosIniciales(),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000))
        ]);

        if (!datos || typeof datos !== 'object' || !Array.isArray(datos)) {
            throw new Error('La estructura de los datos es incorrecta');
        }

        // Procesar los datos si son correctos
        console.log('Datos iniciales cargados correctamente:', datos);
        return datos;
    } catch (error) {
        console.error('No se encontraron datos iniciales o la estructura de los datos es incorrecta.', error);
        throw error; // Re-lanzar el error para que pueda ser manejado por el llamador
    }
};
