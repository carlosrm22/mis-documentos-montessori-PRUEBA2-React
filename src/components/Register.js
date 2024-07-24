// src/components/Register.js

import React, { useState } from 'react';
import { register } from '../services/firebaseService';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        register(email, password);
    };

    return (
        <div>
            <h2>Registrar</h2>
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
            <button onClick={handleRegister}>Registrar</button>
        </div>
    );
};

export default Register;
