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
import { use } from 'passport';
import { BanUserDto } from './dto/ban-user.dto';
import { KickUserDto } from './dto/kick-user.dto';
import { MutUserDto } from './dto/mut-user.dto';

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
            time: 0,
            statusPermissions: createChatRoomDto.statusPermissions,
            statusUser: 'member',
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


async joinUserToChatRoom(joinUserToChatRoom: JoinUsertoChatRoom): Promise<any> {
  const user = await this.userRepository.findOne({
      where: {
          username: joinUserToChatRoom.username,
      },
  });

  const ismember = await this.chatRoomUserRepository.findOne({
    where: {
      user:{id: user.id},
      statusUser: 'baned',
    },
  });

  if (ismember) {
    throw new Error('You are not allowed here; you are banned or not a member.');
  }

  if (!user) {
      throw new Error('User does not exist');
  }

  const adminUser = await this.userRepository.findOne({
      where: {
          username: joinUserToChatRoom.adminUsername,
      },
  });

  if (!adminUser) {
      throw new Error('Admin user does not exist');
  }

  const adminUserChatRoom = await this.chatRoomUserRepository.findOne({
      where: {
          user: {id: adminUser.id},
          statusPermissions: 'admin',
      },
  });

  if (!adminUserChatRoom) {
      throw new Error('You are not an admin to add users');
  }

  const chatRoom = await this.chatRoomRepository.findOne({
      where: {
          name: joinUserToChatRoom.chatRoomName,
      },
  });

  if (!chatRoom) {
      throw new Error('Chat room does not exist');
  }

  const isUserExistInChatRoom = await this.chatRoomUserRepository.findOne({
      where: {
        user: {id: user.id},
        chatRooms: {id: chatRoom.id},
      },
  });

  if (isUserExistInChatRoom) {
      throw new Error('User already exists in this chat room');
  }

  const createChatRoomUser = this.chatRoomUserRepository.create({
      time: 0,
      statusPermissions: joinUserToChatRoom.statusPermissions,
      user,
      statusUser: 'member',
      chatRooms: chatRoom,
  });

  return await this.chatRoomUserRepository.save(createChatRoomUser);
}


