// src/components/Results.js
import React from 'react';
import { useParams } from 'react-router-dom';


const Results = () => {
  var { team, winner } = useParams();
  return <div>Game Over! The winner is {winner}.</div>;
};

export default Results;
