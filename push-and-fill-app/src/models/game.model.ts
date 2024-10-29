import Team from './team.model';
import { v4 as uuidv4 } from 'uuid';

export default class Game {
  readonly id: string;
  teams: Team[] = [];
  started: boolean;
  winner?: Team;

  constructor(id: string, teams: Team[]) {
    this.id = id;
    this.teams = teams;
    this.started = false;
    this.winner = null;
  }

  static create(): Game {
    return new Game(uuidv4(), []);
  }
}
