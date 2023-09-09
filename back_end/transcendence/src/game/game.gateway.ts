import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { GameService } from './game.service';
import { UpdateGameDto } from './dto/update-game.dto';
import { Socket} from 'socket.io';

@WebSocketGateway()
export class GameGateway {
  constructor(private readonly gameService: GameService) {
  }

  @SubscribeMessage('createGame')
  create(@MessageBody() createGameDto: UpdateGameDto, @ConnectedSocket() soketId: Socket) {
    return this.gameService.createGame(createGameDto);
  }

  @SubscribeMessage('updateGame')
  updateGame(@MessageBody() updateGameDto: UpdateGameDto) :Promise<any>{
    return this.gameService.updateGame(updateGameDto);
  }
}
