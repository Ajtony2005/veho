import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { languageAtom } from "../store/languageAtom";
import Readmore from "./Readmore";
import { Button } from "./ui/button";
import { Lightbulb, Users, Sparkles } from "lucide-react";

// Szövegek az eredeti First.json alapján
const texts = {
  hu: {
    initial: {
      title: "Üdvözöl a Veho!",
      subtitle: "Ahol az ötletek valóra válnak",
      redButton: "Van ötletem!",
      greenButton: "Segíteni szeretnék!",
    },
    redButtonClicked: {
      title: "Oszd meg ötletedet!",
      subtitle: "Hozd létre a következő nagy dolgot",
    },
    greenButtonClicked: {
      title: "Csatlakozz egy ötlethez!",
      subtitle: "Segítsd megvalósítani mások álmait",
    },
  },
  en: {
    initial: {
      title: "Welcome to Veho!",
      subtitle: "Where ideas become reality",
      redButton: "I have an idea!",
      greenButton: "I want to help!",
    },
    redButtonClicked: {
      title: "Share your idea!",
      subtitle: "Create the next big thing",
    },
    greenButtonClicked: {
      title: "Join an idea!",
      subtitle: "Help bring others' dreams to life",
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
    setGreenButtonClicked(false);
  };

  const handleGreenButtonClick = () => {
    setGreenButtonClicked(true);
    setRedButtonClicked(false);
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
    <section className="relative min-h-screen flex flex-col transition-all duration-500 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-primary/20 rounded-full animate-pulse`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="flex-grow flex items-center justify-center relative z-10">
        <div className="text-center px-4 max-w-4xl mx-auto">
          {redButtonClicked ? (
            <div className="animate-fade-in">
              {/* Red state - Idea creation */}
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary/20 to-primary-600/20 rounded-full mb-6 backdrop-blur-sm border border-primary/30">
                  <Lightbulb className="w-10 h-10 text-primary animate-pulse" />
                </div>
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary-600 to-primary-700 bg-clip-text text-transparent mb-4 tracking-tight">
                  {getText("redButtonClicked").title}
                </h1>
                <p className="text-xl md:text-2xl text-white/80 mb-8 font-light">
                  {getText("redButtonClicked").subtitle}
                </p>
              </div>
              <Readmore onClick={handleReadMoreClick} />
            </div>
          ) : greenButtonClicked ? (
            <div className="animate-fade-in">
              {/* Green state - Collaboration */}
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-secondary/20 to-secondary-600/20 rounded-full mb-6 backdrop-blur-sm border border-secondary/30">
                  <Users className="w-10 h-10 text-secondary animate-pulse" />
                </div>
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-secondary via-secondary-600 to-secondary-700 bg-clip-text text-transparent mb-4 tracking-tight">
                  {getText("greenButtonClicked").title}
                </h1>
                <p className="text-xl md:text-2xl text-white/80 mb-8 font-light">
                  {getText("greenButtonClicked").subtitle}
                </p>
              </div>
              <Readmore onClick={handleReadMoreClick} />
            </div>
          ) : (
            <div className="animate-fade-in">
              {/* Initial state */}
              <div className="mb-12">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 rounded-full mb-8 backdrop-blur-sm border border-white/20">
                  <Sparkles className="w-12 h-12 text-white animate-pulse" />
                </div>
                <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-6 tracking-tight">
                  {getText("initial").title}
                </h1>
                <p className="text-2xl md:text-3xl text-white/90 mb-12 font-light tracking-wide">
                  {getText("initial").subtitle}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                <Button
                  onClick={handleRedButtonClick}
                  className="group relative px-8 py-4 bg-gradient-to-r from-primary/80 to-primary-600/80 hover:from-primary hover:to-primary-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/25 transform hover:scale-105 backdrop-blur-sm border border-primary/30"
                >
                  <div className="flex items-center gap-3">
                    <Lightbulb className="w-5 h-5 transition-transform group-hover:rotate-12" />
                    <span className="text-lg">
                      {getText("initial").redButton}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-600/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-md"></div>
                  <div className="relative bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-1">
                    <span className="text-white/60 text-sm px-4 py-2 block">
                      {language === "hu" ? "vagy" : "or"}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleGreenButtonClick}
                  className="group relative px-8 py-4 bg-gradient-to-r from-secondary/80 to-secondary-600/80 hover:from-secondary hover:to-secondary-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-secondary/25 transform hover:scale-105 backdrop-blur-sm border border-secondary/30"
                >
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 transition-transform group-hover:scale-110" />
                    <span className="text-lg">
                      {getText("initial").greenButton}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-secondary-600/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
    </section>
  );
}

export default First;
