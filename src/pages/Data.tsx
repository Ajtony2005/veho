import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { languageAtom } from "../store/languageAtom";
import { useAuth } from "../hooks/useAuth";
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

// Ötlet típus a content.json alapján
interface DataItem {
  id: string;
  title: string;
  description: string;
  imagePath: string;
}

// Szövegek
const texts = {
  hu: {
    title: "Adatok",
    noData: "Még nincsenek adatok.",
    join: "Csatlakozás",
  },
  en: {
    title: "Data",
    noData: "No data yet.",
    join: "Join",
  },
};

function Data() {
  const [language] = useAtom(languageAtom);
  const user = useAuth();
  const [dataItems, setDataItems] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "ideas"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as DataItem[];
        setDataItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-semibold text-center mb-6">
          {texts[language].title}
        </h1>
        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            Betöltés...
          </p>
        ) : dataItems.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            {texts[language].noData}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataItems.map((item) => (
              <Card key={item.id} className="bg-white dark:bg-slate-800">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={`/${item.imagePath}`}
                    alt={item.title}
                    className="w-full h-48 object-cover mb-4 rounded"
                  />
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {item.description}
                  </p>
                  {user ? (
                    <Button
                      asChild
                      className="bg-indigo-500 text-white hover:bg-indigo-600"
                    >
                      <Link to={`/ideas/${item.id}`}>
                        {texts[language].join}
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      asChild
                      className="bg-indigo-500 text-white hover:bg-indigo-600"
                    >
                      <Link to="/login">{texts[language].join}</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Data;
