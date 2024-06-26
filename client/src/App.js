import React, { useEffect } from 'react';
import Home from './Home/Home'
import Cookies from 'js-cookie';
import { BrowserRouter, Routes, Route } from 'react-router-dom';  
import Login from './Login/jsx/login.jsx';

function App() {
  useEffect(() => {
    Cookies.set('language', 'hu', { expires: 30 }); 
  }, []);
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
