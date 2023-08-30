import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Socket, Server } from 'socket.io';
import { MessageChatDto } from './dto/message-chat.dto';
import { CreateChatRoomDto } from './dto/create-chatRoom.dto';
import { JoinUsertoChatRoom } from './dto/join-user-to-chatRoom.dto';
import { SendMessageToChatRoom } from './dto/send-message-to-chatRomm';
import { GetChatRoomMessages } from './dto/get-chatRoom-messages';
import { JoinChatRoom } from './dto/join-chat-room';
import { BanUserDto } from './dto/ban-user.dto';
import { KickUserDto } from './dto/kick-user.dto';
import { MuteUserDto } from './dto/mut-user.dto';
import { ChatRoomOfUserDto } from './dto/chatRoom-of-user.dto';
import { LeaveChatRoomDto } from './dto/leave-ChatRoom.dto';
import { JoinRoom } from './dto/join-room.dto';


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
    return message;
  }

  @SubscribeMessage('JoinUsertoRoom')
  joinUsarToChatRoom(@MessageBody() joinUsertoChatRoom: JoinUsertoChatRoom, @ConnectedSocket() client: Socket) {
    const message = this.chatService.joinUserToChatRoom(joinUsertoChatRoom);
    this.server.emit('message', message);
    return message;
  }

  @SubscribeMessage('sendMessageToChatRoom')
  sendMessage(@MessageBody() sendMessageToChatRoom: SendMessageToChatRoom, @ConnectedSocket() client: Socket) {
    const message = this.chatService.sendMessage(sendMessageToChatRoom);
    this.server.emit('message', message);
    return message;
  }

  @SubscribeMessage('findAllChatRoomConversation')
  findAllChatRoomConversation(@MessageBody() getChatRoomMessages: GetChatRoomMessages) {
    return this.chatService.findAllChatRoomConversation(getChatRoomMessages);
  }

  @SubscribeMessage('joinChatRoomWithAdmin')
  joinChatRoomWithAdmin(@MessageBody() joinChatRoom:JoinChatRoom) {
    return this.chatService.joinChatRoomWithAdmin(joinChatRoom);
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

  @SubscribeMessage('banUser')
  async banUser(@MessageBody() banUserDto: BanUserDto) {
   return this.chatService.banUser(banUserDto);
  }

  @SubscribeMessage('kickUser')
  async kickUser(@MessageBody() kickUserDto: KickUserDto) {
   return this.chatService.kickUser(kickUserDto);
  }

  @SubscribeMessage('muteUser')
  async muteUser(@MessageBody() muteUserDto: MuteUserDto) {
   return this.chatService.muteUser(muteUserDto);
  }

  @SubscribeMessage('chatRoomOfUser')
  async getAllChatRoomOfUser(@MessageBody() chatRoomOfUserDto: ChatRoomOfUserDto) {
    return this.chatService.getAllChatRoomOfUser(chatRoomOfUserDto);
  }

  @SubscribeMessage('unbannedUser')
  async unbannedUser(@MessageBody() unbannedUserDtoo: BanUserDto) {
    return this.chatService.unbannedUser(unbannedUserDtoo);
  }

  @SubscribeMessage('changePermission')
  async changePermissionToUser(@MessageBody() changePermissionToUserDto: BanUserDto) {
    return this.chatService.changePermissionToUser(changePermissionToUserDto);
  }

  @SubscribeMessage('leaveChatRoom')
  async leaveChatRoom(@MessageBody() leaveChatRoomDto: LeaveChatRoomDto) {
    return this.chatService.leaveChatRoom(leaveChatRoomDto);
  }

  @SubscribeMessage('deleteChatRoom')
  async deleteChatRoom(@MessageBody() deleteChatRoomDto: LeaveChatRoomDto) {
    return this.chatService.deleteChatRoom(deleteChatRoomDto);
  }

  @SubscribeMessage('isTyping')
  async typing(@MessageBody('isTyping') isTyping: boolean, @ConnectedSocket() client: Socket) {
    const name = await this.chatService.getClientName(client.id);
    client.broadcast.emit('typing', { name, isTyping });
  }

  @SubscribeMessage('AllchatRoom')
  async getAllChatRoom(@MessageBody() chatRoomOfUserDto: ChatRoomOfUserDto) {
    return this.chatService.getAllChatRoom(chatRoomOfUserDto);
  }

  @SubscribeMessage('joinChatRoom')
  joinChatRoom(@MessageBody() joinRoom:JoinRoom ) {
    return this.chatService.joinChatRoom(joinRoom);
  }


}

