import React, { useEffect } from "react";
import Home from "./Home/Home";
import Cookies from "js-cookie";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login/jsx/login.jsx";
import Register from "./Login/jsx/register.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  useEffect(() => {
    Cookies.set("language", "hu", { expires: 30 });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
