import { useAtom } from "jotai";
import { Link } from "react-router-dom";
import { languageAtom } from "../store/languageAtom";

// Statikus szövegek az eredeti footer.json alapján
const texts = {
  hu: {
    author: "Szerző",
    year: "Év",
    phone: "Telefonszám",
    email: "Email",
  },
  en: {
    author: "Author",
    year: "Year",
    phone: "Phone",
    email: "Email",
  },
};

function Footer() {
  const [language] = useAtom(languageAtom);

  const getText = (key: keyof (typeof texts)["hu"]) => {
    return texts[language][key];
  };

  return (
    <footer className="bg-slate-800 text-slate-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p>{getText("author")}: Szauter Ajtony</p>
            <p>{getText("year")}: 2025</p>
          </div>
          <div className="text-center">
            <p>
              {getText("phone")}:{" "}
              <a href="tel:+36301234567" className="hover:text-indigo-300">
                +36 30 123 4567
              </a>
            </p>
            <p>
              {getText("email")}:{" "}
              <a
                href="mailto:ajtony.szauter@veho.com"
                className="hover:text-indigo-300"
              >
                ajtony.szauter@veho.com
              </a>
            </p>
          </div>
          <div className="text-center md:text-right">
            <p>
              <Link to="/privacy-policy" className="hover:text-indigo-300">
                Privacy Policy
              </Link>
            </p>
            <p>Veho © 2025</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
