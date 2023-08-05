import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AchievementDto } from 'src/auth/dtos/achievement.dto';
import { HistoryDto } from 'src/auth/dtos/history.dto';
import { ProfileDto } from 'src/auth/dtos/profile.dto';
import { RelationDto } from 'src/auth/dtos/relation.dto';
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
    const newHistory =  this.historyRepository.create({...addhistoryDto});
    return this.historyRepository.save(newHistory);
  }
}

async findAllHistoryOfUser(username: string): Promise<HistoryDto[] | []> {
  const histories = await this.historyRepository.find({
    where: { user: { username } },
    relations: ['userCompetitor'],
    select: ['id', 'date'], 
  });

  if (!histories || histories.length === 0) {
    return [];
  }

  const historyDtos: HistoryDto[] = histories.map((history) => ({
    id: history.id,
    date: history.date,
    user: history.user,
    userCompetitor: history.userCompetitor,
  }));

  return historyDtos;
}

async addAchievementOfUser(userName: string, addAchievementOfUser: AchievementDto) : Promise<AchievementDto | any> {
  const existingUser = await this.findProfileByUsername(userName);
  if (existingUser) {
    const newHistory =  this.achievementRepository.create({...addAchievementOfUser});
    return this.achievementRepository.save(newHistory);
  }
}

async findAllAchievementOfUser(username: string): Promise<AchievementDto[] | []> {
  const achievements = await this.achievementRepository.find({
    where: { user: { username } },
    relations: ['user'],
    select: ['id', 'type', 'description', 'user'], 
  });

  if (!achievements || achievements.length === 0) {
    return [];
  }

  const achievementDtos: AchievementDto[] = achievements.map((achievement) => ({
    id: achievement.id,
    type: achievement.type,
    description: achievement.description,
    user: achievement.user
  }));

  return achievementDtos;
}

async addFriendOfUser(userName: string, addFriend: RelationDto) : Promise<RelationDto| any> {
  const existingUser = await this.findProfileByUsername(userName);
  if (existingUser) {
    const newFriend =  this.relationRepository.create({...addFriend});
    return this.relationRepository.save(newFriend);
  }
}

async findAllFriendsOfUser(username: string): Promise<RelationDto[] | []> {
  const friends = await this.relationRepository.find({
    where: { userOne: { username } },
    relations: ['user'],
    select: ['id', 'status', 'userOne', 'userTwo'], 
  });

  if (!friends || friends.length === 0) {
    return [];
  }

  const relationDtos: RelationDto[] = friends.map((relation) => ({
    status: relation.status,
    userOne: relation.userOne,
    userTwo: relation.userTwo,
  }));

  return relationDtos;
}
}

