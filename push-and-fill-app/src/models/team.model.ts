import Players from './players.model';
import { TeamName } from './team.enum';
import { v4 as uuidv4 } from 'uuid';

export default class Team {
  id: string;
  players: Players;
  teamName: TeamName;
  score: number;
  percScore: number;

  constructor(teamName: TeamName) {
    this.teamName = teamName;
    this.players = [];
    this.id = uuidv4();
    this.score = 0;
    this.percScore = 0;
  }
}
