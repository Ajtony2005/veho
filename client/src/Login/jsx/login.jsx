import React, { useState } from 'react';
import '../css/login.css'
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Itt lehetne hozzáadni a bejelentkezési logikát
        console.log('Felhasználónév:', username);
        console.log('Jelszó:', password);
    };

    return (
        <div>
            <h1>Bejelentkezés</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Felhasználónév:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Jelszó:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit">Bejelentkezés</button>
            </form>
        </div>
    );
};

export default Login;