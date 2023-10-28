import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer, WsException } from '@nestjs/websockets';
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
import { UsersOfChatRoom } from './dto/users-of-chatRoom.dto';
import { updateChatRoom } from './dto/update-chat-room.dto';
import { UploadedFile, UseGuards} from '@nestjs/common';
import { UpdateUIDto } from './dto/update-UI.dto';
import { verify } from 'jsonwebtoken';



@WebSocketGateway({ cors: { origin: '*' }, namespace: 'chat'})
export class ChatGateway {
  @WebSocketServer() server: Server;
  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {

    const jwtSecret = process.env.JWT_SECRET;
    const token = client.handshake.headers.authorization;

    if (!token) {
      client.emit('error', 'Authorization token missing');
      client.disconnect(true);
      return;
    }
    
    let decodedToken = verify(token, jwtSecret);
    const username = decodedToken['username'];
    this.chatService.addUserWithSocketId(username, client);
  }

  // @UseGuards(JwtAuthGuard, JwtStrategy)
  @SubscribeMessage('createChat')
  async createChat(@MessageBody() createChatDto: MessageChatDto, @ConnectedSocket() client: Socket){
    return await this.chatService.createChatDirect(createChatDto, client, this.server);
  }

  @SubscribeMessage('updateUI')
  async updateUI(@MessageBody() updateUIDto: UpdateUIDto, @ConnectedSocket() client: Socket){
    let roomName = `Room_`+updateUIDto.message;
    client.join(roomName);
    this.server.emit('updateUI', updateUIDto.message);
  }

  @SubscribeMessage('createChatRoom')
  async createChatRoom(@MessageBody() createChatRoomDto: CreateChatRoomDto, @ConnectedSocket() client: Socket, @UploadedFile() file):Promise<any> {
    return await this.chatService.createChatRoom(createChatRoomDto);
  }

  @SubscribeMessage('JoinUsertoRoom')
  async joinUsarToChatRoom(@MessageBody() joinUsertoChatRoom: JoinUsertoChatRoom, @ConnectedSocket() client: Socket){
    return await this.chatService.joinUserToChatRoom(joinUsertoChatRoom);
  }

  @SubscribeMessage('sendMessageToChatRoom')
  async sendMessage(@MessageBody() sendMessageToChatRoom: SendMessageToChatRoom, @ConnectedSocket() client: Socket) {
    return await this.chatService.sendMessage(sendMessageToChatRoom, client, this.server);
  }

  // @UseGuards(JwtAuthGuard, JwtStrategy)
  @SubscribeMessage('findAllChatRoomConversation')
  async findAllChatRoomConversation(@MessageBody() getChatRoomMessages: GetChatRoomMessages, client: Socket) {
    return await this.chatService.findAllChatRoomConversation(getChatRoomMessages);
  }

  @SubscribeMessage('joinChatRoomWithAdmin')
  async joinChatRoomWithAdmin(@MessageBody() joinChatRoom:JoinChatRoom) {
    return await this.chatService.joinChatRoomWithAdmin(joinChatRoom);
  }

  @SubscribeMessage('findAllChat')
  async findAllMessagesOfUser(@MessageBody() createChatDto: MessageChatDto) {
    return await this.chatService.findConversationBetweenUsers(createChatDto);
  }

  @SubscribeMessage('findOneChat')
  async findOne(@MessageBody() id: number) {
    return await this.chatService.findMessageById(id);
  }

  @SubscribeMessage('join')
  async joinRoom(@MessageBody('username') username: string,@MessageBody('secondUsername') secondUsername: string, @ConnectedSocket() client: Socket) {
    return await (this.chatService.identify(username, secondUsername, client.id));
  }

  @SubscribeMessage('editMessage')
  async update(@MessageBody() updateChatDto: UpdateChatDto) {
    return await this.chatService.update(updateChatDto);
  }

  @SubscribeMessage('deleteMessage')
  async remove(@MessageBody() updateChatDto: UpdateChatDto) {
    return await this.chatService.remove(updateChatDto);
  }

  @SubscribeMessage('deleteConversation')
  async removeConversation(@MessageBody() updateChatDto: UpdateChatDto) {
    return await this.chatService.removeConversation(updateChatDto);
  }

  @SubscribeMessage('banUser')
  async banUser(@MessageBody() banUserDto: BanUserDto) {
   return await this.chatService.banUser(banUserDto);
  }

  @SubscribeMessage('kickUser')
  async kickUser(@MessageBody() kickUserDto: KickUserDto) {
   return await this.chatService.kickUser(kickUserDto);
  }

  @SubscribeMessage('muteUser')
  async muteUser(@MessageBody() muteUserDto: MuteUserDto) {
   return await this.chatService.muteUser(muteUserDto);
  }

  @SubscribeMessage('chatRoomOfUser')
  async getAllChatRoomOfUser(@MessageBody() chatRoomOfUserDto: ChatRoomOfUserDto) {
    return await this.chatService.getAllChatRoomOfUser(chatRoomOfUserDto);
  }

  @SubscribeMessage('unbannedUser')
  async unbannedUser(@MessageBody() unbannedUserDtoo: BanUserDto) {
    return await this.chatService.unbannedUser(unbannedUserDtoo);
  }

  @SubscribeMessage('changePermission')
  async changePermissionToUser(@MessageBody() changePermissionToUserDto: BanUserDto) {
    return await this.chatService.changePermissionToUser(changePermissionToUserDto);
  }

  @SubscribeMessage('leaveChatRoom')
  async leaveChatRoom(@MessageBody() leaveChatRoomDto: LeaveChatRoomDto) {
    return await this.chatService.leaveChatRoom(leaveChatRoomDto);
  }

  @SubscribeMessage('deleteChatRoom')
  async deleteChatRoom(@MessageBody() deleteChatRoomDto: LeaveChatRoomDto) {
    return await this.chatService.deleteChatRoom(deleteChatRoomDto);
  }

  @SubscribeMessage('istyping')
  async typing(@MessageBody('isTyping') isTyping: boolean, @ConnectedSocket() client: Socket) {
    client.emit('istyping', {isTyping});
  }

  @SubscribeMessage('AllchatRoom')
  async getAllChatRoom(@MessageBody() chatRoomOfUserDto: ChatRoomOfUserDto) {
    return await this.chatService.getAllChatRoom(chatRoomOfUserDto);
  }

  @SubscribeMessage('joinChatRoom')
  async joinChatRoom(@MessageBody() joinRoom:JoinRoom ) {
    return await this.chatService.joinChatRoom(joinRoom);
  }

  @SubscribeMessage('getAllUserOfChatRoom')
  async getAllUserOfChatRoom(@MessageBody() usersOfChatRoom:UsersOfChatRoom ) {
    return await this.chatService.getAllUserOfChatRoom(usersOfChatRoom);
  }

  @SubscribeMessage('updateChatRoomInfo')
  async updateChatRoomInf(@MessageBody() usersOfChatRoom:updateChatRoom ) {
    return await this.chatService.updateChatRoomInfo(usersOfChatRoom);
  }

  @SubscribeMessage('gitAllUsers')
  async gitAllUsers() {
    return await this.chatService.gitAllUsers();
  }
}

