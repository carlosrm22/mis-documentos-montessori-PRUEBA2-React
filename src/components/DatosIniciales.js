import React from 'react';
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';

function DatosIniciales({ formData, setFormData }) {
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;

        setFormData((prevFormData) => {
            const newFormData = { ...prevFormData, [id]: value };

            if (id === 'fechaNacimientoAlumno') {
                const edad = calcularEdad(value);
                newFormData.edadAlumno = edad;
            }

            return newFormData;
        });
    };

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



    const validarFormulario = (e) => {
        e.preventDefault();
        if (!Object.values(formData).every(field => typeof field === 'string' ? field.trim() !== '' : field !== '')) {
            Swal.fire({
                icon: 'error',
                title: 'Ups, faltan datos',
                text: 'Por favor, completa todos los campos obligatorios.',
            });
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

    const guardarYContinuar = () => {
        // Guardar la información en variables
        localStorage.setItem('formData', JSON.stringify(formData));

        // Mostrar alerta de éxito con SweetAlert2
        Swal.fire({
            icon: 'success',
            title: 'Formulario enviado correctamente',
            showConfirmButton: false,
            timer: 1500
        });

        // Redirigir a la siguiente sección
        navigate('/aviso-privacidad');
    };


    return (
        <div className="p-3 mb-4 bg-light rounded">
            <h1 className="mt-5">Datos iniciales</h1>
            <p>Ingresa los datos iniciales para generar tus
                documentos. Llena correctamente cada campo,
                ya que el documento se generará según la
                información ingresada. Por motivos de
                privacidad, no guardamos la información más
                que temporalmente, así que evita actualizar la
                página mientras completas tus datos. Gracias.</p>
            <form id="miFormulario" onSubmit={validarFormulario}>
                <div className="p-3 mb-4 bg-white border rounded">
                    <h2 className="mt-4">Datos del alumno</h2>
                    <div className="form-group">
                        <label htmlFor="apellidosAlumno">Apellidos del alumno: <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="apellidosAlumno" value={formData.apellidosAlumno} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nombresAlumno">Nombre(s) del alumno: <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="nombresAlumno" value={formData.nombresAlumno} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fechaNacimientoAlumno">Fecha de nacimiento del alumno: <span className="text-danger">*</span></label>
                        <input type="date" className="form-control" id="fechaNacimientoAlumno" value={formData.fechaNacimientoAlumno} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="edadAlumno">Edad del alumno: <span className="text-danger">*</span></label>
                        <input type="number" className="form-control" id="edadAlumno" value={formData.edadAlumno} readOnly required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="curpAlumno">CURP del alumno: <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="curpAlumno" value={formData.curpAlumno} onChange={handleChange} required />
                    </div>
                </div>

                <div className="p-3 mb-4 bg-white border rounded">
                    <h2 className="mt-4">Datos del responsable legal del alumno</h2>
                    <div className="form-group">
                        <label htmlFor="apellidosResponsable">Apellidos del responsable legal del alumno: <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="apellidosResponsable" value={formData.apellidosResponsable} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nombresResponsable">Nombre(s) del responsable legal del alumno: <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="nombresResponsable" value={formData.nombresResponsable} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="telefonoContacto">Teléfono de contacto: <span className="text-danger">*</span></label>
                        <input type="tel" className="form-control" id="telefonoContacto" value={formData.telefonoContacto} onChange={handleChange} required />
                        <small className="form-text text-muted">Es posible que nos contactemos a este número vía WhatsApp para dar seguimiento a esta información.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="emailContacto">Email de contacto: <span className="text-danger">*</span></label>
                        <input type="email" className="form-control" id="emailContacto" value={formData.emailContacto} onChange={handleChange} required />
                        <small className="form-text text-muted">Es posible que nos comuniquemos a este correo para dar seguimiento a esta información.</small>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Guardar y continuar</button>
            </form>
        </div>
    );
}

export default DatosIniciales;
