import { useAtom } from "jotai";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { LogIn, LogOut } from "lucide-react";
import { languageAtom } from "../store/languageAtom";
import { useAuth } from "../hooks/useAuth";
import { auth } from "../lib/firebase";

// Szövegek a signin.json alapján
const texts = {
  hu: { text: "Bejelentkezés", signOut: "Kijelentkezés" },
  en: { text: "Sign In", signOut: "Sign Out" },
};

function AuthButton() {
  const [language] = useAtom(languageAtom);
  const user = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await auth.signOut();
    navigate("/");
  };

  return user ? (
    <Button
      variant="outline"
      onClick={handleSignOut}
      className="flex items-center gap-2 text-indigo-500 border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950"
    >
      <LogOut className="h-4 w-4" />
      {texts[language].signOut}
    </Button>
  ) : (
    <Link to="/login">
      <Button className="flex items-center gap-2 bg-indigo-500 text-white hover:bg-indigo-600">
        <LogIn className="h-4 w-4" />
        {texts[language].text}
      </Button>
    </Link>
  );
}

export default AuthButton;
