import React from 'react';
import FormGroup from './FormGroup';

const DatosResponsable = ({ values, handleChange, isReadOnly }) => (
    <div className="p-3 mb-4 bg-white border rounded">
        <h2 className="mt-4">Datos del responsable legal del alumno</h2>
        <FormGroup name="apellidosResponsable" label="Apellidos del responsable legal del alumno" required readOnly={isReadOnly} onChange={handleChange} value={values.apellidosResponsable} />
        <FormGroup name="nombresResponsable" label="Nombre(s) del responsable legal del alumno" required readOnly={isReadOnly} onChange={handleChange} value={values.nombresResponsable} />
        <FormGroup name="telefonoContacto" label="Teléfono de contacto" type="tel" required readOnly={isReadOnly} helperText="Es posible que nos contactemos a este número vía WhatsApp para dar seguimiento a esta información." onChange={handleChange} value={values.telefonoContacto} />
        <FormGroup name="emailContacto" label="Email de contacto" type="email" required readOnly={isReadOnly} helperText="Es posible que nos comuniquemos a este correo para dar seguimiento a esta información." onChange={handleChange} value={values.emailContacto} />
    </div>
);

export default DatosResponsable;
