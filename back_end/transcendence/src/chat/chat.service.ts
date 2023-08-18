import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from 'src/typeorm/entities/chat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
    private readonly userService: UserService
  ) {}
  clientToUser = {};
  async createChatMessage(createChatDto: CreateChatDto, sender: string): Promise<any> {
    const newChatMessage = this.chatRepository.create({
      status: createChatDto.status,
      password: createChatDto.password,
      time: createChatDto.time,
      statusPermissions: createChatDto.statusPermissions,
      statusUser: createChatDto.statusUser,
      text: createChatDto.text,
      user: createChatDto.user,
      messager: createChatDto.messager,
    });
    this.chatRepository.save(newChatMessage);
    return newChatMessage;
  }

  async findAllMessages(): Promise<Chat[]> {
    const messages = this.chatRepository.find();
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


  async identify(username: string, clientId: string){
    const user = await this.userService.findProfileByUsername(username);
    if (user)
    {
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

