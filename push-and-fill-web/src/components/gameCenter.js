import React, { useEffect, useState } from 'react';
import Glasses from './glasses';
import { useNavigate, useParams } from 'react-router-dom';
import { onProgressUpdate } from '../services/socketService';
import { resetGame } from '../services/restService';


const GameCenter = () => {
  const { gameId } = useParams(); 
  const [beerLevel, setBeerLevel] = useState(0);
  const [waterLevel, setWaterLevel] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for updates from the server
    onProgressUpdate((beerLevel, waterLevel) => {
      setBeerLevel(beerLevel);
      setWaterLevel(waterLevel);
    })
  });

  const goHome = async () => {
    await resetGame();
    navigate(`/`);
  }

  return (
    <div>
      <h1>Multiplayer Game</h1>
      <Glasses beerLevel={beerLevel} waterLevel={waterLevel} />
      <button onClick={goHome}>Go Back</button>
    </div>
  );
};

export default GameCenter;
