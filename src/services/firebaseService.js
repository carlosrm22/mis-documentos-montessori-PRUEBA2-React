// src/services/firebaseService.js

import { db, auth } from '../utils/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// Función para registrar usuarios
const register = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('Usuario registrado:', userCredential.user);
        })
        .catch((error) => {
            console.error('Error al registrar usuario:', error);
        });
};

// Función para iniciar sesión
const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('Usuario iniciado sesión:', userCredential.user);
        })
        .catch((error) => {
            console.error('Error al iniciar sesión:', error);
        });
};

// Función para cerrar sesión
const logout = () => {
    signOut(auth)
        .then(() => {
            console.log('Usuario cerró sesión');
        })
        .catch((error) => {
            console.error('Error al cerrar sesión:', error);
        });
};

/**
 * Función para guardar datos en Firestore.
 * @param {string} collectionName - El nombre de la colección.
 * @param {Object} data - Los datos a guardar.
 * @returns {Promise<void>}
 */
const saveData = async (collectionName, data) => {
    try {
        await addDoc(collection(db, collectionName), data);
        console.log('Datos guardados exitosamente');
    } catch (error) {
        console.error('Error guardando datos:', error);
        throw new Error('Error al guardar los datos');
    }
};

export { register, login, logout, saveData };
