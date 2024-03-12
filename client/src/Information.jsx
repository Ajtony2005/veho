import React from 'react';
import './Information.css'; // Style fájl importálása

const CircleImage = ({ imageUrl }) => {
  return (
    <div className="circle-image-container">
      <div className="circle"></div>
      <img className="image" src={imageUrl} alt="Circle" />
      <div className="text-container">
        <h2>Cím</h2>
        <p>Folyamatos szöveg...</p>
      </div>
    </div>
  );
};

export default CircleImage;
