import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User.entity';
import { Profile } from 'src/typeorm/entities/Profile.entity';
import { Relation } from 'src/typeorm/entities/Relation.entity';
import { HistoryEntity } from 'src/typeorm/entities/History.entity';
import { Achievement } from 'src/typeorm/entities/Achievement.entity';
import { ChatRoom } from 'src/typeorm/entities/chat-room.entity';
import { ChatRoomUser} from 'src/typeorm/entities/chat-room-users.entity';
import { Message } from 'src/typeorm/entities/message-entity';
import { ChatService } from 'src/chat/chat.service';
import { Chat } from 'src/typeorm/entities/chat-entity';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([User, Profile, Relation, Achievement, HistoryEntity, ChatRoom, ChatRoomUser, Message, Chat]),
    MulterModule.register({ storage: memoryStorage() })
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, ChatService],
})
export class UserModule {}

