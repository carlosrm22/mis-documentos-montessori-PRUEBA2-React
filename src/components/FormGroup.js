// src/components/FormGroup.js

import React from 'react';
import { Field, ErrorMessage } from 'formik';

/**
 * Componente reutilizable para un grupo de formulario.
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.label - La etiqueta del campo.
 * @param {string} props.name - El nombre del campo.
 * @param {string} [props.type='text'] - El tipo de campo (por defecto es 'text').
 * @param {string} [props.helperText] - Texto de ayuda que se muestra debajo del campo.
 * @param {boolean} [props.readOnly=false] - Si el campo es de solo lectura.
 * @param {string} [props.value] - El valor del campo.
 */
const FormGroup = ({ label, name, type = 'text', helperText, readOnly = false, value }) => (
    <div className="form-group">
        <label htmlFor={name}>{label}: <span className="text-danger">*</span></label>
        <Field type={type} name={name} className="form-control" readOnly={readOnly} value={value} />
        <ErrorMessage name={name} component="div" className="text-danger" />
        {helperText && <small className="form-text text-muted">{helperText}</small>}
    </div>
);

export default FormGroup;
