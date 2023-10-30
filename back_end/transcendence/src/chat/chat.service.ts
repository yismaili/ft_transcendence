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
import { UnmuteUserDto } from './dto/unmute-user.dto';
import { UsersOfChatRoom } from './dto/users-of-chatRoom.dto';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { Socket, Server } from 'socket.io';
import { updateChatRoom } from './dto/update-chat-room.dto';
import * as fs from 'fs'
const path = require('path');
import {v2 as cloudinary} from 'cloudinary';
import { get } from 'http';

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
    private readonly authService: AuthService,
  ) {}
  rooms: Map<string, Socket[]> = new Map<string, Socket[]>();

  async createChatDirect(createChatDto, clientId, server) : Promise<any>{
    try {
      const user = await this.userRepository.findOne({
        where: {
          username: createChatDto.user,
        },
      });
      const secondUser = await this.userRepository.findOne({
        where: {
          username: createChatDto.secondUser,
        },
      });

      if (!user || !secondUser){
        throw new Error('user not found');
      }

      let roomName = `Room_${user.username}_${secondUser.username}`;
      clientId.join(roomName);

      const newChatMessage = this.chatRepository.create({
        message: createChatDto.message,
        user: user,
        secondUser: secondUser,
      });
  
      await this.chatRepository.save(newChatMessage);
      
      // Iterate through connected sockets and make them join the room

      for (const [room, sockets] of this.isconnected) {
        // console.log(room);
        if (room === secondUser.username) {
          for (const socket of sockets) {
            await socket.join(roomName);
            // console.log(socket.id);
          }
        }
      }

      // const chats = await this.chatRepository.find({
      //   where: [
      //     { user: { id: user.id }, secondUser: { id: secondUser.id } },
      //     { user: { id: secondUser.id }, secondUser: { id: user.id } },
      //   ],
      //   // relations: ['user']
      // });
      const chats = await this.chatRepository.find({
        where:
          {id: newChatMessage.id},
        relations: ['user']
      });
      server.to(roomName).emit('message', chats);
      return;
    } catch (error) {
      console.error('Error in createChatDirect:', error);
      throw error;
    }
  }
  
  private generateUniqueRoomName(user: User, chatRoomName: string ): string {
    let roomName = `Room_${user.username}+${chatRoomName}`;
    let count = 1;
    while (this.rooms.has(roomName)) {
      roomName = `Room_${user.username}+${chatRoomName}_${count}`;
      count++;
    }
    return roomName;
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

        const allowedStatuses = ['protected', 'public', 'private'];
        if (!allowedStatuses.includes(createChatRoomDto.status)) {
          throw new Error("Status of the chat room is not correct.");
        }

        let hash = "Dexter's is here";
        if (createChatRoomDto.password != null && createChatRoomDto.status === 'protected'){
          const saltOrRounds = 10
          hash = await bcrypt.hash(createChatRoomDto.password, saltOrRounds);
        }
        const roomId = this.authService.generateRandom(30);
        
        const ischatRoomExist = await this.chatRoomRepository.findOne({
          where:{chatRoomUser: { id: user.id}, RoomId: createChatRoomDto.name+roomId}
        });

        if (ischatRoomExist){
          throw new Error('his chat room exist');
        }
          let file_path = process.env.DEFAULTIMAGECHATROOM;
          if (createChatRoomDto.picture != null){
          const imageBuffer = createChatRoomDto.picture;
          const filePath = './uploads';
          const filename = Date.now() + '-' + Math.round(Math.random() * 1e9) + '.jpg';
          
          const fullFilePath = path.join(filePath, filename);
          
          try {
            fs.writeFileSync(fullFilePath, imageBuffer);
          } catch (error) {
            console.error('Error saving the image:', error);
          }
          const ret = await this.uploadImageToCould(fullFilePath) ;
          file_path = ret.url;
      }
        const newChatRoom = this.chatRoomRepository.create({
            RoomId: `${createChatRoomDto.name}_${roomId}`,
            name: createChatRoomDto.name,
            status: createChatRoomDto.status,
            password: hash,
            picture: file_path
        });

        const savedNewChatRoom = await this.chatRoomRepository.save(newChatRoom);
        const chatRoom = await this.chatRoomRepository.findOne({
            where: {
                id: savedNewChatRoom.id,
            },
        });
      
        const newChatRoomUser = this.chatRoomUserRepository.create({
            statusPermissions: 'admin',
            owner: true,
            statusUser: 'member',
            user: user,
            chatRooms: chatRoom
        });
        await this.chatRoomUserRepository.save(newChatRoomUser);
        const chatRommInfo = await this.chatRoomRepository.findOne({
          where: {
            id: savedNewChatRoom.id},
            select: ['id', 'RoomId', 'name', 'status']
        });
        return chatRommInfo;
    } catch (error) {
        console.error(error);
        throw new Error('Error creating chat room');
    }
}

