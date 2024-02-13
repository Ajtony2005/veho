import React from 'react';
import './Navbar.css'; // CSS fájl importálása
import SignInButton from './SignInButton';
import { HU, GB } from 'country-flag-icons/react/3x2';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <img src={process.env.PUBLIC_URL + '/logo.png'} alt="VEHO Logo" className="logo" style={{ width: '80px', height: 'auto' }} />
        <li><HU title="Magyarország" style={{ width: '40px', height: 'auto' }} /></li>
        <li><GB title="United Kingdom" style={{ width: '40px', height: 'auto' }} /></li>
        <li><SignInButton /></li>
      </ul>
    </nav>
  );
}

export default Navbar;
