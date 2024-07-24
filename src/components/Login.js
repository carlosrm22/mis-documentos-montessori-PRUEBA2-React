// src/components/Login.js

import React, { useState } from 'react';
import { login } from '../services/firebaseService';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        if (!email || !password) {
            setError('Por favor, complete todos los campos');
            return;
        }
        login(email, password)
            .then(() => setError(''))
            .catch((err) => setError(err.message));
    };

    return (
        <div className="container">
            <h2>Iniciar Sesión</h2>
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
            <button onClick={handleLogin} className="btn btn-primary">Iniciar Sesión</button>
        </div>
    );
};

export default Login;
