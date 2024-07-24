// src/services/firebaseService.js

import { db, auth } from '../utils/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// Manejo de errores
const getErrorMessage = (errorCode) => {
    switch (errorCode) {
        case 'auth/email-already-in-use':
            return 'El correo electrónico ya está en uso.';
        case 'auth/invalid-email':
            return 'El correo electrónico no es válido.';
        case 'auth/operation-not-allowed':
            return 'La operación no está permitida.';
        case 'auth/weak-password':
            return 'La contraseña es demasiado débil.';
        case 'auth/user-disabled':
            return 'El usuario ha sido deshabilitado.';
        case 'auth/user-not-found':
            return 'No se encontró el usuario.';
        case 'auth/wrong-password':
            return 'Contraseña incorrecta.';
        default:
            return 'Ocurrió un error. Por favor, inténtelo de nuevo.';
    }
};

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
