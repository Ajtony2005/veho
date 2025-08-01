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
      className="btn-secondary flex items-center gap-2 border-secondary-500 text-secondary-foreground hover:bg-secondary-600 hover:text-secondary-foreground dark:hover:bg-secondary-600"
    >
      <LogOut className="h-4 w-4" />
      {texts[language].signOut}
    </Button>
  ) : (
    <Link to="/login">
      <Button className="btn-primary flex items-center gap-2 text-primary-foreground hover:bg-primary-600">
        <LogIn className="h-4 w-4" />
        {texts[language].text}
      </Button>
    </Link>
  );
}

export default AuthButton;
