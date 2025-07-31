import { useAtom } from "jotai";
import { useAuth } from "../hooks/useAuth";
import { languageAtom } from "../store/languageAtom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { Label } from "@radix-ui/react-select";

// Szövegek
const texts = {
  hu: {
    title: "Profil",
    email: "Email",
    notSignedIn: "Kérjük, jelentkezz be a profil megtekintéséhez.",
    signIn: "Bejelentkezés",
  },
  en: {
    title: "Profile",
    email: "Email",
    notSignedIn: "Please sign in to view your profile.",
    signIn: "Sign In",
  },
};

function Profile() {
  const [language] = useAtom(languageAtom);
  const user = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <Card className="w-full max-w-md mx-auto bg-white dark:bg-slate-800">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center">
              {texts[language].title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {user ? (
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-600 dark:text-gray-300">
                    {texts[language].email}
                  </Label>
                  <p className="text-lg">{user.email}</p>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {texts[language].notSignedIn}
                </p>
                <Button
                  asChild
                  className="bg-indigo-500 text-white hover:bg-indigo-600"
                >
                  <Link to="/login">{texts[language].signIn}</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

export default Profile;