async sendMessage(sendMessageToChatRoom: SendMessageToChatRoom): Promise<any> {
  const user = await this.userRepository.findOne({
    where: { username: sendMessageToChatRoom.username }
  });

  const ismember = await this.chatRoomUserRepository.findOne({
    where: {
      user:{id: user.id},
      statusUser: 'member',
    },
  });

  if (!ismember) {
    throw new Error('You are not allowed here; you are banned or not a member.');
  }

  const chatRoom = await this.chatRoomRepository.findOne({
    where: {
      name: sendMessageToChatRoom.chatRoomName,
    },
  });

  if (!chatRoom) {
    throw new Error('Chat room not found.');
  }

  const newMessage = this.messageRepository.create({
    user: user,
    message: sendMessageToChatRoom.message,
    chatRoom: chatRoom,
  });

  return this.messageRepository.save(newMessage);
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

    const ismember = await this.chatRoomUserRepository.findOne({
      where: {
        user:{id: user.id},
        statusUser: 'member',
      },
    });
    if (!ismember) {
      throw new Error('You are not allowed here; you are banned or not a member.');
    }

    const chatRoom = await this.chatRoomRepository.findOne({
      where:{name: joinChatRoom.chatRoomName}
    });
    const isUserExistInchatRoom = await this.chatRoomUserRepository.findOne({
      where:{user:{id: user.id}}
    });
    
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
      console.log(updateChatDto);
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

 async banUser(banUserDto: BanUserDto) {
  // Check if the user performing the ban is an admin
  const isAdmin = await this.userRepository.findOne({
    where: { username: banUserDto.username },
  });

  const adminUserChatRoom = await this.chatRoomUserRepository.findOne({
    where: {
      user: { id: isAdmin.id },
      statusPermissions: 'admin',
    },
  });

  if (!adminUserChatRoom) {
    throw new Error('You are not an admin to ban users');
  }

  // Check if the target user is an admin
  const user = await this.userRepository.findOne({
    where: {
      username: banUserDto.userGetBan,
    },
  });

  const isNotAdmin = await this.chatRoomUserRepository.findOne({
    where: {
      user: { id: user.id },
      statusPermissions: 'admin',
    },
  });

  if (isNotAdmin) {
    throw new Error('You cannot ban an admin user');
  }

  // Ban the user
  const chatRoomUser = await this.chatRoomUserRepository.findOne({
    where: {
      user: { id: user.id },
    },
  });

  if (chatRoomUser) {
    chatRoomUser.statusUser = 'baned';
    await this.chatRoomUserRepository.save(chatRoomUser);

    return { message: 'User banned successfully' };
  } else {
    return { message: 'User not found in the chat room' };
  }
}


async kickUser(kickUserDto: KickUserDto) {
  // Check if the user performing the kick is an admin
  const isAdmin = await this.userRepository.findOne({
    where: { username: kickUserDto.username },
  });

  const adminUserChatRoom = await this.chatRoomUserRepository.findOne({
    where: {
      user: { id: isAdmin.id },
      statusPermissions: 'admin',
    },
  });

  if (!adminUserChatRoom) {
    throw new Error('You are not an admin to kick users');
  }

  // Check if the target user is an admin
  const user = await this.userRepository.findOne({
    where: {
      username: kickUserDto.userGetkick,
    },
  });

  const isNotAdmin = await this.chatRoomUserRepository.findOne({
    where: {
      user: { id: user.id },
      statusPermissions: 'admin',
    },
  });

  if (isNotAdmin) {
    throw new Error('You cannot kick an admin user');
  }

  // Check if the user is banned
  const isBanned = await this.chatRoomUserRepository.findOne({
    where: {
      user: { id: user.id },
      statusUser: 'band',
    },
  });

  if (isBanned) {
    throw new Error('You are not allowed here; you are banned or not a member.');
  }

  // Kick the user
  const chatRoomUser = await this.chatRoomUserRepository.findOne({
    where: {
      user: { id: user.id },
    },
  });

  if (chatRoomUser) {
    await this.chatRoomUserRepository.delete(chatRoomUser.id);
    return { message: 'User kicked successfully' };
  } else {
    return { message: 'User not found in the chat room' };
  }
}

async mutUser(mutUserDto: MutUserDto) {
  // Check if the user performing the mute is an admin
  const isAdmin = await this.userRepository.findOne({
    where: { username: mutUserDto.username },
  });

  const adminUserChatRoom = await this.chatRoomUserRepository.findOne({
    where: {
      user: { id: isAdmin.id },
      statusPermissions: 'admin',
    },
  });

  if (!adminUserChatRoom) {
    throw new Error('You are not an admin to mute users');
  }

  // Check if the target user is an admin
  const user = await this.userRepository.findOne({
    where: {
      username: mutUserDto.userGetmut,
    },
  });

  const isNotAdmin = await this.chatRoomUserRepository.findOne({
    where: {
      user: { id: user.id },
      statusPermissions: 'admin',
    },
  });

  if (isNotAdmin) {
    throw new Error('You cannot mute an admin user');
  }

  // Check if the user is banned
  const isBanned = await this.chatRoomUserRepository.findOne({
    where: {
      user: { id: user.id },
      statusUser: 'band',
    },
  });

  if (isBanned) {
    throw new Error('You are not allowed here; you are banned or not a member.');
  }

  // Mute the user
  const chatRoomUser = await this.chatRoomUserRepository.findOne({
    where: {
      user: { id: user.id },
    },
  });

  if (chatRoomUser) {
    chatRoomUser.statusUser = 'muted';
    chatRoomUser.time = mutUserDto.time;
    await this.chatRoomUserRepository.save(chatRoomUser);

    return { message: 'User muted successfully' };
  } else {
    return { message: 'User not found in the chat room' };
  }
}

}