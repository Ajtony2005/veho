import React from 'react';
import './Information.css'; // Style fájl importálása
import { Box } from '@mui/material'; 
import { IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';


const CircleImage = ({ imageUrl }) => {
  return (
    <div  className="background">
    <div className="circle-image-container">
      <div className="circle"></div>
      <img className="image" src={imageUrl} alt="Circle" />
      <div className="text-container">
        <Box className="box">

        <h1>Mi az a Veho?</h1>
        <p>A Veho egy online platform, ahol könnyedén megoszthatod ötleteidet másokkal, és együttműködhetsz azok megvalósításában, részletesen bemutathatod ötletedet és problémamegoldó képességét.</p>
        <div className="left-icon">
    <IconButton>
      <ArrowBack />
    </IconButton>
  </div>
        <div className="right-icon">
    <IconButton>
      <ArrowForward />
    </IconButton>
  </div>
        </Box>
      </div>
    </div>
    </div>
  );
};

export default CircleImage;
