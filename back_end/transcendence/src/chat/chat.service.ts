import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User.entity';
import { Profile } from 'src/typeorm/entities/Profile.entity';
import { Relation } from 'src/typeorm/entities/Relation.entity';
import { HistoryEntity } from 'src/typeorm/entities/History.entity';
import { Achievement } from 'src/typeorm/entities/Achievement.entity';
import { MessageChatDto } from './dto/message-chat.dto';
import { Chat } from 'src/typeorm/entities/chat-entity';
import { Message } from 'src/typeorm/entities/message-entity';
import { ChatRoom } from 'src/typeorm/entities/chat-room.entity';
import { ChatRoomUser } from 'src/typeorm/entities/chat-room-users.entity';
import { CreateChatRoomDto } from './dto/create-chatRoom.dto';
import { HashingPasswordService } from 'src/hashing-password/hashing-password.service';
import { JoinUsertoChatRoom } from './dto/join-user-to-chatRoom.dto';
import { SendMessageToChatRoom } from './dto/send-message-to-chatRomm';
import { GetChatRoomMessages } from './dto/get-chatRoom-messages';
import { JoinChatRoom } from './dto/join-chat-room';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile)private profileRepository: Repository<Profile>,
    @InjectRepository(Relation)private relationRepository: Repository<Relation>,
    @InjectRepository(HistoryEntity)private historyRepository: Repository<HistoryEntity>,
    @InjectRepository(Achievement)private achievementRepository: Repository<Achievement>,
    @InjectRepository(Message)private messageRepository: Repository<Message>,
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    @InjectRepository(ChatRoom)private chatRoomRepository: Repository<ChatRoom>,
    @InjectRepository(ChatRoomUser)private chatRoomUserRepository: Repository<ChatRoomUser>,
    private hashingPasswordSrvice: HashingPasswordService,
  ) {}
  clientToUser = {};
  
  async createChatMessage(createChatDto: MessageChatDto, sender: string): Promise<any> {
    
    const user = await this.userRepository.findOne({
      where: {
        username: createChatDto.user,
      }
    });

    this.clientToUser[sender] = createChatDto.user;
    const secondUser = await this.userRepository.findOne({
      where: {
        username: createChatDto.secondUser,
      }
    });

    const newChatMessage = this.chatRepository.create({
      message: createChatDto.message,
      user: user,
      secondUser: secondUser,
    });
    
    this.chatRepository.save(newChatMessage);
    return newChatMessage;
  }

  async createChatRoom(createChatRoomDto: CreateChatRoomDto): Promise<any> {

    try {
        const user = await this.userRepository.findOne({
            where: {
                username: createChatRoomDto.user,
            },
        });

        if (!user){
          throw new Error('his user not exist');
        }

        const ischatRoomExist = await this.chatRoomRepository.findOne({
          where:[ {chatRoomUser: { id: user.id}}, {name: createChatRoomDto.name}]
        });

        if (ischatRoomExist){
          throw new Error('his chat room exist');
        }
        const newChatRoom = this.chatRoomRepository.create({
            name: createChatRoomDto.name,
            status: createChatRoomDto.status,
            password: createChatRoomDto.password,
        });

        const savedNewChatRoom = await this.chatRoomRepository.save(newChatRoom);

        const chatRoom = await this.chatRoomRepository.findOne({
            where: {
                id: savedNewChatRoom.id,
            },
        });

        const newChatRoomUser = this.chatRoomUserRepository.create({
            time: createChatRoomDto.time,
            statusPermissions: createChatRoomDto.statusPermissions,
            statusUser: createChatRoomDto.statusUser,
            user: user,
            chatRooms: chatRoom,
        });

        const savedNewChatRoomUser = await this.chatRoomUserRepository.save(newChatRoomUser);

        return savedNewChatRoom; 
    } catch (error) {
        console.error(error);
        throw new Error('Error creating chat room');
    }
}


  async joinUsarToChatRoom(joinUserToChatRoom: JoinUsertoChatRoom): Promise<any>{

    const user =  await this.userRepository.findOne({
      where: {
        username: joinUserToChatRoom.username,
      }
    });

    if (!user){
      throw new Error('this user not exist');
    }
    
    const chatRoom =  await this.chatRoomRepository.findOne({
      where: {
        name: joinUserToChatRoom.chatRoomName,
      }
    });

    const isUserExistInchatRoom =  await this.chatRoomRepository.findOne({
      where: {
          chatRoomUser: {id: user.id},
      }
    });

    if(isUserExistInchatRoom){
      throw new Error ('this user exist in this chat room');
    }
    const createChatRoomUser = await this.chatRoomUserRepository.create({
      statusPermissions: joinUserToChatRoom.statusPermissions,
      user: user,
      chatRooms: chatRoom,
    });
    return await this.chatRoomUserRepository.save(createChatRoomUser);
  }

  async sendMessage(sendMessageToChatRoom: SendMessageToChatRoom) : Promise<any>{

    const user = await this.userRepository.findOne({
      where: {
        username: sendMessageToChatRoom.username,
      },
    });

    const chatRoom = await this.chatRoomRepository.findOne({
      where: {
        name: sendMessageToChatRoom.chatRoomName,
      },
    });

    const createNewMessage = await this.messageRepository.create({
      user: user,
      message: sendMessageToChatRoom.message,
      chatRoom: chatRoom,
    });
    return await this.messageRepository.save(createNewMessage);
  }

  async findAllChatRoomConversation(getChatRoomMessages: GetChatRoomMessages) : Promise<any>{

    const chatRoom = await this.chatRoomRepository.findOne({
      where: {
        name: getChatRoomMessages.chatRoomName,
      },
    });
    const chatRoomConversation =  await this.messageRepository.find({
      where: {
          chatRoom:{id: chatRoom.id},
      }
    });
    return chatRoomConversation;
  }

  async joinChatRoom (joinChatRoom: JoinChatRoom) :Promise<any> {
    
    const user = await this.userRepository.findOne({
      where:{username: joinChatRoom.username}
    });

    const chatRoom = await this.chatRoomRepository.findOne({
      where:{name:joinChatRoom.chatRoomName}
    });

    const isUserExistInchatRoom = await this.chatRoomUserRepository.findOne({
      where:{user:{id: user.id}}
    });
    console.log(user);
  
    if (!isUserExistInchatRoom){
      throw new Error('this user not in this chat room');
    }

    const conversation = await this.messageRepository.find({
      where:{
        chatRoom: {id: chatRoom.id},
      }
    });
    return conversation;
  }

  async findConversationBetweenUsers(createChatDto: MessageChatDto): Promise<Chat[]> {
    const user1 = await this.userRepository.findOne({ where: { username: createChatDto.user } });
    const user2 = await this.userRepository.findOne({ where: { username: createChatDto.secondUser } });
  
    if (!user1 || !user2) {
      return [];
    }
  
    const chats = await this.chatRepository.find({
      where: [
        { user: { id: user1.id }, secondUser: { id: user2.id } },
        { user: { id: user2.id }, secondUser: { id: user1.id } },
      ],
    });
  
    return chats;
  }
  

  async findMessageById(id: number): Promise<Chat> {
    return this.chatRepository.findOne({
      where: {
        id: id,
      }
    });
  }

  async update(updateChatDto: UpdateChatDto): Promise<Chat> {
    const chat = await this.findMessageById(updateChatDto.id);
    // console.log(chat);
    if (!chat) {
      throw new NotFoundException(`Chat message with ID ${updateChatDto.id} not found`);
    }
    chat.message = updateChatDto.message;
    const upadteMessage = await this.chatRepository.save(chat);
    // console.log(upadteMessage);
    return upadteMessage;
  }
  


  async identify(username: string, secondUsername: string,  clientId: string){
    const user = await this.userRepository.findOne({
      where:{
        username: username,
      },
    });

    const secondUser = await this.userRepository.findOne({
      where:{
        username: secondUsername,
      },
    });

    if (user && secondUser){
      this.clientToUser[clientId] = user;
      return Object.values(this.clientToUser);
    }
    else {
      throw new NotFoundException(`User with username '${username}' not found`);
    }
  }

  async getClientName(clientId: string) {
    return this.clientToUser[clientId];
  }

   async remove(updateChatDto: UpdateChatDto): Promise<any> {
     const chat = await this.chatRepository.findOne({
      where:{
        id: updateChatDto.id,
      }
     });
    //  console.log(updateChatDto);
    if (!chat) {
      throw new NotFoundException(`Chat message with ID ${ updateChatDto.id} not found`);
    }
    await this.chatRepository.remove(chat);
  }
  
  async removeConversation(updateChatDto: UpdateChatDto): Promise<any> {
    const user1 = await this.userRepository.findOne({ where: { username: updateChatDto.user } });
    const user2 = await this.userRepository.findOne({ where: { username: updateChatDto.secondUser } });
    const chats = await this.chatRepository.find({
      where: [
        { user: { id: user1.id }, secondUser: { id: user2.id } },
        { user: { id: user2.id }, secondUser: { id: user1.id } },
      ],
    });
   if (!chats) {
     throw new NotFoundException(`Chat message with ID ${ updateChatDto.id} not found`);
   }
   await this.chatRepository.remove(chats);

   return await this.chatRepository.find({
    where: [
      { user: { id: user1.id }, secondUser: { id: user2.id } },
      { user: { id: user2.id }, secondUser: { id: user1.id } },
    ],
  });
 }
}