// src/components/FormGroup.js
import React from 'react';
import PropTypes from 'prop-types';
import { Field, ErrorMessage } from 'formik';

/**
 * Componente para un grupo de formulario reutilizable.
 */
const FormGroup = ({ name, label, type = 'text', required = false, readOnly = false, helperText, onChange }) => (
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
            onChange={onChange} // Añade esta línea para manejar el cambio solo si se proporciona
        />
        {helperText && <small className="form-text text-muted">{helperText}</small>}
        <ErrorMessage name={name} component="div" className="text-danger" />
    </div>
);

FormGroup.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    required: PropTypes.bool,
    readOnly: PropTypes.bool,
    helperText: PropTypes.string,
    onChange: PropTypes.func,
};

export default FormGroup;
