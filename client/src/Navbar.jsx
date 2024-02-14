import React from 'react';
import './Navbar.css'; // CSS fájl importálása
import SignInButton from './SignInButton';
import { HU, GB } from 'country-flag-icons/react/3x2';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-items">
        <img src={process.env.PUBLIC_URL + '/logo.png'} alt="VEHO Logo" className="logo" />
        <div className="navbar-right">
          <ul className="navbar-items-right">
            <li><HU title="Magyarország" style={{ width: '40px', height: 'auto' }} /></li>
            <li><GB title="United Kingdom" style={{ width: '40px', height: 'auto' }} /></li>
            <li><SignInButton /></li>
          </ul>
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
