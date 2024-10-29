import axios from 'axios';
import { API_ENDPOINT } from "../core/constants"

export const createGame = async () => {
    var {data: {id}}  = await axios.post(`${API_ENDPOINT}/create`);
    console.log(id);
    return id;
}

export const startGame = async () => {
    var {data: {id}} = await axios.post(`${API_ENDPOINT}/start`);
    console.log(id);
    return id;
}

export const joinGame = async (gameId) => {
    var {data: {teamName}} = await axios.post(`${API_ENDPOINT}/join/${gameId}`);
    console.log(teamName);
    return teamName;
}

export const submitClick = async (team) => {
    await axios.post(`${API_ENDPOINT}/push`,{team});
}

export const resetGame = async () => {
    await axios.post(`${API_ENDPOINT}/reset`);
}
