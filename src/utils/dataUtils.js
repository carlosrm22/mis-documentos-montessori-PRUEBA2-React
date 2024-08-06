import { getDatosIniciales } from '../services/firebaseService';
import { mostrarAlertaError, mostrarAlertaExito } from './sweetAlertUtils';

// Constantes para los tipos de acción
const SET_LOADING = 'SET_LOADING';
const SET_FORM_DATA = 'SET_FORM_DATA';
const SET_ERROR = 'SET_ERROR';

/**
 * Función auxiliar para crear un timeout.
 * @param {number} ms - Milisegundos antes de que el timeout se rechace.
 * @returns {Promise<Error>} - Promesa que se rechaza después del timeout.
 */
const createTimeout = (ms) => new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms));

/**
 * Carga los datos iniciales desde Firebase y los despacha al estado global.
 * @param {Function} dispatch - Función para despachar acciones al estado global.
 * @returns {Promise<Object>} - Datos iniciales cargados.
 * @throws {Error} - Si ocurre un error al cargar los datos.
 */
export const cargarDatosIniciales = async (dispatch) => {
    try {
        dispatch({ type: SET_LOADING, payload: true });

        const datos = await Promise.race([
            getDatosIniciales(),
            createTimeout(5000)
        ]);

        if (!datos) {
            console.log('No se encontraron datos iniciales.');
            dispatch({ type: SET_FORM_DATA, payload: {} }); // Cargar datos vacíos
            return {};
        }

        if (typeof datos !== 'object' || Array.isArray(datos)) {
            throw new Error('La estructura de los datos es incorrecta');
        }

        console.log('Datos iniciales cargados correctamente:', datos);
        dispatch({ type: SET_FORM_DATA, payload: datos });
        mostrarAlertaExito();  // Mostrar alerta de éxito al cargar los datos correctamente
        return datos;
    } catch (error) {
        console.error('No se encontraron datos iniciales o la estructura de los datos es incorrecta.', error);
        dispatch({ type: SET_ERROR, payload: error.message });
        mostrarAlertaError(error.message);  // Mostrar alerta de error al fallar la carga de datos
        throw error;
    } finally {
        dispatch({ type: SET_LOADING, payload: false });
    }
};
