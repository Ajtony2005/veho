import { useState, useEffect, forwardRef } from "react";
import { useAtom } from "jotai";
import { Button } from "./ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Users,
  Target,
  Rocket,
  Heart,
} from "lucide-react";
import { languageAtom } from "../store/languageAtom";

// Statikus JSON adatok az eredeti JSON-ból
const content = {
  hu: [
    {
      title: "Mi az a Veho?",
      description:
        "A Veho egy online platform, ahol könnyedén megoszthatod ötleteidet másokkal, és együttműködhetsz azok megvalósításában, részletesen bemutathatod ötletedet és problémamegoldó képességét.",
      imagePath: "/idea.png",
      icon: Lightbulb,
      gradient: "from-primary to-primary-600",
    },
    {
      title: "Van egy ötletem, hogyan tudom megoszthatni?",
      description:
        'Az ötletek megosztásához regisztrálnod kell a Veho-ra, majd a főoldalon található "Ötlet megosztása" gombra kattintva tudod feltölteni az ötletedet.',
      imagePath: "/idea2.png",
      icon: Target,
      gradient: "from-accent to-accent-600",
    },
    {
      title:
        "Nincs ötletem, de szeretnék segíteni másoknak, hogyan tudom ezt megtenni?",
      description:
        'Regisztrálj a weboldalon és böngéssz az ötletek között, ha találsz olyat, amiben segíteni tudsz, írj a felhasználónak és egyeztessetek a részletekről. Ha nincs ötleted, de szeretnél segíteni, akkor a főoldalon található "Ötletek" menüpontban tudsz keresni.',
      imagePath: "/idea3.jpg",
      icon: Heart,
      gradient: "from-secondary to-secondary-600",
    },
    {
      title: "Hogyan tudok csapatot találni az ötletem megvalósításához?",
      description:
        'A Veho-n található ötletek között böngészve találhatsz olyan ötleteket, amelyek érdekelnek, és amelyekhez csatlakozni szeretnél. Az ötlet oldalán található "Csatlakozás" gombra kattintva tudod jelezni az ötlet tulajdonosának, hogy csatlakoznál az ötlet megvalósításához.',
      imagePath: "/group.jpg",
      icon: Users,
      gradient: "from-primary to-accent",
    },
    {
      title: "Hány ötletet tudok megosztani?",
      description:
        "Bármennyi ötletet megoszthatsz, amennyit csak szeretnél, azonban arra kérünk, hogy csak olyan ötleteket osztass meg, amelyek valóban megvalósíthatóak és értéket adnak a közösségnek.",
      imagePath: "/idea3.png",
      icon: Rocket,
      gradient: "from-secondary to-primary",
    },
  ],
  en: [
    {
      title: "What is Veho?",
      description:
        "Veho is an online platform where you can easily share your ideas with others, collaborate on their implementation, showcase your ideas in detail and demonstrate your problem-solving skills.",
      imagePath: "/idea.png",
      icon: Lightbulb,
      gradient: "from-primary to-primary-600",
    },
    {
      title: "I have an idea, how can I share it?",
      description:
        'To share ideas, you need to register on Veho, then click on the "Share Idea" button on the homepage to upload your idea.',
      imagePath: "/idea2.png",
      icon: Target,
      gradient: "from-accent to-accent-600",
    },
    {
      title:
        "I don't have an idea, but I want to help others, how can I do this?",
      description:
        'Register on the website and browse through the ideas. If you find one where you can help, write to the user and discuss the details. If you don\'t have an idea but want to help, you can search in the "Ideas" section on the homepage.',
      imagePath: "/idea3.jpg",
      icon: Heart,
      gradient: "from-secondary to-secondary-600",
    },
    {
      title: "How can I find a team to implement my idea?",
      description:
        'By browsing through the ideas on Veho, you can find ones that interest you and that you want to join. Click on the "Join" button on the idea page to let the idea owner know that you would like to join in implementing the idea.',
      imagePath: "/group.jpg",
      icon: Users,
      gradient: "from-primary to-accent",
    },
    {
      title: "How many ideas can I share?",
      description:
        "You can share as many ideas as you want, but we ask that you only share ideas that are truly feasible and add value to the community.",
      imagePath: "/idea3.png",
      icon: Rocket,
      gradient: "from-secondary to-primary",
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

    const {
      title,
      description,
      imagePath,
      icon: Icon,
      gradient,
    } = content[language][index];

    return (
      <section ref={ref} className="relative py-16 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/6 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/6 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/3 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Main content card */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-3xl blur-sm"></div>
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                  {/* Image section */}
                  <div className="relative w-full lg:w-1/2">
                    <div className="relative group">
                      {/* Glow effect behind image */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-2xl opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500`}
                      ></div>

                      {/* Main image */}
                      <div className="relative overflow-hidden rounded-2xl border border-white/30 backdrop-blur-sm">
                        <img
                          src={imagePath}
                          alt={title}
                          className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                      </div>

                      {/* Floating icon */}
                      <div
                        className={`absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r ${gradient} rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-lg`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content section */}
                  <div className="w-full lg:w-1/2 text-center lg:text-left">
                    {/* Title */}
                    <h2
                      className={`text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-6 leading-tight`}
                    >
                      {title}
                    </h2>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
                      {description}
                    </p>

                    {/* Navigation */}
                    <div className="flex justify-center lg:justify-start items-center gap-6">
                      {/* Previous button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handlePrevious}
                        className="group w-14 h-14 bg-white/10 border border-white/30 text-white/80 hover:bg-white/20 hover:text-white transition-all duration-300 backdrop-blur-sm rounded-xl"
                      >
                        <ChevronLeft className="h-6 w-6 transition-transform group-hover:-translate-x-1" />
                      </Button>

                      {/* Progress indicators */}
                      <div className="flex gap-2">
                        {content[language].map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                              i === index
                                ? `bg-gradient-to-r ${gradient}`
                                : "bg-white/30 hover:bg-white/50"
                            }`}
                          />
                        ))}
                      </div>

                      {/* Next button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleNext}
                        className="group w-14 h-14 bg-white/10 border border-white/30 text-white/80 hover:bg-white/20 hover:text-white transition-all duration-300 backdrop-blur-sm rounded-xl"
                      >
                        <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>

                    {/* Counter */}
                    <div className="mt-6 text-center lg:text-left">
                      <span className="text-white/60 text-sm">
                        {index + 1} / {content[language].length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      </section>
    );
  }
);

Information.displayName = "Information";

export default Information;
