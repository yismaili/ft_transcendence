import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
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
import { ChatRoom } from 'src/typeorm/entities/chat-room.entity';
import { ChatRoomUsers } from 'src/typeorm/entities/chat-room-users.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile)private profileRepository: Repository<Profile>,
    @InjectRepository(Relation)private relationRepository: Repository<Relation>,
    @InjectRepository(HistoryEntity)private historyRepository: Repository<HistoryEntity>,
    @InjectRepository(Achievement)private achievementRepository: Repository<Achievement>,
    @InjectRepository(ChatRoom) private chatRoomRepository: Repository<ChatRoom>,
    @InjectRepository(ChatRoomUsers) private chatRoomUsersRepository: Repository<ChatRoomUsers>,
    private readonly userService: UserService
  ) {}
  clientToUser = {};
  
  async createChatMessage(createChatDto: MessageChatDto, sender: string): Promise<any> {
    // Finding the user and the second user based on their usernames
    const user = await this.userRepository.findOne({
      where: {
        username: createChatDto.username,
      }
    });
    const secondUser = await this.userRepository.findOne({
      where: {
        username: createChatDto.secondUsername,
      }
    });
    // Creating a new chat room with the provided text
    const newChat = this.chatRoomRepository.create({
      text: createChatDto.text,
    });
    const chat =  await this.chatRoomRepository.save(newChat);
    
    const newUser = this.chatRoomUsersRepository.create({
      user: user,
      chatRoom: chat,
    });
    const newsecondUser = this.chatRoomUsersRepository.create({
      user: secondUser,
      chatRoom: chat,
    });
  
    // Saving the associations
    this.chatRoomUsersRepository.save(newUser);
    this.chatRoomUsersRepository.save(newsecondUser);
    return newChat;
  }
  

  async findAllMessagesOfUser(createChatDto: MessageChatDto): Promise<any> {
    const chats = await this.userRepository.find({
      where: [
        {username: createChatDto.username},
      ]
    });
  console.log(chats);
    return chats;
  }
  

  async findMessageById(id: number): Promise<ChatRoomUsers> {
    return this.chatRoomUsersRepository.findOne({
      where: {
        id: id,
      }
    });
  }

  async update(id: number, updateChatDto: UpdateChatDto): Promise<ChatRoomUsers> {
    const chat = await this.chatRoomUsersRepository.findOne({
      where: {
        id: id,
      }
    });

    if (!chat) {
      throw new NotFoundException(`Chat message with ID ${id} not found`);
    }
    return this.chatRoomUsersRepository.save(chat); // Save the updated chat message
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
    const chat = await this.chatRoomUsersRepository.findOne({
      where: {
        id: id,
      }
    });
    if (!chat) {
      throw new NotFoundException(`Chat message with ID ${id} not found`);
    }

    await this.chatRoomUsersRepository.remove(chat); // Remove the chat message
  }
}

