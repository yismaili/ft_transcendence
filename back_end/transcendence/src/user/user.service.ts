import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoryDto } from 'src/auth/dtos/history.dto';
import { ProfileDto } from 'src/auth/dtos/profile.dto';
import { UserDto } from 'src/auth/dtos/user.dto';
import { Achievement } from 'src/typeorm/entities/Achievement.entity';
import { HistoryEntity } from 'src/typeorm/entities/History.entity';
import { Profile } from 'src/typeorm/entities/Profile.entity';
import { Relation } from 'src/typeorm/entities/Relation.entity';
import { User } from 'src/typeorm/entities/User.entity';
import { Repository } from 'typeorm';

// interface HistoryDto {
//   id: number;
//   user: User;
//   userCompetitor: User;
// }
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile)private profileRepository: Repository<Profile>,
        @InjectRepository(Relation)private relationRepository: Repository<Relation>,
        @InjectRepository(HistoryEntity)private historyRepository: Repository<HistoryEntity>,
        @InjectRepository(Achievement)private achievementRepository: Repository<Achievement>,
        ) {}

  async findProfileByUsername(userName: string): Promise<UserDto| any> {
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
          },
        },
      });
    return existingUser;
  } catch (error) {
    return null;
  }
}

async updateProfileByUsername(userName: string, updateUserDetails: ProfileDto): Promise<ProfileDto | any> {
  const existingUser = await this.findProfileByUsername(userName);
  if (existingUser.profile) {
    const primaryKeyValue = existingUser.profile.id; 
    return this.profileRepository.update(primaryKeyValue, { ...updateUserDetails});
  }
}

async addHistoryByUsername(userName: string, addhistoryDto: HistoryDto): Promise<HistoryDto | any>{
  const existingUser = await this.findProfileByUsername(userName);
  if (existingUser) {
    console.log(addhistoryDto);
    // const primaryKeyValue = existingUser.HistoryEntity.id; 
    const newHistory =  this.historyRepository.create({...addhistoryDto});
    return this.historyRepository.save(newHistory);
  }
}

async findAllHistoryOfUser(username: string): Promise<HistoryDto[] | []> {
  const histories = await this.historyRepository.find({
    where: { user: { username } },
    relations: ['userCompetitor'],
    select: ['id'],
  });

  if (!histories || histories.length === 0) {
    return [];
  }

  // Map the histories to the desired DTO format
  const historyDtos: HistoryDto[] = histories.map((history) => ({
    id: history.id,
    userCompetitor: history.userCompetitor,
  }));

  return historyDtos;
}
}

