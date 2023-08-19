import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from 'src/typeorm/entities/chat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User.entity';
import { UserService } from 'src/user/user.service';
import { Profile } from 'src/typeorm/entities/Profile.entity';
import { Relation } from 'src/typeorm/entities/Relation.entity';
import { HistoryEntity } from 'src/typeorm/entities/History.entity';
import { Achievement } from 'src/typeorm/entities/Achievement.entity';
import { MessageChatDto } from './dto/message-chat.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile)private profileRepository: Repository<Profile>,
    @InjectRepository(Relation)private relationRepository: Repository<Relation>,
    @InjectRepository(HistoryEntity)private historyRepository: Repository<HistoryEntity>,
    @InjectRepository(Achievement)private achievementRepository: Repository<Achievement>,
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    private readonly userService: UserService
  ) {}
  clientToUser = {};
  
  async createChatMessage(createChatDto: MessageChatDto, sender: string): Promise<any> {
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
    const newChatMessage = this.chatRepository.create({
      text: createChatDto.text,
      user: user,
      secondUser: secondUser,
    });
    
    this.chatRepository.save(newChatMessage);
    return newChatMessage;
  }

  async findAllMessages(createChatDto: MessageChatDto): Promise<Chat[]> {

    console.log(createChatDto);
    const user = await this.userRepository.findOne({
      where: {
        username: createChatDto.username,
      }
    });
    const messages = await this.chatRepository.find(
      {
        where: {
          user: user.chats,
        }
      }
    );
    return messages;
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

