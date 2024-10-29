import '../App.css';
import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { createGame, startGame } from '../services/restService';
import { Navigate, useNavigate } from 'react-router-dom';

const Home = () => {
    // create a dynamic game ID using uuidv4
    const [gameUrl, setGameUrl] = useState(null);
    const [id, setId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      const init = async () => {
        try {
          const _id = await createGame();
          setId(_id);
          setGameUrl(`${window.location.origin}/join/${id}`);
        } catch (error) {
          console.error('Error creating game:', error);
        }
      };
      init();
    });
  const handleStartGame = () => {
    startGame();
    navigate(`/gamecenter/${id}`);
  };

  return (
    <div>
      <h1>Fill Your Glass</h1>
      {gameUrl ? (
        <>
          <div className="qr-code-container">
            <QRCodeSVG value={gameUrl} size={256*2} />
          </div>
          <div className="link">
            <a href={gameUrl}>{gameUrl}</a>
          </div>
          <button className="button" onClick={handleStartGame}>
            Start Game
          </button>
        </>
      ) : (
        <p className="loading-text">Creating game...</p>
      )}
    </div>
  );
};

export default Home;
