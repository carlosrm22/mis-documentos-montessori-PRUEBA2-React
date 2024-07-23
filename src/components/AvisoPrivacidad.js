import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function AvisoPrivacidad({ formData, getFechaActual, generarPDF }) {
    const { nombresAlumno, apellidosAlumno, nombresResponsable, apellidosResponsable } = formData;
    const navigate = useNavigate();

    const handleAceptarContinuar = async () => {
        Swal.fire({
            title: 'Se descargará el documento en PDF para que pueda imprimirlo y firmarlo',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar y Continuar',
            cancelButtonText: 'Revisar'
        }).then((result) => {
            if (result.isConfirmed) {
                generarPDF().then((pdfBlob) => {
                    // Descargar el PDF
                    const url = window.URL.createObjectURL(new Blob([pdfBlob]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'documento.pdf');
                    document.body.appendChild(link);
                    link.click();

                    // Redirigir a la nueva sección "Datos Personales"
                    navigate('/datos-personales');
                }).catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Hubo un problema al generar el PDF.'
                    });
                });
            }
        });
    };

    return (
        <div className="container mt-5">
            <h1>Aviso de Privacidad</h1>
            <p>En la Institución Educativa denominada <b>Montessori Kalpilli</b> con domicilio ubicado en la calle de Avenida 2 No.48
                Colonia San Pedro de los Pinos, C.P. 03800, Benito Juárez, Ciudad de México. Con fundamento en lo dispuesto por los
                artículos 1, 2, 3, fracciones V, VI, XI, XII, XIII, 5, 6, 7, 8, 9, 10, 12, 16, 17, 22, 26, 34, 37, y demás relativos de la LEY
                    FEDERAL DE PROTECCIÓN DE DATOS PERSONALES EN POSESIÓN DE LOS PARTICULARES es
                responsable de recibir sus datos personales y los de su hijo(a), del uso que se le dé a los mismos y de su protección, lo
                anterior con el propósito de dar cumplimiento con la citada Ley. Para tal efecto se señala al Sr. Carlos Alfonso Romero
                Muñoz como persona responsable directamente de salvaguardar y custodiar los datos proporcionados por usted. La
                información proporcionada será utilizada para proveerle el servicio educativo que nos ha solicitado en favor de su hijo <b> {nombresAlumno} {apellidosAlumno}</b>, y poderle informar a
                usted de la situación académica, comportamiento y aspectos importantes de su menor hijo, gestionar ante las autoridades
                educativas la emisión de documentos oficiales incluyendo en los casos que proceda la obtención de su certificado de
                estudios, para lo cual le requerimos nos proporcione:</p>
            <ol>
                <li><i>Nombre completo del Padre o Tutor y del alumno(a)</i></li>
                <li><i>Domicilio, correo electrónico y teléfonos para poder comunicarnos con usted en una emergencia, o avisos
                    importantes.</i></li>
                <li><i>Originales del acta de nacimiento, certificados de estudio, fotografías y certificado médico del alumno(a).</i></li>
                <li><i>Firma de reglamento escolar interno.</i></li>
                <li><i>Firma de contrato de prestación de servicios educativos.</i></li>
                <li><i>Datos complementarios para la protección del menor. (Cuando proceda).</i></li>
                <li><i>Datos ficha de inscripción.</i></li>
                <li><i>Datos complementarios para la protección del menor. (Cuando proceda).</i></li>
                <li><i>Ficha de identificación personal. (Cuando proceda).</i></li>
                <li><i>Hoja de datos personales.</i></li>
            </ol>
            <p>La Ley de Protección de Datos Personales en Posesión de los Particulares, considera que tiene derecho a acceder,
                rectificar o cancelar sus datos personales, lo mismo de la documentación enumerada, así como de oponerse al tratamiento
                de los mismos o revocar el consentimiento que para tal fin nos haya otorgado, esto sería a través de los procedimientos
                que hemos implementado, para conocer dicho proceso, requisitos y plazos, el Padre o Tutor puede contactar por escrito
                a la Directora Técnica del plantel educativo, para informar los motivos por los cuales se opone a proporcionar la
                información requerida, debiendo fundamentarla en base a la LEY FEDERAL DE PROTECCIÓN DE DATOS
                PERSONALES EN POSESIÓN DE LOS PARTICULARES. </p>
            <p>Los datos personales y documentos que nos proporcione, serán transferidos a la Secretaría de Educación Pública, para
                su registro, historial académico y el otorgamiento del certificado respectivo con reconocimiento de validez oficial de
                estudios, (cuando proceda) de acuerdo a la Ley General de Educación y al Artículo 3° Constitucional. Si usted no
                manifiesta oposición por escrito para que sus datos sean transferidos, se entenderá que ha otorgado su consentimiento
                para ello, con fundamento en lo dispuesto en el artículo 8 de la citada Ley. El plantel educativo se compromete a que
                los datos proporcionados serán resguardados bajo medidas de seguridad, garantizando su confidencialidad, en término
                de lo dispuesto por la LEY FEDERAL DE PROTECCIÓN DE DATOS PERSONALES EN POSESIÓN DE LOS
                PARTICULARES. A su vez el presente Aviso se encuentra relacionado con la “ficha de inscripción” solicitada por el
                colegio y que forma parte del paquete de inscripción del alumno(a), y de los documento enumerados en el presente
                aviso, por lo que los datos asentados en dichos documentos forman parte integral del presente aviso de privacidad. </p>
            <p>Acepto que mis datos personales y documentos entregados, sean tratados conforme a los términos y condiciones del
                presente Aviso de Privacidad.</p>
            <div className="text-center mt-5">
                <p>Nombre y firma del responsable legal del alumno: </p>
                <hr className="signature-line" />
                <p><b>{nombresResponsable} {apellidosResponsable}</b></p>
                <p>{getFechaActual()}</p>
            </div>
            <div className="text-center mt-5">
                <button className="btn btn-primary" onClick={handleAceptarContinuar}>Aceptar y Continuar</button>
            </div>
        </div>
    );
}

export default AvisoPrivacidad;