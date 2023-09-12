import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { GameService } from './game.service';
import { UpdateGameDto } from './dto/update-game.dto';
import { Socket, Server} from 'socket.io';
import { CreateChatRoomDto } from 'src/chat/dto/create-chatRoom.dto';
import { CreateGameDto } from './dto/create-game.dto';

@WebSocketGateway()
export class GameGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly gameService: GameService) {
  }
  @SubscribeMessage('createGame')
  create(@MessageBody() createGameDto: CreateGameDto, @ConnectedSocket() playerId: Socket) {
    return this.gameService.createGameRandom(createGameDto, playerId, this.server);
  }

  @SubscribeMessage('createGameFriend')
  createGameFriend(@MessageBody() createGameDto: CreateGameDto, @ConnectedSocket() soketId: Socket) {
    return this.gameService.createGameFriend(createGameDto);
  }

  @SubscribeMessage('acceptRequest')
  acceptRequest(@MessageBody() createGameDto: CreateGameDto, @ConnectedSocket() soketId: Socket) {
    console.log(createGameDto);
    return this.gameService.accepteGameRequest(createGameDto);
  }

  @SubscribeMessage('updateGame')
  updateGame(@MessageBody() updateGameDto: UpdateGameDto) :Promise<any>{
    return this.gameService.startGame(updateGameDto);
  }
}
