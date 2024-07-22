import React, { useState } from 'react';
import Swal from 'sweetalert2';

function DatosIniciales() {
    const [formData, setFormData] = useState({
        apellidosAlumno: '',
        nombresAlumno: '',
        fechaNacimientoAlumno: '',
        edadAlumno: '',
        curpAlumno: '',
        apellidosResponsable: '',
        nombresResponsable: '',
        telefonoContacto: '',
        emailContacto: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });

        if (id === 'fechaNacimientoAlumno') {
            const edad = calcularEdad(value);
            setFormData({ ...formData, edadAlumno: edad });
        }
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

    const validarFormulario = () => {
        if (!Object.values(formData).every(field => field.trim() !== '')) {
            Swal.fire({
                icon: 'error',
                title: 'Ups, faltan datos',
                text: 'Por favor, completa todos los campos obligatorios.',
            });
            return false;
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
            return false;
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

        // Redirigir a la siguiente sección (opcional)
        // window.location.href = 'datos_personales.html'; // Descomenta y actualiza esta línea para redirigir a la página siguiente
    };

    return (
        <div className="p-3 mb-4 bg-light rounded">
            <h1 className="mt-5">Datos iniciales</h1>
            <p>Por favor, ingresa los datos iniciales para que podamos generar tus documentos. Asegúrate de llenar correctamente cada campo, ya que tu documento se generará exactamente como ingreses la información.</p>
            <form id="miFormulario" enctype="multipart/form-data" onSubmit={validarFormulario}>
                {/* Datos del alumno */}
                <div className="p-3 mb-4 bg-white border rounded">
                    <h2 className="mt-4">Datos del alumno</h2>
                    <div className="form-group">
                        <label for="apellidosAlumno">Apellidos del alumno: <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="apellidosAlumno" value={formData.apellidosAlumno} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label for="nombresAlumno">Nombre(s) del alumno: <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="nombresAlumno" value={formData.nombresAlumno} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label for="fechaNacimientoAlumno">Fecha de nacimiento del alumno: <span className="text-danger">*</span></label>
                        <input type="date" className="form-control" id="fechaNacimientoAlumno" value={formData.fechaNacimientoAlumno} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label for="edadAlumno">Edad del alumno: <span className="text-danger">*</span></label>
                        <input type="number" className="form-control" id="edadAlumno" value={formData.edadAlumno} readOnly required />
                    </div>
                    <div className="form-group">
                        <label for="curpAlumno">CURP del alumno: <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="curpAlumno" value={formData.curpAlumno} onChange={handleChange} required />
                    </div>
                </div>

                {/* Datos del responsable legal del alumno */}
                <div className="p-3 mb-4 bg-white border rounded">
                    <h2 className="mt-4">Datos del responsable legal del alumno</h2>
                    <div className="form-group">
                        <label for="apellidosResponsable">Apellidos del responsable legal del alumno: <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="apellidosResponsable" value={formData.apellidosResponsable} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label for="nombresResponsable">Nombre(s) del responsable legal del alumno: <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" id="nombresResponsable" value={formData.nombresResponsable} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label for="telefonoContacto">Teléfono de contacto: <span className="text-danger">*</span></label>
                        <input type="tel" className="form-control" id="telefonoContacto" value={formData.telefonoContacto} onChange={handleChange} required />
                        <small className="form-text text-muted">Es posible que nos contactemos a este número vía WhatsApp para dar seguimiento a esta información.</small>
                    </div>
                    <div className="form-group">
                        <label for="emailContacto">Email de contacto: <span className="text-danger">*</span></label>
                        <input type="email" className="form-control" id="emailContacto" value={formData.emailContacto} onChange={handleChange} required />
                        <small className="form-text text-muted">Es posible que nos comuniquemos a este correo para dar seguimiento a esta información.</small>
                    </div>
                </div>

                {/* Botón de envío */}
                <button type="submit" className="btn btn-primary">Guardar y continuar</button>
            </form>
        </div>
    );
}

export default DatosIniciales;
