// src/components/Register.js

import React, { useState } from 'react';
import { register } from '../services/firebaseService';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = () => {
        if (!email || !password) {
            setError('Por favor, complete todos los campos');
            return;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setError('Por favor, ingrese un correo electrónico válido');
            return;
        }
        register(email, password)
            .then(() => setError(''))
            .catch((err) => setError(err.message));
    };

    return (
        <div className="container">
            <h2>Registrar</h2>
            {error && <p className="text-danger">{error}</p>}
            <div className="mb-3">
                <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button onClick={handleRegister} className="btn btn-primary">Registrar</button>
        </div>
    );
};

export default Register;
