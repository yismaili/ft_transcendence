import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
  server: Server;
  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('createChat')
  create(@MessageBody() createChatDto: CreateChatDto, @ConnectedSocket() client: Socket) {
    const message = this.chatService.createChatMessage(createChatDto, client.id);
    this.server.emit('message', message); //emit to all clients
    return message;
  }

  @SubscribeMessage('findAllChat')
  findAll() {
    return this.chatService.findAllMessages();
  }

  @SubscribeMessage('findOneChat')
  findOne(@MessageBody() id: number) {
    return this.chatService.findMessageById(id);
  }

  @SubscribeMessage('updateChat')
  update(@MessageBody() updateChatDto: UpdateChatDto) {
    return this.chatService.update(updateChatDto.id, updateChatDto);
  }

  @SubscribeMessage('removeChat')
  remove(@MessageBody() id: number) {
    return this.chatService.remove(id);
  }

  // @SubscribeMessage('jion')
  // joinRoom(@MessageBody('username') usernsme: string, @ConnectedSocket() client: Socket){
  //   return this.chatService.identify(name, client.id);
  // }
  
  // @SubscribeMessage('typing')
  // async typing(@MessageBody('isTyping') isTyping: boolean, @ConnectedSocket() client: Socket){
  //   const username = await this.chatService.getClientUsername(client.id);
  // }
}
