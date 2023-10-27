import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { GameService } from './game.service';
import { Socket, Server} from 'socket.io';
import { CreateGameDto } from './dto/create-game.dto';
import { verify } from 'jsonwebtoken';
import { AcceptRequestDto } from './dto/accept-request.dto';
import { PongGame } from './pong-game/pong-game';
import { UpdateGameDto } from './dto/update-game.dto';
import { SetHistoryDto } from './dto/set-history.dto';

@WebSocketGateway({ cors: { origin: '*' }, namespace: 'game' })
export class GameGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly gameService: GameService,private readonly pongGame: PongGame) {
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
  create(@MessageBody() createGameDto: CreateGameDto, @ConnectedSocket() soketId: Socket) {
    return this.gameService.createGameRandom(createGameDto, soketId, this.server, this.pongGame);
  }
  
  @SubscribeMessage('inviteFriend')
  createGameFriend(@MessageBody() createGameDto: CreateGameDto, @ConnectedSocket() soketId: Socket) {
    return this.gameService.matchingFriends(createGameDto, soketId, this.server);
  }
  
  @SubscribeMessage('acceptrequest')
  acceptreques(@MessageBody() acceptRequestDto: AcceptRequestDto, @ConnectedSocket() soketId: Socket) {
   return this.gameService.acceptRequest(acceptRequestDto, soketId, this.server, this.pongGame);
  }
  
  @SubscribeMessage('rejectrequest')
  rejectrequest(@MessageBody() acceptRequestDto: AcceptRequestDto, @ConnectedSocket() soketId: Socket) {
    return this.gameService.rejectrequest(acceptRequestDto, soketId, this.server);
  }

  @SubscribeMessage('refreshGame')
  refreshGame(soketId: Socket) {
    return this.gameService.refreshGame(soketId);
  }

  @SubscribeMessage('updateGame')
  updateGame(@MessageBody() updateGameDto: UpdateGameDto,soketId: Socket) {
      this.pongGame.setDownPressed(updateGameDto.downPressed);
      this.pongGame.setUpPressed(updateGameDto.upPressed);
      this.pongGame.setWPressed(updateGameDto.wPressed);
      this.pongGame.setSPressed(updateGameDto.sPressed);

     
      const gameData = {
        ballX: this.pongGame.getBallX(),
        ballY: this.pongGame.getBallY(),
        leftPaddle: this.pongGame.getLeftPaddle(),
        rightPaddle: this.pongGame.getRightPaddle(),
        leftPlayerScore: this.pongGame.getlLeftPlayerScore(),
        rightPlayerScore: this.pongGame.getrRightPlayerScore(),
      };
      this.server.emit('GameUpdated', gameData);
  }

}
