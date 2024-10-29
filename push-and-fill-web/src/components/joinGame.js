import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { joinGame } from '../services/restService';

const JoinGame = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const joinGameAndNavigate = async () => {
      var team = await joinGame(gameId);
      navigate(`/waiting/${team}`);
    };

    joinGameAndNavigate();
  });

  return <div>Joining game...</div>;
};

export default JoinGame;
