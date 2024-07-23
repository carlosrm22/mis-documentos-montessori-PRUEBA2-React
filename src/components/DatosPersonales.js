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
                <div className="form-group">
                    <label htmlFor="nombreAlumno">Nombre completo del alumno(a):</label>
                    <input type="text" className="form-control" id="nombreAlumno" value={`${formData.nombresAlumno} ${formData.apellidosAlumno}`} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="edadAlumno">Edad:</label>
                    <input type="text" className="form-control" id="edadAlumno" value={formData.edadAlumno} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="lugarNacimientoAlumno">Lugar de nacimiento: <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="lugarNacimientoAlumno" name="lugarNacimientoAlumno" value={formData.lugarNacimientoAlumno} onChange={handleChange} required />
                    <small className="form-text text-muted">Ejemplo: Av. 2 No. 48 Colonia San Pedro de los Pinos, Benito Juárez, C.P. 03800, CDMX, México</small>
                </div>
                <div className="form-group">
                    <label htmlFor="nombresMadre">Nombre(s) de la madre o tutor: <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="nombresMadre" name="nombresMadre" value={formData.nombresMadre} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="apellidosMadre">Apellidos de la madre o tutor: <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="apellidosMadre" name="apellidosMadre" value={formData.apellidosMadre} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="nombresPadre">Nombre(s) del padre o tutor: <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="nombresPadre" name="nombresPadre" value={formData.nombresPadre} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="apellidosPadre">Apellidos del padre o tutor: <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="apellidosPadre" name="apellidosPadre" value={formData.apellidosPadre} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="domicilioPadres">Domicilio particular de los padres o tutores: <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="domicilioPadres" name="domicilioPadres" value={formData.domicilioPadres} onChange={handleChange} required />
                </div>
            </form>
        </div>
    );
}

export default DatosPersonales;
