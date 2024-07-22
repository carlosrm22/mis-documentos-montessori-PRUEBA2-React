import React, { useState } from 'react';
import Swal from 'sweetalert2';

function Formulario() {
    const [formData, setFormData] = useState({
        apellidosAlumno: '',
        nombresAlumno: '',
        fechaNacimientoAlumno: '',
        edadAlumno: '',
        apellidosPadreTutor: '',
        nombresPadreTutor: '',
        apellidosMadreTutora: '',
        nombresMadreTutora: '',
        telefonoContacto: '',
        emailContacto: '',
    });

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
            edadAlumno: name === 'fechaNacimientoAlumno' ? calcularEdad(value) : formData.edadAlumno,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!Object.values(formData).every(field => field)) {
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
        Object.keys(formData).forEach(key => {
            localStorage.setItem(key, formData[key]);
        });

        Swal.fire({
            icon: 'success',
            title: 'Formulario enviado correctamente',
            showConfirmButton: false,
            timer: 1500
        });

        // Redirigir a la siguiente sección
        // window.location.href = 'datos_personales.html';
    };

    return (
        <div className="container mt-5">
            <div className="p-3 mb-4 bg-light rounded">
                <h1 className="mt-5">Datos iniciales</h1>
                <p>
                    Por favor, ingresa los datos iniciales para que podamos generar tus documentos. Asegúrate de llenar correctamente cada campo, ya que tu documento se generará exactamente como ingreses la información.
                </p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="p-3 mb-4 bg-white border rounded">
                    <h2 className="mt-4">Datos del alumno</h2>
                    <div className="form-group">
                        <label>Apellidos del alumno: <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" name="apellidosAlumno" value={formData.apellidosAlumno} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Nombre(s) del alumno: <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" name="nombresAlumno" value={formData.nombresAlumno} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Fecha de nacimiento del alumno: <span className="text-danger">*</span></label>
                        <input type="date" className="form-control" name="fechaNacimientoAlumno" value={formData.fechaNacimientoAlumno} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Edad del alumno: <span className="text-danger">*</span></label>
                        <input type="number" className="form-control" name="edadAlumno" value={formData.edadAlumno} readOnly required />
                    </div>
                </div>

                <div className="p-3 mb-4 bg-white border rounded">
                    <h2 className="mt-4">Datos de los Padres o Tutores</h2>
                    <div className="form-group">
                        <label>Apellidos del padre o tutor: <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" name="apellidosPadreTutor" value={formData.apellidosPadreTutor} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Nombre(s) del padre o tutor: <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" name="nombresPadreTutor" value={formData.nombresPadreTutor} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Apellidos de la madre o tutora: <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" name="apellidosMadreTutora" value={formData.apellidosMadreTutora} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Nombre(s) de la madre o tutora: <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" name="nombresMadreTutora" value={formData.nombresMadreTutora} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Teléfono de contacto: <span className="text-danger">*</span></label>
                        <input type="tel" className="form-control" name="telefonoContacto" value={formData.telefonoContacto} onChange={handleChange} required />
                        <small className="form-text text-muted">Es posible que nos contactemos a este número vía WhatsApp para dar seguimiento a esta información.</small>
                    </div>
                    <div className="form-group">
                        <label>Email de contacto: <span className="text-danger">*</span></label>
                        <input type="email" className="form-control" name="emailContacto" value={formData.emailContacto} onChange={handleChange} required />
                        <small className="form-text text-muted">Es posible que nos comuniquemos a este correo para dar seguimiento a esta información.</small>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Guardar y continuar</button>
            </form>
        </div>
    );
}

export default Formulario;
