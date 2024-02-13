import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignInButton = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
    // Ide írd bele a további műveleteket, amelyeket szeretnél végrehajtani a gombra kattintás után
  };

  return (
    <button className="btn btn-outline-warning btn-sm btn-block" onClick={handleClick}>Bejelentkezés</button>
  );
};

export default SignInButton;