async uploadImageToCould(fileUrl: string): Promise<any> {

  cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(fileUrl, { public_id: 'olympic_flag' }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });

}

async joinUserToChatRoom(joinUserToChatRoom: JoinUsertoChatRoom): Promise<any> {
  const user = await this.userRepository.findOne({
      where: {
          username: joinUserToChatRoom.username,
      },
  });

  const chatRoom = await this.chatRoomRepository.findOne({
    where: {
      RoomId: joinUserToChatRoom.chatRoomName,
    },
  });

  if (!chatRoom) {
      throw new Error('Chat room does not exist');
  }

  const ismember = await this.chatRoomUserRepository.findOne({
    where: {
      user:{id: user.id},
      statusUser: 'banned',
      chatRooms: {id: chatRoom.id}
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

  
  // const chatRoom = await this.chatRoomRepository.findOne({
  //   where: {
  //     RoomId: joinUserToChatRoom.chatRoomName,
  //   },
  // });

  // if (!chatRoom) {
  //     throw new Error('Chat room does not exist');
  // }
  
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
      user: user,
      statusUser: 'member',
      chatRooms: chatRoom,
  });

  return await this.chatRoomUserRepository.save(createChatRoomUser);
}


async sendMessage(sendMessageToChatRoom: SendMessageToChatRoom, clientId: Socket, server: Server): Promise<any> {
  try{
      const user = await this.userRepository.findOne({
      where: { username: sendMessageToChatRoom.username },
    });

    const chatRoom = await this.chatRoomRepository.findOne({
      where: {RoomId: sendMessageToChatRoom.chatRoomName },
    });

    if (!chatRoom) {
      throw new Error('Chat room not found.');
    }
    // Check if the user is a member or muted
    const isMember = await this.chatRoomUserRepository.findOne({
      where: {
        user: { id: user.id },
        chatRooms: { id: chatRoom.id },
        // statusUser: 'member'
      },
    });
    if (!isMember) {
      throw new Error('You are not allowed here; you are muted or not a member.');
    }
    // const isMuted = await this.chatRoomUserRepository.findOne({
    //   where: {
    //     user: { id: user.id },
    //     chatRooms: { id: chatRoom.id },
    //     statusUser: 'muted'
    //   },
    // });
    
      const currentDate = new Date();
      
      if (isMember.statusUser === 'muted') {
        if (currentDate.getTime() > isMember.time.getTime()) {
          // Unmute the user if the mute time has passed
          const unmuteUserDto = {
            username: sendMessageToChatRoom.username,
            chatRoomName: sendMessageToChatRoom.chatRoomName,
          };
          await this.unmuteUser(unmuteUserDto);
        }
      }

    if (isMember.statusUser != 'muted') {
      // Save the message
      const newMessage = await this.messageRepository.create({
        user: user,
        message: sendMessageToChatRoom.message,
        chatRoom: chatRoom,
      });
      await this.messageRepository.save(newMessage);
      const roomName = await this.generateUniqueRoomName(user, sendMessageToChatRoom.chatRoomName);
      // clientId.join(roomName);
      
      // if (!this.rooms.has(roomName)) {
        //   this.rooms.set(roomName, []);
        // }
        
        // this.rooms.get(roomName).push(clientId);
        // Iterate through connected sockets and make them join the room
        const roomInfo: UsersOfChatRoom = {
          username: user.username,
          chatRoomName: sendMessageToChatRoom.chatRoomName,
        };
        const chatRoomUsers = await this.getAllUserOfChatRoom(roomInfo);
        
        for (const chatRoomUser of chatRoomUsers) {
          const username = chatRoomUser.user.username;
          // console.log(username);
          for (const socket of this.isconnected.get(username) || []) {
            await socket.join(roomName);
            // console.log(socket.id);
          }
        }
        
        // Emit the message to the chat room
        const chatRoomConversation = await this.messageRepository.findOne({
          where: {
            id:newMessage.id
            //chatRoom: { id: chatRoom.id }
          },
            relations:['user']
        });
        server.to(roomName).emit('message', chatRoomConversation);
    }
    else {
      throw new Error('You are not allowed here; you are muted');
    }
  }catch(error){
    throw new Error('Error to send message');
  }
}

  async findAllChatRoomConversation(getChatRoomMessages: GetChatRoomMessages) : Promise<any>{

    const chatRoom = await this.chatRoomRepository.findOne({
      where: {
        RoomId: getChatRoomMessages.chatRoomName,
      },
    });
    const chatRoomConversation =  await this.messageRepository.find({
      where: {
          chatRoom:{id: chatRoom.id},
      },
      relations:['user'],
      order: {
        id: 'ASC',
      },
    });
    return chatRoomConversation;
  }

  async joinChatRoomWithAdmin (joinChatRoom: JoinChatRoom) :Promise<any> {
    
    const user = await this.userRepository.findOne({
      where:{username: joinChatRoom.username}
    });
    const chatRoom = await this.chatRoomRepository.findOne({
      where:{RoomId: joinChatRoom.chatRoomName}
    });
    if (!chatRoom) {
      throw new Error('chat room not exist');
    }
    
    // console.log(chatRoom);
    const ismember = await this.chatRoomUserRepository.findOne({
      where: {
        user:{id: user.id},
        chatRooms: {id: chatRoom.id},
        statusUser: 'banned'
      }
    });
    if (ismember) {
      throw new Error('You are not allowed here');
    }

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
      relations: ['user'],
      order: {
        id: 'ASC',
      },
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
  
  async getClientName(username: string): Promise<string | null> {
    try {
      const client = await this.userRepository.findOne({
        where: { username: username },
      });
  
      if (client) {
        return client.username;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  

   async remove(updateChatDto: UpdateChatDto): Promise<any> {
     const chat = await this.chatRepository.findOne({
      where:{
        id: updateChatDto.id,
      }
     });
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
          RoomId : banUserDto.chatRoomName,
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
    throw new Error('You are not an owner or admin to ban users');
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
      chatRooms: {id: chatRoom.id}
    },
  });

  if (isNotAdmin && adminUserChatRoom.owner === false) {
    throw new Error('You cannot ban an admin or owner user');
  }

  // Ban the user
  const chatRoomUser = await this.chatRoomUserRepository.findOne({
    where: {
      user: { id: user.id },
      chatRooms: {id: chatRoom.id}
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
          RoomId : kickUserDto.chatRoomName,
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
      chatRooms: {id: chatRoom.id}
    },
  });

  if (isNotAdmin  && adminUserChatRoom.owner === false) {
    throw new Error('You cannot kick an admin user');
  }

  // Check if the user is banned
  const isBanned = await this.chatRoomUserRepository.findOne({
    where: {
      user: { id: user.id },
      statusUser: 'banned',
      chatRooms: {id: chatRoom.id}
    },
  });

  if (isBanned) {
    throw new Error('You are not allowed here; you are banned or not a member.');
  }

  // Kick the user
  const chatRoomUser = await this.chatRoomUserRepository.findOne({
    where: {
      user: { id: user.id },
      chatRooms: {id: chatRoom.id}
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
          RoomId: muteUserDto.chatRoomName,
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

  if (isNotAdmin && adminUserChatRoom.owner === false) {
    throw new Error('You cannot mute an admin user');
  }

  // Check if the user is banned
  const isBanned = await this.chatRoomUserRepository.findOne({
    where: {
      user: { id: user.id },
      statusUser: 'banned',
      chatRooms: {id: chatRoom.id}
    },
  });

  if (isBanned  &&  adminUserChatRoom.owner === false) {
    throw new Error('You are not allowed here; you are banned or not a member.');
  }

  // Mute the user
  const chatRoomUser = await this.chatRoomUserRepository.findOne({
    where: {
      user: { id: user.id,},
      chatRooms: {id: chatRoom.id}
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
      },
      relations:['chatRooms'],
    });
    // console.log(allChatRooms);
    return allChatRooms;
}

async unbannedUser (unbannedUserDtoo: BanUserDto) {
  // Check if the user performing the unbanned is an admin
  const isAdmin = await this.userRepository.findOne({
    where: { username: unbannedUserDtoo.username },
  });

  const chatRoom = await this.chatRoomRepository.findOne({
    where: {
          RoomId: unbannedUserDtoo.chatRoomName,
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
      chatRooms: {id: chatRoom.id}
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
            RoomId: changePermissionToUserDto.chatRoomName,
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
        chatRooms: {id: chatRoom.id}
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

async leaveChatRoom (leaveChatRoomDto: LeaveChatRoomDto,  server: Server) : Promise<any>{

  const isAdmin = await this.userRepository.findOne({
    where: { username: leaveChatRoomDto.username },
  });

  const chatRoom = await this.chatRoomRepository.findOne({
    where: {
          RoomId : leaveChatRoomDto.chatRoomName,
    }
  });

  const chatRoomUser = await this.chatRoomUserRepository.findOne({
    where: {
      user: { id: isAdmin.id },
      chatRooms: {id: chatRoom.id},
    },
  });
  
  if (chatRoomUser) {
    await this.chatRoomUserRepository.delete(chatRoomUser.id);
      const getUser = await this.chatRoomUserRepository.findOne({
        where: {
          chatRooms: {id: chatRoom.id},
          statusPermissions: 'admin'
        }
      });
    if (getUser){
      getUser.owner = true;
      await this.chatRoomUserRepository.save(getUser);
    }
    else{
      const getUser = await this.chatRoomUserRepository.findOne({
        where: {
          chatRooms: {id: chatRoom.id},
        }
      });
      if (getUser){
        getUser.statusPermissions = 'admin';
        getUser.owner = true;
        await this.chatRoomUserRepository.save(getUser);
      }
      else{
        return;
      }
    }
    return { message: 'User leaved successfully' };
  } else {
    return { message: 'User not found in the chat room' };
  }
}

async deleteChatRoom (deleteChatRoomDto: LeaveChatRoomDto, server: Server) : Promise<any>{
try{
  const user = await this.userRepository.findOne({
    where: { username: deleteChatRoomDto.username },
  });

  if (!user) {
    throw new Error('User not found');
  }
  const chatRoom = await this.chatRoomRepository.findOne({
    where: {
          RoomId : deleteChatRoomDto.chatRoomName
    }
  });

  if (!chatRoom) {
    throw new Error('chat room not found');
  }
  
  const adminUserChatRoom = await this.chatRoomUserRepository.findOne({
    where: {
      user: { id: user.id },
      statusPermissions: 'admin',
      owner: true,
      chatRooms: { RoomId: deleteChatRoomDto.chatRoomName },
    },
  });
  
  if (!adminUserChatRoom) {
    throw new Error('You do not have the necessary permissions to delete this chat room.');
  }
  
  
  // const chatRoomUser = await this.chatRoomRepository.findOne({
  //   where: {
  //     chatRoomUser: { id: user.id },
  //   },
  // });
  // if (!chatRoomUser) {
  //   throw new Error('User not found in the chat room');
  // }
    const messages = await this.messageRepository.find({
      where: {chatRoom: {RoomId: deleteChatRoomDto.chatRoomName}}
    });
    const usersOfChatRoom =  await this.chatRoomUserRepository.find({
      where: {chatRooms: {RoomId: deleteChatRoomDto.chatRoomName}}
    });
    let roomName = `RoomDel ${chatRoom.RoomId}`
    const roomInfo: UsersOfChatRoom = {
      username: user.username,
      chatRoomName:deleteChatRoomDto.chatRoomName,
    };
    const chatRoomUsers = await this.getAllUserOfChatRoom(roomInfo);
    await this.messageRepository.remove(messages);
    await this.chatRoomUserRepository.remove(usersOfChatRoom);
    await this.chatRoomRepository.delete(chatRoom.id);
    
    for (const chatRoomUser of chatRoomUsers) {
      const username = chatRoomUser.user.username;
      for (const socket of this.isconnected.get(username) || []) {
        await socket.join(roomName);
      }
    }
    server.to(roomName).emit('deleteChatRoom',{delete: true});
  }catch (error) {
    console.error('Error while deleting chat room:', error);
    throw new Error('Error to delete this chat room');
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
        status: Not('private')
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
const chatRoomID = await this.chatRoomRepository.findOne({
  where: {
    RoomId: joinRoom.chatRoomName,
  },
});
const ismember = await this.chatRoomUserRepository.findOne({
  where: {
    user:{id: user.id},
    statusUser: 'banned',
    chatRooms:{id: chatRoomID.id}
  }
});

if (ismember) {
  throw new Error('You are not allowed here; you are banned or not a member.');
}


let chatRoom = await this.chatRoomRepository.findOne({
  where: {
    RoomId: joinRoom.chatRoomName,
    status: 'protected'
  },
});

if (chatRoom) {
  const isMatch = await bcrypt.compare(joinRoom.password, chatRoom?.password);
  if (!isMatch ) {
      throw new NotFoundException('Invalid password');
  }
}
else{
   chatRoom = await this.chatRoomRepository.findOne({
    where: {
      RoomId: joinRoom.chatRoomName,
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
    where: {RoomId: unmuteUserDto.chatRoomName},
  });

  const chatRoomUser = await this.chatRoomUserRepository.findOne({
    where:{
      user: {id: user.id},
      chatRooms: {id: charRoom.id},
      statusUser: 'muted'
    },
  });

  chatRoomUser.statusUser = 'member';
  await this.chatRoomUserRepository.save(chatRoomUser);
}

async getAllUserOfChatRoom(usersOfChatRoom: UsersOfChatRoom) : Promise<any>{

  // const user = await this.userRepository.findOne({
  //   where: {
  //     username: usersOfChatRoom.username,
  //   }
  // });

  const charRoom = await this.chatRoomRepository.findOne({
    where: {RoomId: usersOfChatRoom.chatRoomName},
  });

  const chatRoomUser = await this.chatRoomUserRepository.find({
    where:{
      chatRooms: {id: charRoom.id},
    },
    relations: ['user']
  });

  if (!chatRoomUser){
    throw new Error('User not exists in this chat room');
  }
 const users =  await this.userRepository.find({
    where: {
      chatRoomUsers:{chatRooms:{id :charRoom.id}},
    }
  });
  // console.log(users);
  return (chatRoomUser);
}

async updateChatRoomInfo(updateChatRoomInf: updateChatRoom, server: Server) : Promise<any>{
  try{
    const user = await this.userRepository.findOne({
      where: {username: updateChatRoomInf.username}
    });

    if (!user){
      throw new Error("User NOt found!!");
    }
    const chatRoomInfo = await this.chatRoomRepository.findOne({
      where:{RoomId: updateChatRoomInf.roomId}
    });
    if (!chatRoomInfo){
      throw new Error("chat room not found");
    }

    const adminUserChatRoom = await this.chatRoomUserRepository.findOne({
      where: {
        user: { id: user.id },
        statusPermissions: 'admin',
        owner: true,
        chatRooms: {id: chatRoomInfo.id},
      },
    });
    if (!adminUserChatRoom){
      throw new Error("User not admin to update this chat room");
    }

    let hash = chatRoomInfo.password;
    let file_path = chatRoomInfo.picture;
    let chatRoomName = chatRoomInfo.picture
    let chatRoomStatus = updateChatRoomInf.status;
    
    if (updateChatRoomInf.status != null){
      chatRoomStatus = updateChatRoomInf.status;
    }
    
    if (updateChatRoomInf.chatRoomName != null){
      chatRoomName = updateChatRoomInf.chatRoomName;
    }
    
    if (updateChatRoomInf.password != null){
      const saltOrRounds = 10
      hash = await bcrypt.hash(updateChatRoomInf.password, saltOrRounds);
    }

    if (updateChatRoomInf.picture != null){
      const imageBuffer = updateChatRoomInf.picture;
      const filePath = './uploads';
      const filename = Date.now() + '-' + Math.round(Math.random() * 1e9) + '.jpg';
      // Combine the directory and filename to create the full path
      const fullFilePath = path.join(filePath, filename);
      try {
        // Write the image buffer to the specified file path
        fs.writeFileSync(fullFilePath, imageBuffer);
        //console.log('Image saved successfully');
      } catch (error) {
        throw new Error('Error saving the image');
      }
      const ret = await this.uploadImageToCould(fullFilePath);
      file_path = ret.url;
    }

    let roomName = `RoomDel ${chatRoomInfo.RoomId}`
    const roomInfo: UsersOfChatRoom = {
      username: user.username,
      chatRoomName: updateChatRoomInf.roomId,
    };
    const chatRoomUsers = await this.getAllUserOfChatRoom(roomInfo);

    chatRoomInfo.name = chatRoomName,
    chatRoomInfo.status = chatRoomStatus,
    chatRoomInfo.password = hash,
    chatRoomInfo.picture = file_path
    const saveChatRoomUP = await this.chatRoomRepository.save(chatRoomInfo);

    for (const chatRoomUser of chatRoomUsers) {
      const username = chatRoomUser.user.username;
      for (const socket of this.isconnected.get(username) || []) {
        await socket.join(roomName);
      }
    }
    
    server.to(roomName).emit('updateChatRoomInfo',{update: true});
    return saveChatRoomUP;

  }catch(error) {
    //console.log(error);
    throw new Error ('Error to update chat room');
  }
}


async addUserWithSocketId(username: string ,clientId: Socket) {
    try {
      if (!this.isconnected.has(username)) {
        this.isconnected.set(username,[]);
      }
      this.isconnected.get(username).push(clientId);
      
      // Handle user disconnection and remove them from the map
      clientId.on('disconnect', () => {
        if (this.isconnected.has(username)) {
          this.isconnected.delete(username);
        }
      });
    } catch (error) {
      throw error;
    }
  }

async gitAllUsers():Promise<any>{
  try{
    const users = await this.userRepository.find(
      {
        select: ['id', 'username', 'uniquename', 'firstName', 'lastName', 'status', 'email', 'picture']
      }
    );
    if (!users){
      throw new Error ("Users not found!!!");
    }
    return users;
  }catch(Error){
    throw new Error("Error to find all users");
  }
}

   isconnected: Map<string, Socket[]> = new Map<string, Socket[]>();
   connectedClients = new Map<string, { socket: Socket; username: string }>();
}

