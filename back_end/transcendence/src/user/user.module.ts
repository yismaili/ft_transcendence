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
import { RandomService } from 'src/random/random.service';
import { Chat } from 'src/typeorm/entities/chat.entity';

@Module({
  imports: [
    AuthModule, TypeOrmModule.forFeature([User, Profile, Relation, HistoryEntity, Achievement, Chat])
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, RandomService],
})
export class UserModule {}

