import { Body, Controller, Inject, Logger, Param, Post } from '@nestjs/common';
import { EVENT_GAME_FINISHED, EVENT_GAME_PUSH, EVENT_GAME_RESET, EVENT_GAME_STARTED } from 'src/core/constants/game';
import { ManagerGateway } from 'src/events/game/manager/manager.gateway';
import { PushButtonDto } from 'src/models/dto/push-button.dto';
import Game from 'src/models/game.model';
import Player from 'src/models/player.model';
import Team from 'src/models/team.model';
import { GAME_SERVICE, IGameService } from 'src/services/game/game.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('game')
export class ManagerController {
  readonly logger = new Logger(ManagerController.name);


  constructor(
    @Inject(GAME_SERVICE) private readonly gameManagerService: IGameService,
    private readonly gw: ManagerGateway
  ) {}

  @Post('create')
  async createGame() {
    try {
      this.logger.debug('Received request to create game');
      return await this.gameManagerService.createGame();
    } catch (error) {
        this.logger.error(`Failed to create game: ${error}`);
        return null;
    }
  }

  @Post('reset')
  async resetGame() {
    try {
      this.logger.debug('Received request to reset game');
      this.gw.server.emit(EVENT_GAME_RESET);
      await this.gameManagerService.resetGame();
    } catch (error) {
      this.logger.error(`Failed to reset game: ${error}`);
      return null;
    }
  }

  @Post('join/:gameId')
  async playerJoin(@Param('gameId') gameId: string): Promise<Team> {
    try {
      if (await this.gameManagerService.isGameStarted()) return null;
      if ((await this.gameManagerService.getGame()).id !== gameId) return null;

      this.logger.debug('Received request to join game');
      var id = uuidv4();
      var newPlayer = new Player(id, 'Player ' + id);
      return await this.gameManagerService.playerJoin(newPlayer);
    } catch (error) {
      return null;
    }
  }

  @Post('start')
  async startGame(): Promise<Game> {
    try {
      this.logger.debug('Received request to start game');
      if (await this.gameManagerService.isGameStarted()) return null;
      var game = await this.gameManagerService.startGame();
      this.gw.server.emit(EVENT_GAME_STARTED);
      return game;
    } catch (error) {
      this.logger.error(`Failed to start game: ${error}`);
      return null;
    }
  }

  @Post('push')
  async handlePushButtonFromPLayer(
    @Body() payload: PushButtonDto,
  ): Promise<boolean> {
    if (!(await this.gameManagerService.isGameStarted())) return false;

    if (await this.gameManagerService.isGameFinished()) return false;

    await this.gameManagerService.handlePushButton(payload.team);
    this.gw.server.emit(EVENT_GAME_PUSH, (await this.gameManagerService.getGame()).teams);

    if (await this.gameManagerService.isGameFinished())
      {
        var winner = await this.gameManagerService.getWinner()
        this.logger.log(`Game finished. Winner: ${winner.teamName}`);
        this.gw.server.emit(EVENT_GAME_FINISHED, winner);
        return Promise.resolve(true);
      }

    return Promise.resolve(false);
  }
}
