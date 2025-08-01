import { useAtom } from "jotai";
import { languageAtom } from "../store/languageAtom";
import Footer from "../components/Footer";

// Szövegek
const texts = {
  hu: {
    title: "Adatvédelmi irányelvek",
    content:
      "Ez az oldal az adatvédelmi irányelveinket tartalmazza. Kérjük, olvassa el figyelmesen.",
  },
  en: {
    title: "Privacy Policy",
    content: "This page contains our privacy policy. Please read it carefully.",
  },
};

function PrivacyPolicy() {
  const [language] = useAtom(languageAtom);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-semibold text-center mb-6">
          {texts[language].title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {texts[language].content}
        </p>
      </main>
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
