import React from 'react';

const DatosPersonales = ({ formData, setFormData }) => {
    return (
        <div>
            {/* Aquí va el contenido de la sección DatosPersonales */}
            <h1>Datos Personales</h1>
            {/* Ejemplo de uso de formData */}
            <p>Nombre del alumno: {formData.nombresAlumno} {formData.apellidosAlumno}</p>
            {/* Más contenido aquí */}
        </div>
    );
}

export default DatosPersonales;
