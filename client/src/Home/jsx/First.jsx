import React, { useState, useEffect } from 'react';
import '../css/First.css';
import Navbar from './Navbar';
import Readmore from './Readmore';
import { animateScroll as scroll } from 'react-scroll';

const First = ({ scrollTargetRef }) => {
  const [redButtonClicked, setRedButtonClicked] = useState(false);
  const [greenButtonClicked, setGreenButtonClicked] = useState(false);
  const [readMoreClicked, setReadMoreClicked] = useState(false);

  useEffect(() => {
    if (readMoreClicked) {
      scroll.scrollToBottom({
        smooth: true,
        container: scrollTargetRef.current
      });
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

  return (
    <div className='home'>
      <Navbar />
      <div className="overlay">
        {redButtonClicked ? (
          <>
            <h1>Nem baj, itt nyerhetsz ihletet!</h1>
            <div className="spacer"></div>
            <div className='readmore-button'>
              <Readmore onClick={handleReadMoreClick} />
            </div>
          </>
        ) : greenButtonClicked ? (
          <>
            <h1>Töltsd fel és valósítsd meg ezt csapatban!</h1>
            <div className="spacer"></div>
            <div className='readmore-button'>
              <Readmore onClick={handleReadMoreClick} />
            </div>
          </>
        ) : (
          <>
            <h1>VAN EGY ÖTLETED?</h1>
            <div className="spacer"></div>
            <button className="red-button" onClick={handleRedButtonClick}><span className="icon">✕</span></button>
            <div className="spacer"></div>
            <button className="green-button" onClick={handleGreenButtonClick}><span className="icon">✔</span></button>
            <div className="spacer"></div>
          </>
        )}
      </div>
    </div>
  );
}

export default First;
