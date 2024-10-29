import { Injectable, Logger } from '@nestjs/common';
import { IGameService } from '../game.service';
import Game from 'src/models/game.model';
import Player from 'src/models/player.model';
import Team from 'src/models/team.model';
import { v4 as uuidv4 } from 'uuid';
import { TeamName } from 'src/models/team.enum';
import { PER_PLAYER_PUSH_FACTOR } from 'src/core/constants/game';

@Injectable()
export class InMemoryGameService implements IGameService {
  private game: Game;
  readonly logger = new Logger(InMemoryGameService.name);

  async createGame(): Promise<Game> {

    if ( ( this.game != null || this.game != undefined ) && ! await this.isGameFinished())
      return this.game;

    var id = uuidv4();
    this.logger.log(`Created game ${id}`);
    var teams = [new Team(TeamName.WINE), new Team(TeamName.BEER)];
    this.game = new Game(id, teams);
    return Promise.resolve(this.game);
  }

  resetGame(): void {
    this.game = null;
  }

  playerJoin(player: Player): Promise<Team> {
    if (this.game == null || this.game == undefined)
      throw new Error('Game does not exists');

    var teams = this.game.teams;
    teams.sort((a, b) => a.players.length - b.players.length);
    teams[0].players.push(player);
    return Promise.resolve(teams[0]);
  }

  startGame(): Promise<Game> {
    if (this.game == null || this.game == undefined)
      throw new Error('Game does not exists');
    this.game.started = true;
    return Promise.resolve(this.game);
  }
  stopGame(): Promise<Game> {
    if (this.game == null || this.game == undefined)
      throw new Error('Game does not exists');
    this.game.started = false;
    return Promise.resolve(this.game);
  }
  isGameStarted(): Promise<boolean> {
    return Promise.resolve(this.game.started ?? false);
  }
  isGameFinished(): Promise<boolean> {
    return Promise.resolve(this.game.winner != null && this.game.winner != undefined);
  }
  getWinner(): Promise<Team> {
    return Promise.resolve(this.game.winner);
  }

  async handlePushButton(teamName: TeamName) {
    if (this.game == null || this.game == undefined)
      throw new Error('Game does not exists');

    if (!this.game.started) throw new Error('Game is not started');

    if (await this.isGameFinished()) throw new Error('Game is already finished');

    var team = this.game.teams.filter((team) => team.teamName === teamName)[0];
    team.score += 1;   
    
    this.game.teams.forEach(el => {
        el.percScore = el.score / ( el.players.length * PER_PLAYER_PUSH_FACTOR );
    });

    if (team.score >= team.players.length * PER_PLAYER_PUSH_FACTOR) {
      this.game.winner = team;
      this.game.started = false;
    }
  }

  getGame(): Promise<Game> {
    return Promise.resolve(this.game);
  }
}
