import { useAtom } from "jotai";
import { Link } from "react-router-dom";
import { Mail, Phone, Shield, Heart } from "lucide-react";
import { languageAtom } from "../store/languageAtom";

// Statikus szövegek az eredeti footer.json alapján
const texts = {
  hu: {
    author: "Szerző",
    year: "Év",
    phone: "Telefonszám",
    email: "Email",
    privacyPolicy: "Adatvédelmi Szabályzat",
    madeWith: "Készítve",
  },
  en: {
    author: "Author",
    year: "Year",
    phone: "Phone",
    email: "Email",
    privacyPolicy: "Privacy Policy",
    madeWith: "Made with",
  },
};

function Footer() {
  const [language] = useAtom(languageAtom);

  const getText = (key: keyof (typeof texts)["hu"]) => {
    return texts[language][key];
  };

  return (
    <footer className="relative py-12 overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-secondary/5 rounded-full blur-2xl"></div>
      </div>

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Author & Year Section */}
            <div className="text-center md:text-left space-y-3">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-primary/20 to-primary-600/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/30">
                  <Heart className="w-4 h-4 text-primary" />
                </div>
                <span className="text-white/90 font-medium">Veho</span>
              </div>

              <p className="text-white/70 transition-colors hover:text-white/90 duration-300">
                <span className="text-white/50 text-sm">
                  {getText("author")}:
                </span>
                <br />
                <span className="font-medium">Szauter Ajtony</span>
              </p>

              <p className="text-white/70 transition-colors hover:text-white/90 duration-300">
                <span className="text-white/50 text-sm">
                  {getText("year")}:
                </span>
                <br />
                <span className="font-medium">2025</span>
              </p>
            </div>

            {/* Contact Section */}
            <div className="text-center space-y-4">
              <h3 className="text-white/90 font-semibold mb-4">
                {language === "hu" ? "Kapcsolat" : "Contact"}
              </h3>

              <div className="space-y-3">
                <div className="group">
                  <p className="text-white/60 text-sm mb-1">
                    {getText("phone")}:
                  </p>
                  <a
                    href="tel:+36301234567"
                    className="inline-flex items-center gap-2 text-white/80 hover:text-primary transition-all duration-300 group-hover:scale-105"
                  >
                    <div className="w-5 h-5 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:border-primary/40 transition-colors">
                      <Phone className="w-3 h-3" />
                    </div>
                    <span className="font-medium">+36 30 123 4567</span>
                  </a>
                </div>

                <div className="group">
                  <p className="text-white/60 text-sm mb-1">
                    {getText("email")}:
                  </p>
                  <a
                    href="mailto:ajtony.szauter@veho.com"
                    className="inline-flex items-center gap-2 text-white/80 hover:text-primary transition-all duration-300 group-hover:scale-105"
                  >
                    <div className="w-5 h-5 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:border-primary/40 transition-colors">
                      <Mail className="w-3 h-3" />
                    </div>
                    <span className="font-medium">ajtony.szauter@veho.com</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Legal & Links Section */}
            <div className="text-center md:text-right space-y-4">
              <h3 className="text-white/90 font-semibold mb-4">
                {language === "hu" ? "Jogi információk" : "Legal"}
              </h3>

              <div className="space-y-3">
                <div className="group">
                  <Link
                    to="/privacy-policy"
                    className="inline-flex items-center gap-2 text-white/80 hover:text-primary transition-all duration-300 group-hover:scale-105"
                  >
                    <div className="w-5 h-5 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:border-primary/40 transition-colors">
                      <Shield className="w-3 h-3" />
                    </div>
                    <span className="font-medium">
                      {getText("privacyPolicy")}
                    </span>
                  </Link>
                </div>

                <p className="text-white/70 font-medium">Veho © 2025</p>
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="pt-8 border-t border-white/20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Made with love */}
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <span>{getText("madeWith")}</span>
                <Heart className="w-4 h-4 text-red-400 animate-pulse" />
                <span>
                  {language === "hu" ? "Magyarországon" : "in Hungary"}
                </span>
              </div>

              {/* Social links placeholder */}
              <div className="flex items-center gap-4">
                <div className="flex gap-3">
                  {/* Placeholder for future social links */}
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 hover:border-primary/40 transition-colors cursor-pointer opacity-50">
                    <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                  </div>
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 hover:border-primary/40 transition-colors cursor-pointer opacity-50">
                    <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                  </div>
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 hover:border-primary/40 transition-colors cursor-pointer opacity-50">
                    <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Version or build info */}
              <div className="text-white/40 text-xs">v1.0.0</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
