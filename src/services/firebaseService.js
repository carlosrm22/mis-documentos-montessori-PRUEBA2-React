// src/services/firebaseService.js
import { db, auth } from '../utils/firebaseConfig';
import { collection, addDoc, getDocs, query, where, updateDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

// Función para registrar usuarios
const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

// Función para iniciar sesión
const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

// Función para cerrar sesión
const logout = () => {
    return signOut(auth);
};

/**
 * Función para guardar datos en Firestore, incluyendo el UID del usuario.
 * @param {string} collectionName - El nombre de la colección.
 * @param {Object} data - Los datos a guardar.
 * @returns {Promise<void>}
 */
const saveData = async (collectionName, data) => {
    const user = auth.currentUser;
    if (!user) throw new Error('No hay usuario logueado');

    const dataWithUID = { ...data, uid: user.uid };

    try {
        await addDoc(collection(db, collectionName), dataWithUID);
        console.log('Datos guardados exitosamente');
    } catch (error) {
        console.error('Error guardando datos:', error);
        throw new Error('Error al guardar los datos');
    }
};

/**
 * Función para obtener datos iniciales del usuario logueado.
 * @returns {Promise<Object|null>} - Los datos iniciales del usuario o null si no se encuentran datos.
 */
const getDatosIniciales = async () => {
    const user = auth.currentUser;
    if (!user) throw new Error('No hay usuario logueado');

    const q = query(collection(db, 'datosIniciales'), where('uid', '==', user.uid));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;

    return querySnapshot.docs[0].data();
};

/**
 * Función para actualizar datos iniciales en Firestore.
 * @param {Object} data - Los datos a actualizar.
 * @returns {Promise<void>}
 */
const updateDatosIniciales = async (data) => {
    const user = auth.currentUser;
    if (!user) throw new Error('No hay usuario logueado');

    const q = query(collection(db, 'datosIniciales'), where('uid', '==', user.uid));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) throw new Error('No se encontraron datos iniciales para actualizar');

    const docRef = querySnapshot.docs[0].ref;
    await updateDoc(docRef, data);
};

/**
 * Función para subir el PDF a Firebase Storage
 * @param {Blob} pdfBlob - El Blob del archivo PDF
 * @param {string} storagePath - La ruta en Firebase Storage
 * @returns {Promise<void>}
 */
const subirPDFaFirebase = async (pdfBlob, storagePath) => {
    const storage = getStorage();
    const storageRef = ref(storage, storagePath);
    await uploadBytes(storageRef, pdfBlob);
};

export { register, login, logout, saveData, getDatosIniciales, updateDatosIniciales, subirPDFaFirebase };
