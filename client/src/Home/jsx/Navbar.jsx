import React, { useState, useEffect } from 'react';
import '../css/Navbar.css';
import SignInButton from './SignInButton';
import { HU, GB } from 'country-flag-icons/react/3x2';
import Cookies from 'js-cookie';

const Navbar = () => {
  const [language, setLanguage] = useState('hu');

  useEffect(() => {
    const storedLanguage = Cookies.get('language');
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    Cookies.set('language', lang, { expires: 30 }); 
    
  };

  return (
    <nav className="navbar">
      <ul className="navbar-items">
        <img src={process.env.PUBLIC_URL + '/logo.png'} alt="VEHO Logo" className="logo" />
        <div className="navbar-right">
          <ul className="navbar-items-right">
            <li><button className="flag-button" onClick={() => changeLanguage('hu')}><HU title="Magyarország" style={{ width: '40px', height: 'auto', }} /></button></li>
            <li><button className="flag-button" onClick={() => changeLanguage('en')}><GB title="United Kingdom" style={{ width: '40px', height: 'auto' }} /></button></li>
            <li><SignInButton /></li>
          </ul>
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;