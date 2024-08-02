// src/utils/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicializar servicios
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

/**
 * Función para registrar un evento en Firebase Analytics.
 * @param {string} nombreEvento - El nombre del evento.
 * @param {Object} parametros - Los parámetros del evento.
 */
const registrarEvento = (nombreEvento, parametros) => {
    logEvent(analytics, nombreEvento, parametros);
};

export { db, auth, storage, analytics, registrarEvento };

// Agregar logs para debugging
console.log('Firebase app initialized:', app);
console.log('Firebase analytics initialized:', analytics);
console.log('Firebase Firestore initialized:', db);
console.log('Firebase Auth initialized:', auth);
console.log('Firebase Storage initialized:', storage);
