import { Module } from '@nestjs/common';
import { UserStatusGateway } from './user-status.gateway';
import { ChatService } from 'src/chat/chat.service';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User.entity';
import { Profile } from 'src/typeorm/entities/Profile.entity';
import { Relation } from 'src/typeorm/entities/Relation.entity';
import { HistoryEntity } from 'src/typeorm/entities/History.entity';
import { Achievement } from 'src/typeorm/entities/Achievement.entity';
import { ChatRoom } from 'src/typeorm/entities/chat-room.entity';
import { ChatRoomUser} from 'src/typeorm/entities/chat-room-users.entity';
import { Message } from 'src/typeorm/entities/message-entity';
import { Chat } from 'src/typeorm/entities/chat-entity';
import { AuthModule } from 'src/auth/auth.module';
import { ChatModule } from 'src/chat/chat.module';
import { AuthService } from 'src/auth/auth.service';
@Module({
  imports: [
    UserModule,
    ChatModule,
    AuthModule,
    TypeOrmModule.forFeature([User, Profile, Relation, Achievement, HistoryEntity, ChatRoom, ChatRoomUser, Message, Chat])
  ],
  providers: [UserStatusGateway, ChatService, UserService, AuthService]
})
export class UserStatusModule {}
