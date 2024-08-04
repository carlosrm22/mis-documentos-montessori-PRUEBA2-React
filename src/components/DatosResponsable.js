import React from 'react';
import FormGroup from './FormGroup';

const DatosResponsable = ({ handleChange, isReadOnly }) => (
    <div className="p-3 mb-4 bg-white border rounded">
        <h2 className="mt-4">Datos del responsable legal del alumno</h2>
        <FormGroup name="apellidosResponsable" label="Apellidos del responsable legal del alumno" required readOnly={isReadOnly} onChange={handleChange} />
        <FormGroup name="nombresResponsable" label="Nombre(s) del responsable legal del alumno" required readOnly={isReadOnly} onChange={handleChange} />
        <FormGroup name="telefonoContacto" label="Teléfono de contacto" type="tel" required readOnly={isReadOnly} helperText="Es posible que nos contactemos a este número vía WhatsApp para dar seguimiento a esta información." onChange={handleChange} />
        <FormGroup name="emailContacto" label="Email de contacto" type="email" required readOnly={isReadOnly} helperText="Es posible que nos comuniquemos a este correo para dar seguimiento a esta información." onChange={handleChange} />
    </div>
);

export default DatosResponsable;
