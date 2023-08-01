import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User.entity';
import { Profile } from 'src/typeorm/entities/Profile.entity';
import { Relation } from 'src/typeorm/entities/Relation.entity';
import { Achievement } from 'src/typeorm/entities/Achievement.entity';
import { HistoryEntity } from 'src/typeorm/entities/History.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile, Relation, Achievement, HistoryEntity]),
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
