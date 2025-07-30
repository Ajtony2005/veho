import { useState, useEffect } from "react";
import "../css/Footer.css";
import texts from "../json/footer.json";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Footer = () => {
  const [language, setLanguage] = useState("hu");

  useEffect(() => {
    const storedLanguage = cookies.get("language");
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }

    const interval = setInterval(() => {
      const currentLanguage = cookies.get("language");
      if (currentLanguage && currentLanguage !== language) {
        setLanguage(currentLanguage);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [language]);
  const getText = (key) => {
    return texts[language][key];
  };

  return (
    <footer>
      <div>
        <p>{getText("author")}: Szauter Ajtony</p>
        <p>{getText("year")}: 2024</p>
        <div className="contact-info">
          <p>
            {getText("phone")}: <a href="tel:+36301234567">+36 30 123 4567</a>
          </p>
          <p>
            Email:{" "}
            <a href="mailto:ajtony.szauter@veho.com">ajtony.szauter@veho.com</a>
          </p>
        </div>
        <div className="footer-bottom">
          <p>
            <a href="/privacy-policy">Privacy Policy</a>
          </p>
          <p>Veho © 2024</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
