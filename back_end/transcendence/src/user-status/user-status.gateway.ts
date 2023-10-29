import { ForbiddenException } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { verify } from 'jsonwebtoken';
import { Socket, Server } from 'socket.io';
import { ChatService } from 'src/chat/chat.service';
import { UserService } from 'src/user/user.service';

@WebSocketGateway({cors: { origin: '*' }})
export class UserStatusGateway {
  @WebSocketServer() server: Server;
  constructor(private readonly chatService: ChatService, private userService: UserService) {}

  handleConnection(client: Socket) {
    try {
      const jwtSecret = process.env.JWT_SECRET;
      const token = client.handshake.headers.authorization;
    
      if (!token) {
        client.emit('error', 'Authorization token missing');
        client.disconnect(true);
        return;
      }
    
      const decodedToken = verify(token, jwtSecret);
      if (!decodedToken) {
        client.emit('error', 'Invalid or expired token');
        client.disconnect(true);
        return;
      }
    
      const username = decodedToken['username'];
      return this.userService.setUserstatus(username, 'online');
    } catch (error) {
      return ;
    }
    
  }

  handleDisconnect(client: Socket) {
    try{
      const jwtSecret = process.env.JWT_SECRET;
      const token = client.handshake.headers.authorization;
  
      if (!token) {
        client.emit('error', 'Authorization token missing');
        client.disconnect(true);
        return;
      }
  
      let decodedToken = verify(token, jwtSecret);
      const username = decodedToken['username'];
      return this.userService.setUserstatus(username, 'offline');
    }catch(error){
     return;
    }
  }
}
