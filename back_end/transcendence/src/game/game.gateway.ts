import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { GameService } from './game.service';
import { Socket, Server} from 'socket.io';
import { CreateGameDto } from './dto/create-game.dto';

@WebSocketGateway()
export class GameGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly gameService: GameService) {
  }

  handleConnection(socket: Socket): void {
    this.gameService.addUserWithSocketId(socket);
  }

  @SubscribeMessage('createGame')
  create(@MessageBody() createGameDto: CreateGameDto, @ConnectedSocket() playerId: Socket) {
    return this.gameService.createGameRandom(createGameDto, playerId, this.server);
  }

  @SubscribeMessage('createGameFriend')
  createGameFriend(@MessageBody() createGameDto: CreateGameDto, @ConnectedSocket() soketId: Socket) {
    return this.gameService.matchingFriends(createGameDto, soketId, this.server);
  }

  // @SubscribeMessage('invite')
  // test(socketid) {
  //   console.log("hi")

  //   socketid.join("yismaili")

  //   this.server.to("yismaili").emit('invite1');
  // }

  // @SubscribeMessage('acceptRequest')
  // acceptRequest(@MessageBody() createGameDto: CreateGameDto, @ConnectedSocket() soketId: Socket) {
  //   console.log(createGameDto);
  //   return this.gameService.accepteGameRequest(createGameDto);
  // }
}
