import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { GameService } from './game.service';
import { Socket, Server} from 'socket.io';
import { CreateGameDto } from './dto/create-game.dto';
import { verify } from 'jsonwebtoken';
import { AcceptRequestDto } from './dto/accept-request.dto';
import { PongGame } from './pong-game/pong-game';
import { ForbiddenException } from '@nestjs/common';

@WebSocketGateway({ cors: { origin: '*' }, namespace: 'game' })
export class GameGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly gameService: GameService,private readonly pongGame: PongGame) {
  }
  handleConnection(client: Socket) {
    try{
      const jwtSecret = process.env.JWT_SECRET;
      const token = client.handshake.headers.authorization;;
      if (!token) {
        client.emit('error', 'Authorization token missing');
        client.disconnect(true);
        return;
      }
  
      let decodedToken = verify(token, jwtSecret);
      const username = decodedToken['username'];
      this.gameService.handleConnection(client, username);
    }catch(error){
      return ;
    }
  }

  @SubscribeMessage('createGame')
  create(@MessageBody() createGameDto: CreateGameDto, @ConnectedSocket() soketId: Socket) {
    try{ 
      return this.gameService.createGameRandom(createGameDto, soketId, this.server, this.pongGame);
    }catch(error){
      throw new ForbiddenException();
    }
  }

  
  @SubscribeMessage('inviteFriend')
  createGameFriend(@MessageBody() createGameDto: CreateGameDto, @ConnectedSocket() soketId: Socket) {
    try{
      return this.gameService.matchingFriends(createGameDto, soketId, this.server);
    }catch(error){
      throw new ForbiddenException();
    }
  }
  
  @SubscribeMessage('acceptrequest')
  acceptreques(@MessageBody() acceptRequestDto: AcceptRequestDto, @ConnectedSocket() soketId: Socket) {
    try{
      return this.gameService.acceptRequest(acceptRequestDto, soketId, this.server, this.pongGame);
   }catch(error){
     throw new ForbiddenException();
   }
  }
  
  @SubscribeMessage('rejectrequest')
  rejectrequest(@MessageBody() acceptRequestDto: AcceptRequestDto, @ConnectedSocket() soketId: Socket) {
    try{
      return this.gameService.rejectrequest(acceptRequestDto, soketId, this.server);
    }catch(error){
      throw new ForbiddenException();
    }
  }

  @SubscribeMessage('refreshGame')
  refreshGame(soketId: Socket) {
    try{
      return this.gameService.refreshGame(soketId);
    }catch(error){
      throw new ForbiddenException();
    }
  }

  @SubscribeMessage('updateGameUp')
  updateGameUp(@MessageBody() data, soketId: Socket) {
    try{
      let roomName = null;
      for (const [name, players] of this.gameService.players) {
        if (players.includes(data.username)) {
          roomName = name;
          break;
        }
      }
      if (roomName != null){
        if (this.gameService.players.get(roomName)[0] === data.username){
          this.pongGame.setUpPressed(data.isup);
        }
        else{
          this.pongGame.setWPressed(data.isup);
        }
      }
    }catch(error){
      throw new ForbiddenException();
    }
  }

  @SubscribeMessage('updateGameDown')
  updateGameDown(@MessageBody() data, soketId: Socket,) {
    try{
      let roomName = null;
      for (const [name, players] of this.gameService.players) {
        if (players.includes(data.username)) {
          roomName = name;
          break;
        }
      }
      if (roomName != null){
        if (this.gameService.players.get(roomName)[0] === data.username){
          this.pongGame.setDownPressed(data.isdown);
        }
        else{
          this.pongGame.setSPressed(data.isdown);
        }
      }
    }catch(error){
      throw new ForbiddenException();
    }
  }
}
