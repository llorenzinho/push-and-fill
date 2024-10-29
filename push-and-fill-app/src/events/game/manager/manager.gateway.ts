import { Body, Inject, Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'http';
import { EVENT_GAME_FINISHED, EVENT_GAME_PUSH, EVENT_GAME_RESET, EVENT_GAME_STARTED } from 'src/core/constants/game';
import Team from 'src/models/team.model';
import { GAME_SERVICE, IGameService } from 'src/services/game/game.service';

@WebSocketGateway({
  namespace: 'game',
  cors: {
    origin: '*',
  },
})
export class ManagerGateway {
  readonly logger = new Logger(ManagerGateway.name);
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject(GAME_SERVICE) private readonly gameManagerService: IGameService,
  ) {}

  @SubscribeMessage(EVENT_GAME_FINISHED)
  async handleGameFinished(@Body() winner: Team) {
    this.logger.debug(`Game finished: ${JSON.stringify(winner)}`);
  }

  @SubscribeMessage(EVENT_GAME_PUSH)
  async handleGamePush(@Body() pushTeam: Team) {
    this.logger.debug(`Got push from: ${JSON.stringify(pushTeam)}`);
  }

  @SubscribeMessage(EVENT_GAME_RESET)
  async handleGameReset() {
    this.logger.debug(`Got Game Reset message`);
  }

  @SubscribeMessage(EVENT_GAME_STARTED)
  async handleGameStart() {
    this.logger.debug(`Got Game Reset message`);
  }
}
