import React, { useState, useRef } from 'react';
import './Home.css';
import Navbar from './Navbar';
import Readmore from './Readmore';

const Home = () => {
  const [redButtonClicked, setRedButtonClicked] = useState(false);
  const [greenButtonClicked, setGreenButtonClicked] = useState(false);
  
  const scrollTargetRef = useRef(null);

  const handleRedButtonClick = () => {
    setRedButtonClicked(true);
  };

  const handleGreenButtonClick = () => {
    setGreenButtonClicked(true);
  };

  const handleReadMoreClick = () => {
    scrollTargetRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className='home'>
      <Navbar />
      <div className="overlay">
        {redButtonClicked ? (
          // Piros gomb esetén más szöveg jelenik meg
          <>
            <h1>Nem baj, itt nyerhetsz ihletet!</h1>
            <div className="spacer"></div>
            <div className='readmore-button'>
              <Readmore onClick={handleReadMoreClick} />
            </div>
          </>
        ) : greenButtonClicked ? (
          // Zöld gomb esetén más szöveg jelenik meg
          <>
            <h1>Töltsd fel és valósítsd meg ezt csapatban!</h1>
            <div className="spacer"></div>
            <div className='readmore-button'>
              <Readmore onClick={handleReadMoreClick} />
            </div>
          </>
        ) : (
          // Kezdeti szöveg, ha még egyik gomb sem lett lenyomva
          <>
            <h1>VAN EGY ÖTLETED?</h1>
            <div className="spacer"></div>
            <button className="red-button" onClick={handleRedButtonClick}><span className="icon">✕</span></button>
            <div className="spacer"></div>
            <button className="green-button" onClick={handleGreenButtonClick}><span className="icon">✔</span></button>
            <div className="spacer"></div>
            {/* Egyéb tartalom */}
          </>
        )}
        
    </div>
  );
}

const HalfCircle = () => {
  // Logic for the half circle component
  return (
    <div className="half-circle">
      {/* SVG or other elements for the half circle */}
    </div>
  );
}

export default Home;
