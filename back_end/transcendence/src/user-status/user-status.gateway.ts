import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { verify } from 'jsonwebtoken';
import { Socket, Server } from 'socket.io';
import { ChatService } from 'src/chat/chat.service';
import { UserService } from 'src/user/user.service';

@WebSocketGateway()
export class UserStatusGateway {
  @WebSocketServer() server: Server;
  constructor(private readonly chatService: ChatService, private userService: UserService) {}

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
    this.userService.setUserstatus(username, 'online');
    this.chatService.addUserWithSocketId(username, client);
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
    this.userService.setUserstatus(username, 'offline');
    this.chatService.addUserWithSocketId(username, client);
  }
}
