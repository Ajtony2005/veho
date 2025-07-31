import { useState, useEffect, forwardRef } from "react";
import { useAtom } from "jotai";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { languageAtom } from "../store/languageAtom";

// Statikus JSON adatok az eredeti JSON-ból
const content = {
  hu: [
    {
      title: "Mi az a Veho?",
      description:
        "A Veho egy online platform, ahol könnyedén megoszthatod ötleteidet másokkal, és együttműködhetsz azok megvalósításában, részletesen bemutathatod ötletedet és problémamegoldó képességét.",
      imagePath: "/idea.png",
    },
    {
      title: "Van egy ötletem, hogyan tudom megoszthatni?",
      description:
        'Az ötletek megosztásához regisztrálnod kell a Veho-ra, majd a főoldalon található "Ötlet megosztása" gombra kattintva tudod feltölteni az ötletedet.',
      imagePath: "/idea2.png",
    },
    {
      title:
        "Nincs ötletem, de szeretnék segíteni másoknak, hogyan tudom ezt megtenni?",
      description:
        'Regisztrálj a weboldalon és böngéssz az ötletek között, ha találsz olyat, amiben segíteni tudsz, írj a felhasználónak és egyeztessetek a részletekről. Ha nincs ötleted, de szeretnél segíteni, akkor a főoldalon található "Ötletek" menüpontban tudsz keresni.',
      imagePath: "/idea3.jpg",
    },
    {
      title: "Hogyan tudok csapatot találni az ötletem megvalósításához?",
      description:
        'A Veho-n található ötletek között böngészve találhatsz olyan ötleteket, amelyek érdekelnek, és amelyekhez csatlakozni szeretnél. Az ötlet oldalán található "Csatlakozás" gombra kattintva tudod jelezni az ötlet tulajdonosának, hogy csatlakoznál az ötlet megvalósításához.',
      imagePath: "/group.jpg",
    },
    {
      title: "Hány ötletet tudok megosztani?",
      description:
        "Bármennyi ötletet megoszthatsz, amennyit csak szeretnél, azonban arra kérünk, hogy csak olyan ötleteket osztass meg, amelyek valóban megvalósíthatóak és értéket adnak a közösségnek.",
      imagePath: "/idea3.png",
    },
  ],
  en: [
    {
      title: "What is Veho?",
      description:
        "Veho is an online platform where you can easily share your ideas with others, collaborate on their implementation, showcase your ideas in detail and demonstrate your problem-solving skills.",
      imagePath: "/idea.png",
    },
    {
      title: "I have an idea, how can I share it?",
      description:
        'To share ideas, you need to register on Veho, then click on the "Share Idea" button on the homepage to upload your idea.',
      imagePath: "/idea2.png",
    },
    {
      title:
        "I don't have an idea, but I want to help others, how can I do this?",
      description:
        'Register on the website and browse through the ideas. If you find one where you can help, write to the user and discuss the details. If you don\'t have an idea but want to help, you can search in the "Ideas" section on the homepage.',
      imagePath: "/idea3.jpg",
    },
    {
      title: "How can I find a team to implement my idea?",
      description:
        'By browsing through the ideas on Veho, you can find ones that interest you and that you want to join. Click on the "Join" button on the idea page to let the idea owner know that you would like to join in implementing the idea.',
      imagePath: "/group.jpg",
    },
    {
      title: "How many ideas can I share?",
      description:
        "You can share as many ideas as you want, but we ask that you only share ideas that are truly feasible and add value to the community.",
      imagePath: "/idea3.png",
    },
  ],
};

interface InformationProps {
  // Üres prop objektum, de később bővíthető
}

const Information = forwardRef<HTMLDivElement, InformationProps>(
  (props, ref) => {
    const [index, setIndex] = useState(0);
    const [language] = useAtom(languageAtom);

    // Index visszaállítása nyelvváltáskor
    useEffect(() => {
      setIndex(0);
    }, [language]);

    const handleNext = () => {
      setIndex((prevIndex) => (prevIndex + 1) % content[language].length);
    };

    const handlePrevious = () => {
      setIndex(
        (prevIndex) =>
          (prevIndex - 1 + content[language].length) % content[language].length
      );
    };

    const { title, description, imagePath } = content[language][index];

    return (
      <section ref={ref} className="py-12 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Kör alakú kép */}
            <div className="relative w-full md:w-1/2">
              <div className="absolute inset-0 rounded-full bg-indigo-200 dark:bg-indigo-800 opacity-50 blur-xl"></div>
              <img
                src={imagePath}
                alt={title}
                className="relative w-full max-w-md mx-auto rounded-lg shadow-lg object-cover"
              />
            </div>
            {/* Szöveg és navigáció */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                {title}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                {description}
              </p>
              <div className="flex justify-center md:justify-start gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePrevious}
                  className="border-indigo-500 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNext}
                  className="border-indigo-500 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

Information.displayName = "Information";

export default Information;
