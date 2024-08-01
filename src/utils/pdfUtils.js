import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';

/**
 * Función para subir el PDF a Firebase Storage.
 * @param {Blob} pdfBlob - El Blob del archivo PDF.
 * @param {string} storagePath - La ruta en Firebase Storage.
 * @returns {Promise<void>}
 */
export const subirPDFaFirebase = async (pdfBlob, storagePath) => {
    const storage = getStorage();
    const storageRef = ref(storage, storagePath);
    await uploadBytes(storageRef, pdfBlob);
};

/**
 * Función para descargar el PDF desde Firebase Storage.
 * @param {string} storagePath - La ruta en Firebase Storage.
 * @returns {Promise<string>} - La URL de descarga del archivo PDF.
 */
export const descargarPDFdeFirebase = async (storagePath) => {
    const storage = getStorage();
    const storageRef = ref(storage, storagePath);
    const url = await getDownloadURL(storageRef);
    return url;
};
