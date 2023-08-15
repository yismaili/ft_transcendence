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

  async createChatMessage(createChatDto: CreateChatDto, sender: string): Promise<any> {
    const user = await this.userService.findProfileByUsername(sender);

    const newChatMessage = this.chatRepository.create({
      ...createChatDto,
    });
    return this.chatRepository.save(newChatMessage);
  }

  async findAllMessages(): Promise<Chat[]> {
    return this.chatRepository.find();
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

    // Update the chat message properties
    chat.property1 = updateChatDto.property1;
    chat.property2 = updateChatDto.property2;

    return this.chatRepository.save(chat); // Save the updated chat message
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

