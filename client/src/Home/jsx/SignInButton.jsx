import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginIcon from '@mui/icons-material/Login';

const SignInButton = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
    // Ide írd bele a további műveleteket, amelyeket szeretnél végrehajtani a gombra kattintás után
  };

  return (
    <button className="btn btn-outline-warning btn-sm btn-block" onClick={handleClick}>
      <LoginIcon /> Bejelentkezés
    </button>
  );
};

export default SignInButton;