import { useAtom } from "jotai";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { languageAtom } from "../store/languageAtom";
import AuthButton from "./AuthButton";
import { Button } from "./ui/button";

function Header() {
  const [language, setLanguage] = useAtom(languageAtom);

  return (
    <header className="bg-white dark:bg-slate-800 shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/">
          <img src="/logo.png" alt="Veho Logo" className="h-10" />
        </Link>
        <nav className="flex items-center gap-4">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Nyelv" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hu">Magyar</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
          <Link to="/profile">
            <Button
              variant="ghost"
              className="text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950"
            >
              Profil
            </Button>
          </Link>
          <AuthButton />
        </nav>
      </div>
    </header>
  );
}

export default Header;
