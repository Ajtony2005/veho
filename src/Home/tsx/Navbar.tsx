import { useState, useEffect } from "react";
import "../css/Navbar.css";
import SignInButton from "./SignInButton.tsx";
import { HU, GB } from "country-flag-icons/react/3x2";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Navbar = () => {
  const [language, setLanguage] = useState(cookies.get("language") || "hu");

  useEffect(() => {
    console.log(language);
    const storedLanguage = cookies.get("language");
    if (storedLanguage !== language) {
      cookies.set("language", language, {
        path: "/",
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 napos lejárati idő
        sameSite: "Lax",
        secure: false,
      });
    }
  }, [language]);

  const changeLanguage = (lang: string) => {
    console.log(lang);
    setLanguage(lang); // Nyelv frissítése állapotban
    cookies.set("language", lang, {
      path: "/",
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 napos lejárati idő
      sameSite: "Lax",
      secure: false,
    });
  };

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <ul className="navbar-items">
        <img
          src={`${import.meta.env.VITE_PUBLIC_URL}logo.png`}
          alt="VEHO Logo"
          className="logo"
          onClick={reloadPage}
        />
        <div className="navbar-right">
          <ul className="navbar-items-right">
            <li>
              <p>{language}</p>
              <button
                className="flag-button"
                onClick={() => changeLanguage("hu")}
              >
                <HU
                  title="Magyarország"
                  style={{ width: "40px", height: "auto" }}
                />
              </button>
            </li>
            <li>
              <button
                className="flag-button"
                onClick={() => changeLanguage("en")}
              >
                <GB
                  title="United Kingdom"
                  style={{ width: "40px", height: "auto" }}
                />
              </button>
            </li>
            <li>
              <SignInButton />
            </li>
          </ul>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
