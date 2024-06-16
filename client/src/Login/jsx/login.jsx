import React, { useState } from 'react';
import '../css/login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleGoogleLogin = () => {
        // Implement Google login logic here
    };

    const handleFacebookLogin = () => {
        // Implement Facebook login logic here
    };

    const handleGitHubLogin = () => {
        // Implement GitHub login logic here
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isRegistering) {
            console.log('Email:', email);
            console.log('Felhasználónév:', username);
            console.log('Jelszó:', password);
        } else {
            console.log('Felhasználónév:', username);
            console.log('Jelszó:', password);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleForm = () => {
        setIsRegistering(!isRegistering);
    };

    return (
        <div className="body-login">
            <div className="login-container">
                <div className="login-box">
                    <form onSubmit={handleSubmit}>
                        <h1>{isRegistering ? 'Regisztráció' : 'Bejelentkezés'}</h1>
                        {isRegistering && (
                            <div>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Email"
                                    className="login-input"
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                            </div>
                        )}
                        <div>
                            <input
                                type="text"
                                id="username"
                                placeholder="Felhasználónév"
                                className="login-input"
                                value={username}
                                onChange={handleUsernameChange}
                            />
                        </div>
                        <div className="password-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Jelszó"
                                className="login-input"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <button
                                type="button"
                                className="password-toggle-button"
                                onClick={togglePasswordVisibility}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </button>
                        </div>
                        <button type="submit" className="login-button">
                            {isRegistering ? 'Regisztráció' : 'Bejelentkezés'}
                        </button>
                        
                            <div className="login-buttons">
                                <button type="button" onClick={handleGoogleLogin} className="login-button-google">
                                    <FontAwesomeIcon icon={faGoogle} />
                                </button>
                                <button type="button" onClick={handleFacebookLogin} className="login-button-facebook">
                                    <FontAwesomeIcon icon={faFacebook} />
                                </button>
                                <button type="button" onClick={handleGitHubLogin} className="login-button-github">
                                    <FontAwesomeIcon icon={faGithub} />
                                </button>
                            </div>
                        <div className="register-link">
                            <p>{isRegistering ? 'Már van fiókod? ' : 'Még nincs fiókod? '}
                                <a href="#" onClick={toggleForm}>{isRegistering ? 'Bejelentkezés itt' : 'Regisztrálj itt'}</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
