import { useAtom } from "jotai";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Sun, Moon, User, Globe } from "lucide-react";
import { languageAtom } from "../store/languageAtom";
import { userAtom } from "../store/userAtom";
import AuthButton from "./AuthButton";
import { useState, useEffect } from "react";

function Header() {
  const [language, setLanguage] = useAtom(languageAtom);
  const [user] = useAtom(userAtom);
  const [theme, setTheme] = useState("light");

  // Téma inicializálása
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  // Sötét/világos mód váltás
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <header className="bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 transition-all duration-300">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 pointer-events-none"></div>

      <div className="container mx-auto px-4 py-4 relative">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <Link to="/" className="group">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="/logo.png"
                  alt="Veho Logo"
                  className="h-10 transition-all duration-300 group-hover:scale-105 drop-shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Veho
                </span>
              </div>
            </div>
          </Link>

          {/* Navigation Section */}
          <nav className="flex items-center gap-3">
            {/* Language Selector */}
            {!user && (
              <div className="relative">
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-[120px] bg-white/10 border-white/30 text-white/90 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm focus:border-primary/60">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-white/70" />
                      <SelectValue
                        placeholder={language === "hu" ? "Nyelv" : "Language"}
                      />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-white/10 backdrop-blur-xl border-white/30 text-white">
                    <SelectItem
                      value="hu"
                      className="hover:bg-white/20 focus:bg-white/20 cursor-pointer"
                    >
                      🇭🇺 Magyar
                    </SelectItem>
                    <SelectItem
                      value="en"
                      className="hover:bg-white/20 focus:bg-white/20 cursor-pointer"
                    >
                      🇺🇸 English
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Home Link */}

            {/* Profile Button (if user is logged in) */}
            {user && (
              <Link to="/profile" className="group">
                <Button
                  variant="ghost"
                  className="bg-white/10 border border-white/30 text-white/90 hover:bg-primary/20 hover:border-primary/40 transition-all duration-300 backdrop-blur-sm group-hover:shadow-lg"
                >
                  <User className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                  <span className="hidden sm:inline">
                    {language === "hu" ? "Profil" : "Profile"}
                  </span>
                </Button>
              </Link>
            )}

            {!user && (
              // Theme Toggle
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="bg-white/10 border border-white/30 text-white/90 hover:bg-white/20 hover:border-accent/40 transition-all duration-300 backdrop-blur-sm group"
              >
                <div className="relative">
                  {theme === "light" ? (
                    <Moon className="h-5 w-5 transition-all duration-300 group-hover:rotate-12" />
                  ) : (
                    <Sun className="h-5 w-5 transition-all duration-300 group-hover:rotate-180" />
                  )}
                </div>
              </Button>
            )}

            {/* Auth Button (if user is not logged in) */}

            {/* Auth Button */}
            <div className="relative">
              <AuthButton />
            </div>
          </nav>
        </div>
      </div>

      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
    </header>
  );
}

export default Header;
