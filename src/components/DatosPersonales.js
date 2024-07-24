import React from 'react';

function DatosPersonales({ formData, setFormData }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div className="container mt-5">
            <h1>Escuela Montessori Kalpilli</h1>
            <h2>DATOS GENERALES DE LOS PADRES DE FAMILIA Y ALUMNO:</h2>
            <h3>Ciclo Escolar 2024 – 2025</h3>
            <p>Bajo protesta de decir verdad, manifestamos que los datos proporcionados son verídicos y actuales y que dicha
                información se proporciona de manera libre. Los datos e información aquí asentados se encuentran relacionados
                con el aviso de privacidad que me ha sido dado a conocer previamente, mismo que de forma separada he
                firmado para constancia y aceptación:</p>
            <form>
                <FormGroup label="Nombre completo del alumno(a)" id="nombreAlumno" type="text" value={`${formData.nombresAlumno} ${formData.apellidosAlumno}`} readOnly />
                <FormGroup label="Edad" id="edadAlumno" type="text" value={formData.edadAlumno} readOnly />
                <FormGroup label="Lugar de nacimiento" id="lugarNacimientoAlumno" type="text" value={formData.lugarNacimientoAlumno} handleChange={handleChange} required smallText="Ejemplo: Av. 2 No. 48 Colonia San Pedro de los Pinos, Benito Juárez, C.P. 03800, CDMX, México" />
                <FormGroup label="Nombre(s) de la madre o tutor" id="nombresMadre" type="text" value={formData.nombresMadre} handleChange={handleChange} required />
                <FormGroup label="Apellidos de la madre o tutor" id="apellidosMadre" type="text" value={formData.apellidosMadre} handleChange={handleChange} required />
                <FormGroup label="Nombre(s) del padre o tutor" id="nombresPadre" type="text" value={formData.nombresPadre} handleChange={handleChange} required />
                <FormGroup label="Apellidos del padre o tutor" id="apellidosPadre" type="text" value={formData.apellidosPadre} handleChange={handleChange} required />
                <FormGroup label="Domicilio particular de los padres o tutores" id="domicilioPadres" type="text" value={formData.domicilioPadres} handleChange={handleChange} required />
            </form>
        </div>
    );
}

// Componente reutilizable para un grupo de formulario
const FormGroup = ({ label, id, type, value, handleChange, readOnly = false, smallText = null }) => (
    <div className="form-group">
        <label htmlFor={id}>{label}: <span className="text-danger">*</span></label>
        <input type={type} className="form-control" id={id} value={value} onChange={handleChange} readOnly={readOnly} required />
        {smallText && <small className="form-text text-muted">{smallText}</small>}
    </div>
);

export default DatosPersonales;
