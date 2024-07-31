// src/components/FormGroup.js
import React from 'react';
import { Field, ErrorMessage } from 'formik';

/**
 * Componente para un grupo de formulario reutilizable.
 */
const FormGroup = ({ name, label, type = 'text', required = false, readOnly = false, helperText }) => (
    <div className="mb-3">
        <label htmlFor={name} className="form-label">
            {label} {required && <span className="text-danger">*</span>}
        </label>
        <Field
            name={name}
            type={type}
            as={type === 'textarea' ? 'textarea' : 'input'}
            className="form-control"
            id={name}
            required={required}
            readOnly={readOnly}
        />
        {helperText && <small className="form-text text-muted">{helperText}</small>}
        <ErrorMessage name={name} component="div" className="text-danger" />
    </div>
);

export default FormGroup;
