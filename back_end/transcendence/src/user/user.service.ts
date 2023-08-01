import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/auth/dtos/user.dto';
import { Achievement } from 'src/typeorm/entities/Achievement.entity';
import { HistoryEntity } from 'src/typeorm/entities/History.entity';
import { Profile } from 'src/typeorm/entities/Profile.entity';
import { Relation } from 'src/typeorm/entities/Relation.entity';
import { User } from 'src/typeorm/entities/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile)private profileRepository: Repository<Profile>,
        @InjectRepository(Relation)private relationRepository: Repository<Relation>,
        @InjectRepository(HistoryEntity)private historyRepository: Repository<HistoryEntity>,
        @InjectRepository(Achievement)private achievementRepository: Repository<Achievement>,
        ) {}

  async findUserByUsername(userName: string): Promise<User | null> {
  try {
    const existingUser = await this.userRepository.findOne({
        where: {
          username: userName,
        },
        relations: ['profile', 'relationsOne', 'relationsTwo', 'achievements', 'histories'],
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          profile: {
            id: true,
            score: true,
            win: true,
            los: true,
          },
          relationsOne: {
            id: true,
            status: true,
            userOne: {}
          },
          relationsTwo: {
            id: true,
            status: true,
            userTwo: {}
          },
          achievements: {
            id: true,
            type: true,
            description: true,
          },
          histories: {
            id: true,
            competitorId: true,
          },
        },
      });
    return existingUser;
  } catch (error) {
    return null;
  }
}

}

