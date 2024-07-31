import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

/**
 * Función para generar el PDF.
 * @param {string} inputId - El ID del elemento HTML a convertir en PDF.
 * @returns {Promise<Blob>} - El Blob del archivo PDF generado.
 */
export const generarPDF = (inputId) => {
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

    return html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'pt', 'letter');
        const margin = 40;
        const pdfWidth = pdf.internal.pageSize.getWidth() - 2 * margin;
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        // Ajustar el contenido para que quepa en una sola página
        pdf.addImage(imgData, 'PNG', margin, margin, pdfWidth, pdfHeight);

        // Volver a mostrar los elementos no deseados
        elementsToHide.forEach(element => {
            element.style.display = '';
        });

        // Remover clase de aumento de tamaño de letra
        input.classList.remove('pdf-font-size');

        return pdf.output('blob');
    });
};

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
