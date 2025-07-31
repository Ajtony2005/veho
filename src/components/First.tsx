import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { languageAtom } from "../store/languageAtom";
import Header from "./Header";
import Readmore from "./Readmore";
import { Button } from "./ui/button";

// Szövegek az eredeti First.json alapján
const texts = {
  hu: {
    initial: {
      title: "Üdvözöl a Veho!",
      redButton: "Van ötletem!",
      greenButton: "Segíteni szeretnék!",
    },
    redButtonClicked: {
      title: "Oszd meg ötletedet!",
    },
    greenButtonClicked: {
      title: "Csatlakozz egy ötlethez!",
    },
  },
  en: {
    initial: {
      title: "Welcome to Veho!",
      redButton: "I have an idea!",
      greenButton: "I want to help!",
    },
    redButtonClicked: {
      title: "Share your idea!",
    },
    greenButtonClicked: {
      title: "Join an idea!",
    },
  },
};

interface FirstProps {
  scrollTargetRef: React.RefObject<HTMLDivElement>;
}

function First({ scrollTargetRef }: FirstProps) {
  const [redButtonClicked, setRedButtonClicked] = useState(false);
  const [greenButtonClicked, setGreenButtonClicked] = useState(false);
  const [readMoreClicked, setReadMoreClicked] = useState(false);
  const [language] = useAtom(languageAtom);

  // Görgetés az Information szekcióra
  useEffect(() => {
    if (readMoreClicked && scrollTargetRef.current) {
      scrollTargetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [readMoreClicked, scrollTargetRef]);

  const handleRedButtonClick = () => {
    setRedButtonClicked(true);
  };

  const handleGreenButtonClick = () => {
    setGreenButtonClicked(true);
  };

  const handleReadMoreClick = () => {
    setReadMoreClicked(true);
  };

  const getText = (
    key: "initial" | "redButtonClicked" | "greenButtonClicked"
  ) => {
    return texts[language][key];
  };

  return (
    <section className="relative bg-gradient-to-b from-indigo-100 to-slate-50 dark:from-indigo-900 dark:to-slate-900 min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center px-4">
          {redButtonClicked ? (
            <>
              <h1 className="text-4xl md:text-5xl font-bold text-indigo-600 dark:text-indigo-300 mb-6">
                {getText("redButtonClicked").title}
              </h1>
              <Readmore onClick={handleReadMoreClick} />
            </>
          ) : greenButtonClicked ? (
            <>
              <h1 className="text-4xl md:text-5xl font-bold text-emerald-600 dark:text-emerald-300 mb-6">
                {getText("greenButtonClicked").title}
              </h1>
              <Readmore onClick={handleReadMoreClick} />
            </>
          ) : (
            <>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                {getText("initial").title}
              </h1>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Button
                  onClick={handleRedButtonClick}
                  className="bg-indigo-500 text-white hover:bg-indigo-600"
                >
                  {getText("initial").redButton}
                </Button>
                <Button
                  onClick={handleGreenButtonClick}
                  className="bg-emerald-500 text-white hover:bg-emerald-600"
                >
                  {getText("initial").greenButton}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default First;
