// src/services/socketService.js
import io from 'socket.io-client';
import { WS_ENDPOINT } from '../core/constants';

const socket = io(WS_ENDPOINT); // Connect to backend socket server

// Export functions to emit and listen to events
export const onGameStarted = (callback) => socket.on('GAME_STARTED', callback);
export const onProgressUpdate = (callback) => socket.on('PROGRESS_UPDATE', callback);
export const onGameOver = (callback) => socket.on('GAME_FINISHED', callback);

export default socket;
