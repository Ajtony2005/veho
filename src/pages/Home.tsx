import { useRef } from "react";
import { useAuth } from "../hooks/useAuth";
import First from "../components/First";
import Information from "../components/Information";
import Footer from "../components/Footer";

function Home() {
  const informationRef = useRef<HTMLDivElement>(null);
  const user = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <First scrollTargetRef={informationRef} />
      <Information ref={informationRef} />
      <Footer />
    </div>
  );
}

export default Home;
