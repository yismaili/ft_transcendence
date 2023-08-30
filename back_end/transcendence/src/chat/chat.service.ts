import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
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
import { MuteUserDto } from './dto/mut-user.dto';
import { ChatRoomOfUserDto } from './dto/chatRoom-of-user.dto';
import { LeaveChatRoomDto } from './dto/leave-ChatRoom.dto';
import { JoinRoom } from './dto/join-room.dto';
import { UnmuteUserDto } from './dto/unmute-user.dto';
import { UsersOfChatRoom } from './dto/users-of-chatRoom.dto';

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
        const passwordHashed = await this.hashingPasswordSrvice.hashPassword(createChatRoomDto.password);
        const newChatRoom = this.chatRoomRepository.create({
            name: createChatRoomDto.name,
            status: createChatRoomDto.status,
            password: passwordHashed,
        });

        const savedNewChatRoom = await this.chatRoomRepository.save(newChatRoom);

        const chatRoom = await this.chatRoomRepository.findOne({
            where: {
                id: savedNewChatRoom.id,
            },
        });

        const newChatRoomUser = this.chatRoomUserRepository.create({
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
      statusUser: 'banned',
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

  
  const chatRoom = await this.chatRoomRepository.findOne({
    where: {
      name: joinUserToChatRoom.chatRoomName,
    },
  });

  if (!chatRoom) {
      throw new Error('Chat room does not exist');
  }
  
  const adminUserChatRoom = await this.chatRoomUserRepository.findOne({
      where: {
          user: {id: adminUser.id},
          statusPermissions: 'admin',
          chatRooms: {id: chatRoom.id},
      },
  });

  if (!adminUserChatRoom) {
      throw new Error('You are not an admin to add users');
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

  const chatRoom = await this.chatRoomRepository.findOne({
    where: {
      name: sendMessageToChatRoom.chatRoomName,
    },
  });
  
  if (!chatRoom) {
    throw new Error('Chat room not found.');
  }

  let ismember = await this.chatRoomUserRepository.findOne({
    where: {
      user:{id: user.id},
      statusUser: 'member',
      chatRooms: {id: chatRoom.id},
    },
  });
  
  if (!ismember) {
     ismember = await this.chatRoomUserRepository.findOne({
      where: {
        user:{id: user.id},
        statusUser: 'muted',
        chatRooms: {id: chatRoom.id},
      },
    });
    if (!ismember){
      throw new Error('You are not allowed here; you are muted or not a member.');
    }
  }
  const date = new Date();
  if ( date < ismember.time) {
    throw new Error('You are not allowed here; you are muted or not a member.');
  }else if (date > ismember.time){
    const tmp: UnmuteUserDto = {
      username: sendMessageToChatRoom.username,
      chatRoomName: sendMessageToChatRoom.chatRoomName,
    };
    this.unmuteUser(tmp);
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

  async joinChatRoomWithAdmin (joinChatRoom: JoinChatRoom) :Promise<any> {
    
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
      throw new Error('You are not allowed here');
    }

    const chatRoom = await this.chatRoomRepository.findOne({
      where:{name: joinChatRoom.chatRoomName}
    });
    const isUserExistInchatRoom = await this.chatRoomUserRepository.findOne({
      where:{
        user:{id: user.id},
        chatRooms: {id: chatRoom.id},
    }
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

  const chatRoom = await this.chatRoomRepository.findOne({
    where: {
          name : banUserDto.chatRoomName,
    }
  });
  const adminUserChatRoom = await this.chatRoomUserRepository.findOne({
    where: {
      user: { id: isAdmin.id },
      statusPermissions: 'admin',
      chatRooms: {id: chatRoom.id},
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
    chatRoomUser.statusUser = 'banned';
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

  const chatRoom = await this.chatRoomRepository.findOne({
    where: {
          name : kickUserDto.chatRoomName,
    }
  });
  const adminUserChatRoom = await this.chatRoomUserRepository.findOne({
    where: {
      user: { id: isAdmin.id },
      statusPermissions: 'admin',
      chatRooms: {id: chatRoom.id},
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
      statusUser: 'banned',
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

async muteUser(muteUserDto: MuteUserDto) {
  // Check if the user performing the mute is an admin
  const isAdmin = await this.userRepository.findOne({
    where: { username: muteUserDto.username },
  });

  const chatRoom = await this.chatRoomRepository.findOne({
    where: {
          name : muteUserDto.chatRoomName,
    }
  });
  const adminUserChatRoom = await this.chatRoomUserRepository.findOne({
    where: {
      user: { id: isAdmin.id },
      statusPermissions: 'admin',
      chatRooms: {id: chatRoom.id},
    },
  });

  if (!adminUserChatRoom) {
    throw new Error('You are not an admin to mute users');
  }

  // Check if the target user is an admin
  const user = await this.userRepository.findOne({
    where: {
      username: muteUserDto.userGetmute,
    },
  });

  const isNotAdmin = await this.chatRoomUserRepository.findOne({
    where: {
      user: { id: user.id },
      statusPermissions: 'admin',
      chatRooms: {id: chatRoom.id},
    },
  });

  if (isNotAdmin) {
    throw new Error('You cannot mute an admin user');
  }

  // Check if the user is banned
  const isBanned = await this.chatRoomUserRepository.findOne({
    where: {
      user: { id: user.id },
      statusUser: 'banned',
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

  const originalTimestamp = new Date();
  const additionalMinutes = muteUserDto.time;
  // Convert the original timestamp to Unix epoch time in milliseconds
  const originalUnixTime = originalTimestamp.getTime();

  // Calculate the new Unix epoch time after adding the minutes
  const newUnixTime = originalUnixTime + additionalMinutes * 60 * 1000;

  // Convert the new Unix epoch time back to a human-readable timestamp
  const newTimestamp = new Date(newUnixTime);

  if (chatRoomUser) {
    chatRoomUser.statusUser = 'muted';
    chatRoomUser.time = newTimestamp;
    await this.chatRoomUserRepository.save(chatRoomUser);

    return { message: 'User muted successfully' };
  } else {
    return { message: 'User not found in the chat room' };
  }
}

async getAllChatRoomOfUser(chatRoomOfUserDto: ChatRoomOfUserDto): Promise<any>{
    const user = await this.userRepository.findOne({
      where: {
        username: chatRoomOfUserDto.username,
      }
    });

    const allChatRooms = await this.chatRoomUserRepository.find({
      where: {
        user:{id: user.id},
        statusUser: Not('banned'),
      }
    });
    return allChatRooms;
}

async unbannedUser (unbannedUserDtoo: BanUserDto) {
  // Check if the user performing the unbanned is an admin
  const isAdmin = await this.userRepository.findOne({
    where: { username: unbannedUserDtoo.username },
  });

  const chatRoom = await this.chatRoomRepository.findOne({
    where: {
          name : unbannedUserDtoo.chatRoomName,
    }
  });
  const adminUserChatRoom = await this.chatRoomUserRepository.findOne({
    where: {
      user: { id: isAdmin.id },
      statusPermissions: 'admin',
      chatRooms: {id: chatRoom.id},
    },
  });

  if (!adminUserChatRoom) {
    throw new Error('You are not an admin to unbanned users');
  }

  // Check if the target user is an admin
  const user = await this.userRepository.findOne({
    where: {
      username: unbannedUserDtoo.userGetBan,
    },
  });

  // unbanned the user
  const chatRoomUser = await this.chatRoomUserRepository.findOne({
    where: {
      user: { id: user.id },
    },
  });

  if (chatRoomUser) {
    chatRoomUser.statusUser = 'member';
    await this.chatRoomUserRepository.save(chatRoomUser);

    return { message: 'User unbanned successfully' };
  } else {
    return { message: 'User not found in the chat room' };
  }
}

async changePermissionToUser (changePermissionToUserDto: BanUserDto): Promise<any>{

    const isAdmin = await this.userRepository.findOne({
      where: { username: changePermissionToUserDto.username },
    });
  
    const chatRoom = await this.chatRoomRepository.findOne({
      where: {
            name : changePermissionToUserDto.chatRoomName,
      }
    });
    const adminUserChatRoom = await this.chatRoomUserRepository.findOne({
      where: {
        user: { id: isAdmin.id },
        statusPermissions: 'admin',
        chatRooms: {id: chatRoom.id},
      },
    });
  
    if (!adminUserChatRoom) {
      throw new Error('You are not an admin to unbanned users');
    }
 
    const user = await this.userRepository.findOne({
      where: {
        username: changePermissionToUserDto.userGetBan,
      },
    });
  
    const chatRoomUser = await this.chatRoomUserRepository.findOne({
      where: {
        user: { id: user.id },
      },
    });
  
    if (chatRoomUser) {
      chatRoomUser.statusPermissions = 'admin';
      await this.chatRoomUserRepository.save(chatRoomUser);
  
      return { message: 'User unbanned successfully' };
    } else {
      return { message: 'User not found in the chat room' };
    }
}

async leaveChatRoom (leaveChatRoomDto: LeaveChatRoomDto) : Promise<any>{

  const isAdmin = await this.userRepository.findOne({
    where: { username: leaveChatRoomDto.username },
  });

  const chatRoom = await this.chatRoomRepository.findOne({
    where: {
          name : leaveChatRoomDto.chatRoomName,
    }
  });
  const adminUserChatRoom = await this.chatRoomUserRepository.findOne({
    where: {
      user: { id: isAdmin.id },
      statusPermissions: 'admin',
      chatRooms: {id: chatRoom.id},
    },
  });

  if (adminUserChatRoom) {
    throw new Error('you have not leave this chat room!');
  }

  const chatRoomUser = await this.chatRoomUserRepository.findOne({
    where: {
      user: { id: isAdmin.id },
      chatRooms: {id: chatRoom.id},
    },
  });

  if (chatRoomUser) {
    await this.chatRoomUserRepository.delete(chatRoomUser.id);
    return { message: 'User kicked successfully' };
  } else {
    return { message: 'User not found in the chat room' };
  }
}
// delete chat room not working
async deleteChatRoom (deleteChatRoomDto: LeaveChatRoomDto) : Promise<any>{

  const isAdmin = await this.userRepository.findOne({
    where: { username: deleteChatRoomDto.username },
  });

  const chatRoom = await this.chatRoomRepository.findOne({
    where: {
          name : deleteChatRoomDto.chatRoomName,
    }
  });
  const adminUserChatRoom = await this.chatRoomUserRepository.findOne({
    where: {
      user: { id: isAdmin.id },
      statusPermissions: 'admin',
      chatRooms: {id: chatRoom.id},
    },
  });

  if (!adminUserChatRoom) {
    throw new Error('you are not admin');
  }

  const chatRoomUser = await this.chatRoomRepository.findOne({
    where: {
      chatRoomUser: { id: isAdmin.id },
    },
  });

  if (chatRoomUser) {
    await this.chatRoomRepository.delete(chatRoomUser.id);
    return { message: 'User kicked successfully' };
  } else {
    return { message: 'User not found in the chat room' };
  }
}

async getAllChatRoom(chatRoomOfUserDto: ChatRoomOfUserDto) : Promise<any>{
  const user = await this.userRepository.findOne({
    where: {
      username: chatRoomOfUserDto.username,
    }
  });

  if (!user){
    throw new Error('this user not exist');
  }
  const chatRoom = await this.chatRoomRepository.find(
    {
      where: {
        status: Not('private'),
      }
    }
  );
  // console.log(chatRoom);
  return chatRoom;
}

async joinChatRoom (joinRoom: JoinRoom) {

  const user = await this.userRepository.findOne({
    where: {
        username: joinRoom.username,
    },
});

if (!user) {
    throw new Error('User does not exist');
}

const ismember = await this.chatRoomUserRepository.findOne({
  where: {
    user:{id: user.id},
    statusUser: 'banned',
  },
});

if (ismember) {
  throw new Error('You are not allowed here; you are banned or not a member.');
}


let chatRoom = await this.chatRoomRepository.findOne({
  where: {
    name: joinRoom.chatRoomName,
    status: 'protected',
  },
});

if (chatRoom) {
  const dehashpassword = await this.hashingPasswordSrvice.verifyPassword(chatRoom?.password, joinRoom.password);
  if (!dehashpassword) {
      throw new NotFoundException('Invalid password');
  }
}
else{
   chatRoom = await this.chatRoomRepository.findOne({
    where: {
      name: joinRoom.chatRoomName,
      status: 'public',
    },
  });
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
    statusPermissions: 'member',
    user,
    statusUser: 'member',
    chatRooms: chatRoom,
});
await this.chatRoomUserRepository.save(createChatRoomUser);
const conversation = await this.messageRepository.find({
  where:{
    chatRoom: {id: chatRoom.id},
  }
});
return  conversation;
}

async unmuteUser(unmuteUserDto: UnmuteUserDto) : Promise<any>{

  const user = await this.userRepository.findOne({
    where: {
      username: unmuteUserDto.username,
    }
  });

  const charRoom = await this.chatRoomRepository.findOne({
    where: {name: unmuteUserDto.chatRoomName},
  });

  const chatRoomUser = await this.chatRoomUserRepository.findOne({
    where:{
      user: {id: user.id},
      chatRooms: {id: charRoom.id},
    },
  });

  chatRoomUser.statusUser = 'member';
  await this.chatRoomUserRepository.save(chatRoomUser);
}

async getAllUserOfChatRoom(usersOfChatRoom: UsersOfChatRoom) : Promise<any>{

  const user = await this.userRepository.findOne({
    where: {
      username: usersOfChatRoom.username,
    }
  });

  const charRoom = await this.chatRoomRepository.findOne({
    where: {name: usersOfChatRoom.chatRoomName},
  });

  const chatRoomUser = await this.chatRoomUserRepository.find({
    where:{
      chatRooms: {id: charRoom.id},
    },
  });

//   if (!chatRoomUser){
//     throw new Error('User not exists in this chat room');
//   }
 const users =  await this.userRepository.find({
    where: {
      chatRoomUsers:{chatRooms:{id :charRoom.id}},
    }
  });
  console.log(users);
  return (chatRoomUser);
}

}