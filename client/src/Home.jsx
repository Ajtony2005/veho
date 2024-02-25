import React, { useState, useEffect } from 'react';
import './Home.css';
import Navbar from './Navbar';

const Home = () => {
  const [leftPosition, setLeftPosition] = useState('50%');
  const [isRedButtonClicked, setIsRedButtonClicked] = useState(false);
  const [isGreenButtonClicked, setIsGreenButtonClicked] = useState(false);
  const [showHalfCircle, setShowHalfCircle] = useState(false);

  useEffect(() => {
    if (showHalfCircle) {
      let currentPosition = window.innerWidth; // Start position from right side
      const targetPosition = (window.innerWidth / 2); // Target position in the middle of the screen
      const step = 5; // Step size

      const halfCircleInterval = setInterval(() => {
        currentPosition -= step;
        setLeftPosition(currentPosition + 'px');

        if (currentPosition <= targetPosition) {
          clearInterval(halfCircleInterval);
        }
      }, 10);

      return () => clearInterval(halfCircleInterval);
    }
  }, [showHalfCircle]);


  const handleRedButtonClick = () => {
    let currentPosition = 50; // Kezdeti pozíció
    const targetPosition = 15; // Cél pozíció
    const step = 0.8; // Lépésköz (egyenként csökkenő mennyiség)

    setIsRedButtonClicked(true);
    setIsGreenButtonClicked(false);

    const intervalId = setInterval(() => {
      currentPosition -= step;
      setLeftPosition(currentPosition + '%');

      if (currentPosition <= targetPosition) {
        clearInterval(intervalId); // Ha elértük a célpontot, töröljük az időzítést
       
        document.getElementById("overlay").style.opacity = 0;
      }
    }, 10); // Időzítés: 0.01 másodperc

    // Tisztítjuk az időzítést a komponens unmount-olása előtt
    return () => clearInterval(intervalId);
    
  };

  const handleGreenButtonClick = () => {
    let currentPosition = 50; // Kezdeti pozíció
    const targetPosition = 85; // Cél pozíció
    const step = 0.8; // Lépésköz (egyenként növekvő mennyiség)

    setIsRedButtonClicked(false);
    setIsGreenButtonClicked(true);

    const intervalId = setInterval(() => {
      currentPosition += step;
      setLeftPosition(currentPosition + '%');

      if (currentPosition >= targetPosition) {
        clearInterval(intervalId); // Ha elértük a célpontot, töröljük az időzítést
        // Beállítjuk az overlay opacity értékét 0-ra
        
        document.getElementById("overlay").style.opacity = 0;
       
      }
      
    }, 10); // Időzítés: 0.01 másodperc

    // Tisztítjuk az időzítést a komponens unmount-olása előtt
    return () => clearInterval(intervalId);
  };
  const handleOverlayAnimationComplete = () => {
    // Once the overlay animation is complete, set background to white and show the half circle
    document.getElementById("home").style.backgroundImage = "white";
    setShowHalfCircle(true);
  };


  return (
    <div className="home">
      <Navbar />
      <div className={`overlay ${isRedButtonClicked ? 'active red' : ''} ${isGreenButtonClicked ? 'active green' : ''}`} style={{ left: leftPosition }} id="overlay" onAnimationEnd={handleOverlayAnimationComplete}>
        <h1 className>VAN EGY ÖTLETED?</h1>
        <div className="spacer"></div>
        <button className="red-button" onClick={handleRedButtonClick}><span className="icon">✕</span></button>
        <div className="spacer"></div>
        <button className="green-button" onClick={handleGreenButtonClick}><span className="icon">✔</span></button>
        <div className="spacer"></div>
        {/* Egyéb tartalom */}
      </div>
      {showHalfCircle && <HalfCircle />}
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