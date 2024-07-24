import React from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

// Componente principal para los datos iniciales
function DatosIniciales({ formData, setFormData }) {
    const navigate = useNavigate();

    // Maneja los cambios en los campos del formulario
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevFormData) => {
            if (id === 'fechaNacimientoAlumno') {
                const edad = calcularEdad(value);
                return { ...prevFormData, [id]: value, edadAlumno: edad };
            }
            return { ...prevFormData, [id]: value };
        });
    };

    // Calcula la edad a partir de la fecha de nacimiento
    const calcularEdad = (fechaNacimiento) => {
        const hoy = new Date();
        const fechaNac = new Date(fechaNacimiento);
        let edad = hoy.getFullYear() - fechaNac.getFullYear();
        const mes = hoy.getMonth() - fechaNac.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
            edad--;
        }
        return edad;
    };

    // Valida el formulario antes de continuar
    const validarFormulario = (e) => {
        e.preventDefault();
        if (!Object.values(formData).every(field => typeof field === 'string' ? field.trim() !== '' : field !== '')) {
            mostrarAlerta('error', 'Ups, faltan datos', 'Por favor, completa todos los campos obligatorios.');
        } else {
            Swal.fire({
                title: '¿Seguro que quieres guardar y continuar?',
                text: "Revisa toda la información antes de continuar.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, guardar y continuar',
                cancelButtonText: 'Revisar'
            }).then((result) => {
                if (result.isConfirmed) {
                    guardarYContinuar();
                }
            });
        }
    };

    // Guarda la información y muestra la alerta de éxito
    const guardarYContinuar = () => {
        localStorage.setItem('formData', JSON.stringify(formData));
        mostrarAlerta('success', 'Datos almacenados correctamente', 'Por favor, no actualice la página', false, 1500);
        navigate('/aviso-privacidad');
    };

    // Muestra una alerta de SweetAlert2
    const mostrarAlerta = (icon, title, text, showConfirmButton = true, timer = null) => {
        Swal.fire({
            icon,
            title,
            text,
            showConfirmButton,
            timer
        });
    };

    return (
        <div className="p-3 mb-4 bg-light rounded">
            <h1 className="mt-5">Datos iniciales</h1>
            <p>Ingresa los datos iniciales para generar tus documentos. Llena correctamente cada campo, ya que el documento se generará según la información ingresada. Por motivos de privacidad, no guardamos la información más que temporalmente, así que evita actualizar la página mientras completas tus datos. Gracias.</p>
            <form id="miFormulario" onSubmit={validarFormulario}>
                <SeccionDatosAlumno formData={formData} handleChange={handleChange} />
                <SeccionDatosResponsable formData={formData} handleChange={handleChange} />
                <button type="submit" className="btn btn-primary">Guardar y continuar</button>
            </form>
        </div>
    );
}

// Componente para la sección de datos del alumno
const SeccionDatosAlumno = ({ formData, handleChange }) => (
    <div className="p-3 mb-4 bg-white border rounded">
        <h2 className="mt-4">Datos del alumno</h2>
        <FormGroup label="Apellidos del alumno" id="apellidosAlumno" type="text" value={formData.apellidosAlumno} handleChange={handleChange} />
        <FormGroup label="Nombre(s) del alumno" id="nombresAlumno" type="text" value={formData.nombresAlumno} handleChange={handleChange} />
        <FormGroup label="Fecha de nacimiento del alumno" id="fechaNacimientoAlumno" type="date" value={formData.fechaNacimientoAlumno} handleChange={handleChange} />
        <FormGroup label="Edad del alumno" id="edadAlumno" type="number" value={formData.edadAlumno} readOnly />
        <FormGroup label="CURP del alumno" id="curpAlumno" type="text" value={formData.curpAlumno} handleChange={handleChange} />
    </div>
);

// Componente para la sección de datos del responsable legal
const SeccionDatosResponsable = ({ formData, handleChange }) => (
    <div className="p-3 mb-4 bg-white border rounded">
        <h2 className="mt-4">Datos del responsable legal del alumno</h2>
        <FormGroup label="Apellidos del responsable legal del alumno" id="apellidosResponsable" type="text" value={formData.apellidosResponsable} handleChange={handleChange} />
        <FormGroup label="Nombre(s) del responsable legal del alumno" id="nombresResponsable" type="text" value={formData.nombresResponsable} handleChange={handleChange} />
        <FormGroup label="Teléfono de contacto" id="telefonoContacto" type="tel" value={formData.telefonoContacto} handleChange={handleChange} smallText="Es posible que nos contactemos a este número vía WhatsApp para dar seguimiento a esta información." />
        <FormGroup label="Email de contacto" id="emailContacto" type="email" value={formData.emailContacto} handleChange={handleChange} smallText="Es posible que nos comuniquemos a este correo para dar seguimiento a esta información." />
    </div>
);

// Componente reutilizable para un grupo de formulario
const FormGroup = ({ label, id, type, value, handleChange, readOnly = false, smallText = null }) => (
    <div className="form-group">
        <label htmlFor={id}>{label}: <span className="text-danger">*</span></label>
        <input type={type} className="form-control" id={id} value={value} onChange={handleChange} readOnly={readOnly} required />
        {smallText && <small className="form-text text-muted">{smallText}</small>}
    </div>
);

export default DatosIniciales;
