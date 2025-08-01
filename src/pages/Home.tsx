import { useRef } from "react";
import { useAuth } from "../hooks/useAuth";
import First from "../components/First";
import Information from "../components/Information";
import Footer from "../components/Footer";

function Home() {
  const informationRef = useRef<HTMLDivElement>(null);
  const user = useAuth();

  return (
    <>
      <First scrollTargetRef={informationRef} />
      <Information ref={informationRef} />
      <Footer />
    </>
  );
}

export default Home;
