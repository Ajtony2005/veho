import React from 'react';
import './Information.css'; // Style fájl importálása
import { Box } from '@mui/material'; 
import { IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';


const CircleImage = ({ imageUrl }) => {
  return (
    <div className="circle-image-container">
      <div className="circle"></div>
      <img className="image" src={imageUrl} alt="Circle" />
      <div className="text-container">
        <Box className="box">
        <h2>Cím</h2>
        <p>Folyamatos szöveg...</p>
        <div className="icon-container">
                    <IconButton>
                      <ArrowBack />
                    </IconButton>
                    <IconButton>
                      <ArrowForward />
                    </IconButton>
                  </div>
        </Box>
      </div>
    </div>
  );
};

export default CircleImage;
