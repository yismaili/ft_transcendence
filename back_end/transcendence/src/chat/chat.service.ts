import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User.entity';
import { UserService } from 'src/user/user.service';
import { Profile } from 'src/typeorm/entities/Profile.entity';
import { Relation } from 'src/typeorm/entities/Relation.entity';
import { HistoryEntity } from 'src/typeorm/entities/History.entity';
import { Achievement } from 'src/typeorm/entities/Achievement.entity';
import { MessageChatDto } from './dto/message-chat.dto';
import { Chat } from 'src/typeorm/entities/chat-entity';
import { Message } from 'src/typeorm/entities/message-entity';
import { ChatRoom } from 'src/typeorm/entities/chat-room.entity';
import { ChatRoomUser } from 'src/typeorm/entities/chat-room-users.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    // @InjectRepository(Profile)private profileRepository: Repository<Profile>,
    // @InjectRepository(Relation)private relationRepository: Repository<Relation>,
    // @InjectRepository(HistoryEntity)private historyRepository: Repository<HistoryEntity>,
    // @InjectRepository(Achievement)private achievementRepository: Repository<Achievement>,
    // @InjectRepository(Message)private messageRepository: Repository<Message>,
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    // @InjectRepository(ChatRoom)private chartRoomRepository: Repository<ChatRoom>,
    // @InjectRepository(ChatRoomUser)private chartRoomUserRepository: Repository<ChatRoomUser>,
    private readonly userService: UserService
  ) {}
  clientToUser = {};
  
  async createChatMessage(createChatDto: MessageChatDto, sender: string): Promise<any> {
    
    const user = await this.userRepository.findOne({
      where: {
        username: createChatDto.user,
      }
    });

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
      ]
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

  async update(id: number, updateChatDto: UpdateChatDto): Promise<Chat> {
    const chat = await this.chatRepository.findOne({
      where: {
        id: id,
      }
    });

    if (!chat) {
      throw new NotFoundException(`Chat message with ID ${id} not found`);
    }
    return this.chatRepository.save(chat); // Save the updated chat message
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

  getClientName(clientId: string) {
    return this.clientToUser[clientId];
  }

  async remove(id: number): Promise<void> {
    const chat = await this.chatRepository.findOne({
      where: {
        id: id,
      }
    });
    if (!chat) {
      throw new NotFoundException(`Chat message with ID ${id} not found`);
    }

    await this.chatRepository.remove(chat); // Remove the chat message
  }
}