import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import JoinGame from './components/joinGame';
import WaitingRoom from './components/waitingRoom';
import Game from './components/game';
import Results from './components/results';
import GameCenter from './components/gameCenter';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gamecenter/:id" element={<GameCenter />} />
        <Route path="/join/:gameId" element={<JoinGame />} />
        <Route path="/waiting/:team" element={<WaitingRoom />} />
        <Route path="/game/:team" element={<Game />} />
        <Route path="/game/:team/results/:winner" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
