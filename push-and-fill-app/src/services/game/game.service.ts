import Game from 'src/models/game.model';
import Player from 'src/models/player.model';
import { TeamName } from 'src/models/team.enum';
import Team from 'src/models/team.model';

export interface IGameService {
  getGame(): Promise<Game>;
  createGame(): Promise<Game>;
  playerJoin(player: Player): Promise<Team>;
  startGame(): Promise<Game>;
  stopGame(): Promise<Game>;
  isGameStarted(): Promise<boolean>;
  isGameFinished(): Promise<boolean>;
  getWinner(): Promise<Team>;
  handlePushButton(teamName: TeamName);
  resetGame(): void;
}

export const GAME_SERVICE = Symbol('IGameService');
