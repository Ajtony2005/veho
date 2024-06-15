import React, { useState } from 'react';
import '../css/login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
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
        // Implement your default login logic here
        console.log('Felhasználónév:', username);
        console.log('Jelszó:', password);
    };

    return (
        <div className="body-login">
        <div className="login-container">
            <div className="login-box">
                <form onSubmit={handleSubmit}>
                    <h1>Bejelentkezés</h1>
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
                    <div>
                        <input
                            type="password"
                            id="password"
                            placeholder="Jelszó"
                            className="login-input"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <button type="submit" className="login-button" >Bejelentkezés</button>
                    <div class="login-buttons">
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
                </form>
            </div>
        </div>
        </div>
    );
};

export default Login;
