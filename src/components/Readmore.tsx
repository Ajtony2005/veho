import { useAtom } from "jotai";
import { Button } from "./ui/button";
import { languageAtom } from "../store/languageAtom";

// Szövegek a Readmore gombhoz
const texts = {
  hu: { text: "További információ" },
  en: { text: "Read More" },
};

interface ReadmoreProps {
  onClick: () => void;
}

function Readmore({ onClick }: ReadmoreProps) {
  const [language] = useAtom(languageAtom);

  return (
    <Button
      onClick={onClick}
      variant="outline"
      className="text-indigo-500 border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950"
    >
      {texts[language].text}
    </Button>
  );
}

export default Readmore;
