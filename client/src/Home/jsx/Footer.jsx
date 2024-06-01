import React from 'react';
import '../css/Footer.css';

const Footer = () => {
    return (
        <footer>
            <div>
                <p>Készítette: Szauter Ajtony</p>
                <p>Készült: 2024</p>
                <div className="contact-info">
                    <p>Telefon: <a href="tel:+36301234567">+36 30 123 4567</a></p>
                    <p>Email: <a href="mailto:ajtony.szauter@veho.com">ajtony.szauter@veho.com</a></p>
                </div>
                <div className="footer-bottom">
                    <p><a href="/privacy-policy">Privacy Policy</a></p>
                    <p>Veho © 2024</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
