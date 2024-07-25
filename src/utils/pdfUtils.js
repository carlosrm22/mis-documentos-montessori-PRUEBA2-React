// src/utils/pdfUtils.js

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebaseConfig';

export const generarPDF = async (inputId, storagePath) => {
    const input = document.getElementById(inputId);

    if (!input) {
        console.error(`Elemento con id "${inputId}" no encontrado.`);
        return;
    }

    // Añadir clase para aumentar tamaño de letra
    input.classList.add('pdf-font-size');

    // Ocultar elementos no deseados
    const elementsToHide = input.querySelectorAll('.no-print');
    elementsToHide.forEach(element => {
        element.style.display = 'none';
    });

    try {
        const canvas = await html2canvas(input);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'pt', 'letter');
        const margin = 50;
        const pdfWidth = pdf.internal.pageSize.getWidth() - 2 * margin;
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', margin, margin, pdfWidth, pdfHeight);

        // Volver a mostrar los elementos no deseados
        elementsToHide.forEach(element => {
            element.style.display = '';
        });

        // Remover clase de aumento de tamaño de letra
        input.classList.remove('pdf-font-size');

        const pdfBlob = pdf.output('blob');

        // Subir el PDF a Firebase Storage
        const storageRef = ref(storage, storagePath);
        await uploadBytes(storageRef, pdfBlob);

        // Obtener la URL de descarga
        const downloadURL = await getDownloadURL(storageRef);

        // Descargar el PDF
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = 'documento.pdf';
        link.click();

        return pdfBlob;
    } catch (error) {
        console.error('Error al generar el PDF:', error);
        throw error;
    }
};
