import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { GameService } from './game.service';
import { Socket, Server} from 'socket.io';
import { CreateGameDto } from './dto/create-game.dto';
import { verify } from 'jsonwebtoken';
import { AcceptRequestDto } from './dto/accept-request.dto';

@WebSocketGateway({ cors: { origin: '*' }, namespace: 'game' })
export class GameGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly gameService: GameService) {
  }

  handleConnection(client: Socket) {

    const jwtSecret = 'secrete';
    const token = client.handshake.headers.authorization;;
    if (!token) {
      client.emit('error', 'Authorization token missing');
      client.disconnect(true);
      return;
    }

    let decodedToken = verify(token, jwtSecret);
    const username = decodedToken['username'];
    this.gameService.handleConnection(client, username);
  }

  @SubscribeMessage('createGame')
  create(@MessageBody() createGameDto: CreateGameDto, @ConnectedSocket() playerId: Socket) {
    return this.gameService.createGameRandom(createGameDto, playerId, this.server);
  }

  @SubscribeMessage('inviteFriend')
  createGameFriend(@MessageBody() createGameDto: CreateGameDto, @ConnectedSocket() soketId: Socket) {
    return this.gameService.matchingFriends(createGameDto, soketId, this.server);
  }

  @SubscribeMessage('acceptrequest')
  acceptreques(@MessageBody() acceptRequestDto: AcceptRequestDto, @ConnectedSocket() soketId: Socket) {
   return this.gameService.acceptRequest(acceptRequestDto, soketId, this.server);
  }
  
  @SubscribeMessage('rejectrequest')
  rejectrequest(@MessageBody() acceptRequestDto: AcceptRequestDto, @ConnectedSocket() soketId: Socket) {
   return this.gameService.rejectrequest(acceptRequestDto, soketId, this.server);
  }
}
