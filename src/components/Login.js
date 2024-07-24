// src/components/Login.js

import React, { useState } from 'react';
import { login } from '../services/firebaseService';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        login(email, password);
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Iniciar Sesión</button>
        </div>
    );
};

export default Login;
