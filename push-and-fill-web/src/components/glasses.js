// src/components/Glasses.js
import React from 'react';

const Glasses = ({ beerLevel, waterLevel }) => {
  const glassStyle = {
    width: '100px',
    height: '300px',
    border: '2px solid #000',
    borderRadius: '10px',
    margin: '0 20px',
    position: 'relative',
    display: 'inline-block',
  };

  const beerStyle = {
    backgroundColor: '#FFCC00', // Beer color
    height: `${beerLevel}%`, // Percentage height
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderRadius: '0 0 10px 10px',
  };

  const waterStyle = {
    backgroundColor: '#00BFFF', // Water color
    height: `${waterLevel}%`, // Percentage height
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderRadius: '0 0 10px 10px',
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={glassStyle}>
        <div style={beerStyle}></div>
      </div>
      <div style={glassStyle}>
        <div style={waterStyle}></div>
      </div>
    </div>
  );
};

export default Glasses;
