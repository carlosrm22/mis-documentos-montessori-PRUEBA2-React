// src/services/firebaseService.js

import { db } from '../utils/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

/**
 * Función para guardar datos en Firestore.
 * @param {string} collectionName - El nombre de la colección.
 * @param {Object} data - Los datos a guardar.
 * @returns {Promise<void>}
 */
export const saveData = async (collectionName, data) => {
    try {
        await addDoc(collection(db, collectionName), data);
        console.log('Datos guardados exitosamente');
    } catch (error) {
        console.error('Error guardando datos:', error);
        throw new Error('Error al guardar los datos');
    }
};
