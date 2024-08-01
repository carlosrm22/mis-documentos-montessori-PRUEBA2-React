import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Estilos para el PDF
const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 10,
        lineHeight: 1.5
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20
    },
    text: {
        marginBottom: 10,
        textAlign: 'justify'
    },
    list: {
        marginLeft: 20,
        marginBottom: 10
    },
    listItem: {
        marginBottom: 5
    },
    signature: {
        marginTop: 30,
        textAlign: 'center'
    },
    signatureLine: {
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        borderBottomStyle: 'solid'
    }
});

const PrivacidadPDF = ({ formData, formatearFecha }) => (
    <Document>
        <Page style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.title}>Aviso de Privacidad</Text>
                <Text style={styles.text}>
                    En la Institución Educativa denominada <Text style={{ fontWeight: 'bold' }}>Montessori Kalpilli</Text> con domicilio ubicado en la calle de Avenida 2 No.48 Colonia San Pedro de los Pinos, C.P. 03800, Benito Juárez, Ciudad de México. Con fundamento en lo dispuesto por los
                    artículos 1, 2, 3, fracciones V, VI, XI, XII, XIII, 5, 6, 7, 8, 9, 10, 12, 16, 17, 22, 26, 34, 37, y demás relativos de la LEY
                    FEDERAL DE PROTECCIÓN DE DATOS PERSONALES EN POSESIÓN DE LOS PARTICULARES es
                    responsable de recibir sus datos personales y los de su hijo(a), del uso que se le dé a los mismos y de su protección, lo
                    anterior con el propósito de dar cumplimiento con la citada Ley. Para tal efecto se señala al Sr. Carlos Alfonso Romero
                    Muñoz como persona responsable directamente de salvaguardar y custodiar los datos proporcionados por usted. La
                    información proporcionada será utilizada para proveerle el servicio educativo que nos ha solicitado en favor de su hijo
                    <Text style={{ fontWeight: 'bold' }}> {formData.nombresAlumno} {formData.apellidosAlumno}</Text>, y poderle informar a usted de la situación académica, comportamiento y aspectos importantes de su menor hijo, gestionar ante las autoridades
                    educativas la emisión de documentos oficiales incluyendo en los casos que proceda la obtención de su certificado de
                    estudios, para lo cual le requerimos nos proporcione:
                </Text>
                <View style={styles.list}>
                    <Text style={styles.listItem}><Text style={{ fontStyle: 'italic' }}>1. Nombre completo del Padre o Tutor y del alumno(a)</Text></Text>
                    <Text style={styles.listItem}><Text style={{ fontStyle: 'italic' }}>2. Domicilio, correo electrónico y teléfonos para poder comunicarnos con usted en una emergencia, o avisos importantes.</Text></Text>
                    <Text style={styles.listItem}><Text style={{ fontStyle: 'italic' }}>3. Originales del acta de nacimiento, certificados de estudio, fotografías y certificado médico del alumno(a).</Text></Text>
                    <Text style={styles.listItem}><Text style={{ fontStyle: 'italic' }}>4. Firma de reglamento escolar interno.</Text></Text>
                    <Text style={styles.listItem}><Text style={{ fontStyle: 'italic' }}>5. Firma de contrato de prestación de servicios educativos.</Text></Text>
                    <Text style={styles.listItem}><Text style={{ fontStyle: 'italic' }}>6. Datos complementarios para la protección del menor. (Cuando proceda).</Text></Text>
                    <Text style={styles.listItem}><Text style={{ fontStyle: 'italic' }}>7. Datos ficha de inscripción.</Text></Text>
                    <Text style={styles.listItem}><Text style={{ fontStyle: 'italic' }}>8. Datos complementarios para la protección del menor. (Cuando proceda).</Text></Text>
                    <Text style={styles.listItem}><Text style={{ fontStyle: 'italic' }}>9. Ficha de identificación personal. (Cuando proceda).</Text></Text>
                    <Text style={styles.listItem}><Text style={{ fontStyle: 'italic' }}>10. Hoja de datos personales.</Text></Text>
                </View>
                <Text style={styles.text}>
                    La Ley de Protección de Datos Personales en Posesión de los Particulares, considera que tiene derecho a acceder,
                    rectificar o cancelar sus datos personales, lo mismo de la documentación enumerada, así como de oponerse al tratamiento
                    de los mismos o revocar el consentimiento que para tal fin nos haya otorgado, esto sería a través de los procedimientos
                    que hemos implementado, para conocer dicho proceso, requisitos y plazos, el Padre o Tutor puede contactar por escrito
                    a la Directora Técnica del plantel educativo, para informar los motivos por los cuales se opone a proporcionar la
                    información requerida, debiendo fundamentarla en base a la LEY FEDERAL DE PROTECCIÓN DE DATOS
                    PERSONALES EN POSESIÓN DE LOS PARTICULARES.
                </Text>
                <Text style={styles.text}>
                    Los datos personales y documentos que nos proporcione, serán transferidos a la Secretaría de Educación Pública, para
                    su registro, historial académico y el otorgamiento del certificado respectivo con reconocimiento de validez oficial de
                    estudios, (cuando proceda) de acuerdo a la Ley General de Educación y al Artículo 3° Constitucional. Si usted no
                    manifiesta oposición por escrito para que sus datos sean transferidos, se entenderá que ha otorgado su consentimiento
                    para ello, con fundamento en lo dispuesto en el artículo 8 de la citada Ley. El plantel educativo se compromete a que
                    los datos proporcionados serán resguardados bajo medidas de seguridad, garantizando su confidencialidad, en término
                    de lo dispuesto por la LEY FEDERAL DE PROTECCIÓN DE DATOS PERSONALES EN POSESIÓN DE LOS
                    PARTICULARES. A su vez el presente Aviso se encuentra relacionado con la “ficha de inscripción” solicitada por el
                    colegio y que forma parte del paquete de inscripción del alumno(a), y de los documento enumerados en el presente
                    aviso, por lo que los datos asentados en dichos documentos forman parte integral del presente aviso de privacidad.
                </Text>
                <Text style={styles.text}>
                    Acepto que mis datos personales y documentos entregados, sean tratados conforme a los términos y condiciones del
                    presente Aviso de Privacidad.
                </Text>
                <View style={styles.signature}>
                    <Text>Nombre y firma del responsable legal del alumno:</Text>
                    <View style={styles.signatureLine} />
                    <Text><Text style={{ fontWeight: 'bold' }}>{formData.nombresResponsable} {formData.apellidosResponsable}</Text></Text>
                    <Text>{formatearFecha(new Date())}</Text>
                </View>
            </View>
        </Page>
    </Document>
);

export default PrivacidadPDF;
