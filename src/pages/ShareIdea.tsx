import { useState } from "react";
import { useAtom } from "jotai";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../lib/firebase";
import { languageAtom } from "../store/languageAtom";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";

// Szövegek
const texts = {
  hu: {
    title: "Ötlet megosztása",
    ideaTitle: "Ötlet címe",
    description: "Leírás",
    imageUrl: "Kép URL",
    submit: "Megosztás",
    success: "Ötlet sikeresen megosztva!",
    error: "Hiba történt az ötlet megosztása során.",
    loginPrompt: "Kérjük, jelentkezz be az ötlet megosztásához.",
  },
  en: {
    title: "Share an Idea",
    ideaTitle: "Idea Title",
    description: "Description",
    imageUrl: "Image URL",
    submit: "Share",
    success: "Idea shared successfully!",
    error: "An error occurred while sharing the idea.",
    loginPrompt: "Please sign in to share an idea.",
  },
};

function ShareIdea() {
  const [language] = useAtom(languageAtom);
  const user = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError(texts[language].loginPrompt);
      return;
    }
    try {
      await addDoc(collection(db, "ideas"), {
        title,
        description,
        imagePath: imageUrl || "idea.png", // Alapértelmezett kép
        userId: user.uid,
        createdAt: new Date(),
      });
      setSuccess(texts[language].success);
      setTitle("");
      setDescription("");
      setImageUrl("");
      setTimeout(() => navigate("/ideas"), 2000);
    } catch (error: any) {
      setError(texts[language].error);
    }
  };

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
            {success && (
              <p className="text-green-500 text-center mb-4">{success}</p>
            )}
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {!user ? (
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {texts[language].loginPrompt}
                </p>
                <Button
                  asChild
                  className="bg-indigo-500 text-white hover:bg-indigo-600"
                >
                  <Link to="/login">{texts[language].loginPrompt}</Link>
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">{texts[language].ideaTitle}</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={texts[language].ideaTitle}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">
                    {texts[language].description}
                  </Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={texts[language].description}
                    className="mt-1"
                    rows={5}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="imageUrl">{texts[language].imageUrl}</Label>
                  <Input
                    id="imageUrl"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder={texts[language].imageUrl}
                    className="mt-1"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-indigo-500 text-white hover:bg-indigo-600"
                >
                  {texts[language].submit}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

export default ShareIdea;
