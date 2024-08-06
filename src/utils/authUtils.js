// No mantiene un estado local como useAuth. Solo verifica el estado de autenticación y actualiza el estado global.
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

/**
 * Verifica el estado de autenticación del usuario.
 * @param {Function} dispatch - Función para despachar acciones al estado global.
 * @returns {Function} unsubscribe - Función para cancelar la suscripción a los cambios en el estado de autenticación.
 */
export const verificarAutenticacion = (dispatch) => {
    try {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            const actionType = currentUser ? 'SET_USER' : 'SET_USER';
            const payload = currentUser || null;
            dispatch({ type: actionType, payload });
        });

        return unsubscribe;
    } catch (error) {
        console.error('Error al verificar la autenticación:', error);
    }
};
//