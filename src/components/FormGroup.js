// src/components/FormGroup.js
import React from 'react';
import PropTypes from 'prop-types';
import { Form as BootstrapForm } from 'react-bootstrap';
import { Field, ErrorMessage } from 'formik';

const FormGroup = ({ name, label, type = 'text', required = false, readOnly = false, onChange, helperText = '', value }) => (
    <BootstrapForm.Group controlId={name} className="mb-3">
        <BootstrapForm.Label>{label}</BootstrapForm.Label>
        <Field
            name={name}
            type={type}
            placeholder={label}
            className="form-control"
            required={required}
            readOnly={readOnly}
            onChange={onChange}
            value={value}
        />
        <ErrorMessage name={name} component="div" className="text-danger" />
        {helperText && <small className="form-text text-muted">{helperText}</small>}
    </BootstrapForm.Group>
);

FormGroup.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    required: PropTypes.bool,
    readOnly: PropTypes.bool,
    onChange: PropTypes.func,
    helperText: PropTypes.string,
    value: PropTypes.any,
};

export default FormGroup;
