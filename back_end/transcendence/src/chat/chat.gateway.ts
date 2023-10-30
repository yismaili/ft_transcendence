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
import { ForbiddenException, UploadedFile, UseGuards} from '@nestjs/common';
import { UpdateUIDto } from './dto/update-UI.dto';
import { verify } from 'jsonwebtoken';



@WebSocketGateway({ cors: { origin: '*' }, namespace: 'chat'})
export class ChatGateway {
  @WebSocketServer() server: Server;
  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {
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
      this.chatService.addUserWithSocketId(username, client);
    }catch(error){
      return ;
    }
  }

  @SubscribeMessage('createChat')
  async createChat(@MessageBody() createChatDto: MessageChatDto, @ConnectedSocket() client: Socket){
    try{
      return await this.chatService.createChatDirect(createChatDto, client, this.server);
    }catch(error){
      throw new ForbiddenException();
    }
  }

  @SubscribeMessage('updateUI')
  async updateUI(@MessageBody() updateUIDto: UpdateUIDto, @ConnectedSocket() client: Socket){
    try{
      let roomName = `Room_`+updateUIDto.message;
      client.join(roomName);
      this.server.emit('updateUI', updateUIDto.message);
    }catch(error){
      throw new ForbiddenException();
    }
  }

  @SubscribeMessage('createChatRoom')
  async createChatRoom(@MessageBody() createChatRoomDto: CreateChatRoomDto, @ConnectedSocket() client: Socket, @UploadedFile() file):Promise<any> {
    try{
      return await this.chatService.createChatRoom(createChatRoomDto);
    }catch(error){
      throw new ForbiddenException();
    }
  }

  @SubscribeMessage('JoinUsertoRoom')
  async joinUsarToChatRoom(@MessageBody() joinUsertoChatRoom: JoinUsertoChatRoom, @ConnectedSocket() client: Socket){
    try{
      return await this.chatService.joinUserToChatRoom(joinUsertoChatRoom);
    }catch(error){
      throw new ForbiddenException();
    }
  }

  @SubscribeMessage('sendMessageToChatRoom')
  async sendMessage(@MessageBody() sendMessageToChatRoom: SendMessageToChatRoom, @ConnectedSocket() client: Socket) {
    try{
      return await this.chatService.sendMessage(sendMessageToChatRoom, client, this.server);
    }catch(error){
      throw new ForbiddenException();
    }
  }

  @SubscribeMessage('findAllChatRoomConversation')
  async findAllChatRoomConversation(@MessageBody() getChatRoomMessages: GetChatRoomMessages, client: Socket) {
    try{
      return await this.chatService.findAllChatRoomConversation(getChatRoomMessages);
    }catch(error){
      throw new ForbiddenException();
    }
  }

  @SubscribeMessage('joinChatRoomWithAdmin')
  async joinChatRoomWithAdmin(@MessageBody() joinChatRoom:JoinChatRoom) {
    try{
      return await this.chatService.joinChatRoomWithAdmin(joinChatRoom);
    }catch(error){
      throw new ForbiddenException();
    }
  }

  @SubscribeMessage('findAllChat')
  async findAllMessagesOfUser(@MessageBody() createChatDto: MessageChatDto) {
    try{
      return await this.chatService.findConversationBetweenUsers(createChatDto);
    }catch(error){
      throw new ForbiddenException();
    }
  }

  @SubscribeMessage('findOneChat')
  async findOne(@MessageBody() id: number) {
    try{
      return await this.chatService.findMessageById(id);
    }catch(error){
      throw new ForbiddenException();
    }
  }

  @SubscribeMessage('editMessage')
  async update(@MessageBody() updateChatDto: UpdateChatDto) {
    try{
      return await this.chatService.update(updateChatDto);
    }catch(error){
      throw new ForbiddenException();
    }
  }

  @SubscribeMessage('deleteMessage')
  async remove(@MessageBody() updateChatDto: UpdateChatDto) {
    try{
      return await this.chatService.remove(updateChatDto);
    }catch(error){
      throw new ForbiddenException();
    }
  }

  @SubscribeMessage('deleteConversation')
  async removeConversation(@MessageBody() updateChatDto: UpdateChatDto) {
    try{
      return await this.chatService.removeConversation(updateChatDto);
    }catch(error){
      throw new ForbiddenException();
    }
  }

  @SubscribeMessage('banUser')
  async banUser(@MessageBody() banUserDto: BanUserDto) {
    try{
      return await this.chatService.banUser(banUserDto);
    }catch(error){
      throw new ForbiddenException();
    }
  }

  @SubscribeMessage('kickUser')
  async kickUser(@MessageBody() kickUserDto: KickUserDto) {
    try{
     return await this.chatService.kickUser(kickUserDto);
    }catch(error){
      throw new ForbiddenException();
    }
  }

  @SubscribeMessage('muteUser')
  async muteUser(@MessageBody() muteUserDto: MuteUserDto) {
    try{
      return await this.chatService.muteUser(muteUserDto);
    }catch(error){
      throw new ForbiddenException();
    }
  }

  @SubscribeMessage('chatRoomOfUser')
  async getAllChatRoomOfUser(@MessageBody() chatRoomOfUserDto: ChatRoomOfUserDto) {
    try{
      return await this.chatService.getAllChatRoomOfUser(chatRoomOfUserDto);
    }catch(error){
      throw new ForbiddenException();
    }
  }

  @SubscribeMessage('unbannedUser')
  async unbannedUser(@MessageBody() unbannedUserDtoo: BanUserDto) {
    try{
      return await this.chatService.unbannedUser(unbannedUserDtoo);
    }catch(error){
      throw new ForbiddenException();
    }
  }

  @SubscribeMessage('changePermission')
  async changePermissionToUser(@MessageBody() changePermissionToUserDto: BanUserDto) {
    try{
      return await this.chatService.changePermissionToUser(changePermissionToUserDto);
    }catch(error){
      throw new ForbiddenException();
    }
  }

  @SubscribeMessage('leaveChatRoom')
  async leaveChatRoom(@MessageBody() leaveChatRoomDto: LeaveChatRoomDto) {
    try{
      return await this.chatService.leaveChatRoom(leaveChatRoomDto, this.server);
    }catch(error){
      throw new ForbiddenException();
    }
  }

  @SubscribeMessage('deleteChatRoom')
  async deleteChatRoom(@MessageBody() deleteChatRoomDto: LeaveChatRoomDto) {
    try{
      return await this.chatService.deleteChatRoom(deleteChatRoomDto, this.server);
    }catch(error){
      throw new ForbiddenException();
    }
  }

  @SubscribeMessage('istyping')
  async typing(@MessageBody('isTyping') isTyping: boolean, @ConnectedSocket() client: Socket) {
    try{
      client.emit('istyping', {isTyping});
    }catch(error){
      throw new ForbiddenException();
    }
  }

  @SubscribeMessage('AllchatRoom')
  async getAllChatRoom(@MessageBody() chatRoomOfUserDto: ChatRoomOfUserDto) {
    try{
      return await this.chatService.getAllChatRoom(chatRoomOfUserDto);
    }catch(error){
      throw new ForbiddenException();
    }
  }

  @SubscribeMessage('joinChatRoom')
  async joinChatRoom(@MessageBody() joinRoom:JoinRoom ) {
    try{
      return await this.chatService.joinChatRoom(joinRoom);
    }catch(error){
      throw new ForbiddenException();
    }
  }

  @SubscribeMessage('getAllUserOfChatRoom')
  async getAllUserOfChatRoom(@MessageBody() usersOfChatRoom:UsersOfChatRoom ) {
    return await this.chatService.getAllUserOfChatRoom(usersOfChatRoom);
  }

  @SubscribeMessage('updateChatRoomInfo')
  async updateChatRoomInf(@MessageBody() usersOfChatRoom:updateChatRoom ) {
    try{
      return await this.chatService.updateChatRoomInfo(usersOfChatRoom, this.server);
    }catch(error){
      throw new ForbiddenException();
    }
  }

  @SubscribeMessage('gitAllUsers')
  async gitAllUsers() {
    try{
      return await this.chatService.gitAllUsers();
    }catch(error){
      throw new ForbiddenException();
    }
  }
}

