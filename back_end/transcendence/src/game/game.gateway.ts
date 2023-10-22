import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { GameService } from './game.service';
import { Socket, Server} from 'socket.io';
import { CreateGameDto } from './dto/create-game.dto';
import { verify } from 'jsonwebtoken';

@WebSocketGateway({ cors: { origin: '*' }, namespace: 'game' })
export class GameGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly gameService: GameService) {
  }

  // handleConnection(socket: Socket): void {
  //   this.gameService.addUserWithSocketId(socket);
  // }

  handleConnection(client: Socket, ...args: any[]) {

    const jwtSecret = 'secrete';
    const token = client.handshake.headers.authorization;

    if (!token) {
      client.emit('error', 'Authorization token missing');
      client.disconnect(true);
      return;
    }

    let decodedToken = verify(token, jwtSecret);
    const username = decodedToken['username'];
      this.gameService.addUserWithSocketId(username, client);
  }

  handleDisconnect(client: Socket) {

    const jwtSecret = 'secrete';
    const token = client.handshake.headers.authorization;

    if (!token) {
      client.emit('error', 'Authorization token missing');
      client.disconnect(true);
      return;
    }

    let decodedToken = verify(token, jwtSecret);
    const username = decodedToken['username'];
      this.gameService.addUserWithSocketId(username, client);
  }
  

  @SubscribeMessage('createGame')
  create(@MessageBody() createGameDto: CreateGameDto, @ConnectedSocket() playerId: Socket) {
    return this.gameService.createGameRandom(createGameDto, playerId, this.server);
  }

  @SubscribeMessage('createGameFriend')
  createGameFriend(@MessageBody() createGameDto: CreateGameDto, @ConnectedSocket() soketId: Socket) {
    return this.gameService.matchingFriends(createGameDto, soketId, this.server);
  }
}
