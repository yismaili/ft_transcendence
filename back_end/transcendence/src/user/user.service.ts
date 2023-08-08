import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sign } from 'jsonwebtoken';
import { AchievementDto } from 'src/auth/dtos/achievement.dto';
import { HistoryDto } from 'src/auth/dtos/history.dto';
import { OutcomeDto } from 'src/auth/dtos/outcome.dto';
import { RelationDto } from 'src/auth/dtos/relation.dto';
import { updateProfileDto } from 'src/auth/dtos/updateProfile.dto';
import { UserDto } from 'src/auth/dtos/user.dto';
import { Achievement } from 'src/typeorm/entities/Achievement.entity';
import { HistoryEntity } from 'src/typeorm/entities/History.entity';
import { Profile } from 'src/typeorm/entities/Profile.entity';
import { Relation } from 'src/typeorm/entities/Relation.entity';
import { User } from 'src/typeorm/entities/User.entity';
import { Repository } from 'typeorm';
import { IAuthenticate } from 'utils/types';


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
        relations: ['profile', 'relationsOne', 'achievements', 'histories'],
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
            friend: {}
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

async updateProfileOutcomeByUsername(userName: string, updateUserDetails: OutcomeDto): Promise<OutcomeDto | any> {
  const existingUser = await this.findProfileByUsername(userName);
  if (existingUser.profile) {
    const primaryKeyValue = existingUser.profile.id; 
    return this.profileRepository.update(primaryKeyValue, { ...updateUserDetails});
  }
}

async updateProfileByUsername(userName: string, updateUserDetails: updateProfileDto): Promise<IAuthenticate> {
  const existingUser = await this.findProfileByUsername(userName);
  if (existingUser.profile) {
    const primaryKeyValue = existingUser.id; 
    this.userRepository.update(primaryKeyValue, { ...updateUserDetails});

    const userUpdate = await this.findProfileByUsername(userName);
    const token = sign({ ...userUpdate }, 'secrete');
    return { token, user: userUpdate };
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

async addFriendOfUser(userName: string, addFriend: RelationDto): Promise<RelationDto | any> {
  try {
    const existingUser = await this.findProfileByUsername(userName);
    if (existingUser) {
      // Check if the user exists in the relation
      // console.log(existingUser);
      // const relation = await this.relationRepository.findOne({
      //   where: {
      //      friend:existingUser.relation,
      //   },
      // });

      // if (relation) {
      //   console.log("User already exists in the relation.");
      //   return relation; // Return the existing relation if found
      // } else {
        // If the relation doesn't exist, proceed to add the new friend
        const newFriend = this.relationRepository.create({ ...addFriend });
        return this.relationRepository.save(newFriend);
      // }
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error adding friend:", error);
    return { error: "An error occurred while adding a friend." };
  }
}

async findAllFriendsOfUser(username: string): Promise<RelationDto[]> {
  const friends = await this.relationRepository.find({
    where: { user: { username }, status: 'friends' },
    relations: ['friend'],
  });

  const relationDtos: RelationDto[] = friends.map((relation) => ({
    id: relation.id,
        status: relation.status,
        friend: relation.friend,
        user: relation.user,
      }));
    return relationDtos;
}

async findAllBlockedOfUser(username: string): Promise<RelationDto[]> {
  const friends = await this.relationRepository.find({
    where: { user: { username }, status: 'blocked' },
    relations: ['friend'],
  });

  const relationDtos: RelationDto[] = friends.map((relation) => ({
    id: relation.id,
        status: relation.status,
        friend: relation.friend,
        user: relation.user,
      }));
    return relationDtos;
}

async findAllSendRequistOfUser(username: string): Promise<RelationDto[]> {
  const friends = await this.relationRepository.find({
    where: { user: { username }, status: 'sendRequist' },
    relations: ['friend'],
  });

  const relationDtos: RelationDto[] = friends.map((relation) => ({
    id: relation.id,
        status: relation.status,
        friend: relation.friend,
        user: relation.user,
      }));
    return relationDtos;
}

// not finished this method !!!!
async findAllSuggestOfUser(username: string): Promise<RelationDto[]> {
  const friends = await this.relationRepository.find({
    where: { user: { username }, status: '' },
    relations: ['friend'],
  });
  const relationDtos: RelationDto[] = friends.map((relation) => ({
        id: relation.id,
        status: relation.status,
        friend: relation.friend,
        user: relation.user,
      }));
    return relationDtos;
}

async blockUserFromFriend(username: string, relationDetails: RelationDto): Promise<RelationDto | any> {
  const existingRelation = await this.relationRepository.findOne({
    where: { id: relationDetails.id },
    relations: ['friend'],
  });

  if (!existingRelation) {
    return [];
  }

  existingRelation.status = 'blocked';

  try {
    await this.relationRepository.save(existingRelation);
    return existingRelation;
  } catch (error) {
    return [];
  }
}

async sendRequisteToUser(username: string, relationDetails: RelationDto): Promise<RelationDto | any> {
  const existingRelation = await this.relationRepository.findOne({
      where: {
        id: relationDetails.id
      },
      relations: ['friend'],
  });
  if (!existingRelation) {
    return [];
  }
  existingRelation.status = 'sendRequist';

  try{
    await this.relationRepository.save(existingRelation);
    return existingRelation;
  }catch(error){
    return [];
  }
}

async unblockUser(username: string, relationDetails: RelationDto): Promise<RelationDto | any> {
  const existingRelation = await this.relationRepository.findOne({
    where: { id: relationDetails.id },
    relations: ['friend'],
  });

  if (!existingRelation) {
    return [];
  }

  existingRelation.status = 'friends';

  try {
    await this.relationRepository.save(existingRelation);
    return existingRelation;
  } catch (error) {
    return [];
  }
}

async acceptRequest(username: string, relationDetails: RelationDto): Promise<RelationDto | any> {
  const existingRelation = await this.relationRepository.findOne({
    where: { id: relationDetails.id },
    relations: ['friend'],
  });

  if (!existingRelation) {
    return [];
  }

  existingRelation.status = 'friends';

  try {
    await this.relationRepository.save(existingRelation);
    return existingRelation;
  } catch (error) {
    return [];
  }
}

async rejectRequest(username: string, relationDetails: RelationDto): Promise<RelationDto | any> {
  const existingRelation = await this.relationRepository.findOne({
    where: { id: relationDetails.id },
    relations: ['friend'],
  });

  if (!existingRelation) {
    return [];
  }

  try {
    await this.relationRepository.remove(existingRelation);
    return existingRelation;
  } catch (error) {
    return [];
  }
}

}

