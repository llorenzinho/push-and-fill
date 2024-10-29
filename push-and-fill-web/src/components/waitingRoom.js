// src/components/WaitingRoom.js
import React, { useEffect } from 'react';
import { onGameStarted } from '../services/socketService';
import { useNavigate, useParams } from 'react-router-dom';
import Lottie from 'react-lottie';
import "../css/waitingRoom.css";
import animation from '../lottie/waiting';

const WaitingRoom = () => {
  const { team } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    onGameStarted(() => navigate(`/game/${team}`));
  }, [navigate]);

  return (
    <div className="container">
      <h1 className="title">Welcome to the Waiting Room</h1>
      <p className="subtitle">We are preparing everything for you. Hang tight!</p>
      <Lottie
        options={{
          animationData: animation
        }}
      />
      <p className="message">This might take a few moments. Thank you for your patience.</p>
      <p className="instructions">Feel free to relax or have a quick stretch while we set things up for you.</p>
    </div>
  );
  
  
};

export default WaitingRoom;