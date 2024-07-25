// src/utils/pdfUtils.js

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Función para generar el PDF
export const generarPDF = async (inputId) => {
    const input = document.getElementById(inputId);

    if (!input) {
        throw new Error(`Elemento con id "${inputId}" no encontrado.`);
    }

    // Añadir clase para aumentar tamaño de letra
    input.classList.add('pdf-font-size');

    // Ocultar elementos no deseados
    const elementsToHide = input.querySelectorAll('.no-print');
    elementsToHide.forEach(element => {
        element.style.display = 'none';
    });

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

    return pdf.output('blob');
};

// Función para descargar el PDF
export const descargarPDF = (pdfBlob) => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(pdfBlob);
    link.download = 'documento.pdf';
    link.click();
};
