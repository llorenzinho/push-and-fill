import { Module } from '@nestjs/common';
import { ManagerController } from './rest/game/manager/manager.controller';
import { ManagerGateway } from './events/game/manager/manager.gateway';
import { InMemoryGameService } from './services/game/in-memory-game/in-memory-game.service';
import { GAME_SERVICE } from './services/game/game.service';
@Module({
  imports: [],
  controllers: [ManagerController],
  providers: [{ provide: GAME_SERVICE, useClass: InMemoryGameService }, ManagerGateway],
})
export class AppModule {}
