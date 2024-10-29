import React, { useEffect } from 'react';
import { onGameOver } from '../services/socketService';
import { useNavigate, useParams } from 'react-router-dom';
import { submitClick } from '../services/restService';
import '../css/game.css';

const Game = () => {
  const navigate = useNavigate();
  const { team } = useParams();

  useEffect(() => {
    // onProgressUpdate(setProgress);
    onGameOver((data) => navigate(`results/${data.teamName}`));
  }, [navigate]);

  const handleButtonClick = () => {
    submitClick(team);
  };

  return (
    <div className="game-container">
      <p className="game-description">
        Click the button below to fill the glass.
      </p>
      <button className="game-button" onClick={handleButtonClick}>
        Click Me!
      </button>
    </div>
  );
};

export default Game;