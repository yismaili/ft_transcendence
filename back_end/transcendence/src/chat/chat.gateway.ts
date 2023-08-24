import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Socket, Server } from 'socket.io';
import { MessageChatDto } from './dto/message-chat.dto';
import { CreateChatRoomDto } from './dto/create-chatRoom.dto';


@WebSocketGateway({ cors: { origin: '*' } }) // Allow all origins; adjust as needed
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('createChat')
  createChat(@MessageBody() createChatDto: MessageChatDto, @ConnectedSocket() client: Socket) {
    const message = this.chatService.createChatMessage(createChatDto, client.id);
    this.server.emit('message', message);
    return message;
  }

  @SubscribeMessage('createChatRoom')
  createChatRoom(@MessageBody() createChatRoomDto: CreateChatRoomDto, @ConnectedSocket() client: Socket) {
    const message = this.chatService.createChatRoom(createChatRoomDto);
    this.server.emit('message', message);
    return message;
  }

  @SubscribeMessage('findAllChat')
  findAllMessagesOfUser(@MessageBody() createChatDto: MessageChatDto) {
    return this.chatService.findConversationBetweenUsers(createChatDto);
  }

  @SubscribeMessage('findOneChat')
  findOne(@MessageBody() id: number) {
    return this.chatService.findMessageById(id);
  }

  @SubscribeMessage('join')
  joinRoom(@MessageBody('username') username: string,@MessageBody('secondUsername') secondUsername: string, @ConnectedSocket() client: Socket) {
    return (this.chatService.identify(username, secondUsername, client.id));
  }

  @SubscribeMessage('editMessage')
  update(@MessageBody() updateChatDto: UpdateChatDto) {
    return this.chatService.update(updateChatDto);
  }

  @SubscribeMessage('deleteMessage')
  remove(@MessageBody() updateChatDto: UpdateChatDto) {
    return this.chatService.remove(updateChatDto);
  }
  @SubscribeMessage('deleteConversation')
  removeConversation(@MessageBody() updateChatDto: UpdateChatDto) {
    return this.chatService.removeConversation(updateChatDto);
  }

  @SubscribeMessage('typing')
  async typing(@MessageBody('isTyping') isTyping: boolean, @ConnectedSocket() client: Socket) {
    const name = await this.chatService.getClientName(client.id);
    client.broadcast.emit('typing', { name, isTyping });
}
}

