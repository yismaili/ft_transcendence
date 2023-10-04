import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { UserService } from 'src/user/user.service';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/typeorm/entities/User.entity';
import { Profile } from 'src/typeorm/entities/Profile.entity';
import { Relation } from 'src/typeorm/entities/Relation.entity';
import { HistoryEntity } from 'src/typeorm/entities/History.entity';
import { Achievement } from 'src/typeorm/entities/Achievement.entity';
import { UserModule } from 'src/user/user.module';
import { ChatRoom } from 'src/typeorm/entities/chat-room.entity';
import { ChatRoomUser } from 'src/typeorm/entities/chat-room-users.entity';
import { Message } from 'src/typeorm/entities/message-entity';
import { Chat } from 'src/typeorm/entities/chat-entity';
import { AuthService } from 'src/auth/auth.service';


@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forFeature([User, Profile, Relation, Achievement, HistoryEntity, ChatRoom, ChatRoomUser, Message, Chat]),
  ],
  providers: [ChatService, UserService, AuthModule, ChatGateway, AuthService],
})
export class ChatModule {}
