import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sign } from 'jsonwebtoken';
import { AchievementDto } from 'src/auth/dtos/achievement.dto';
import { HistoryDto } from 'src/auth/dtos/history.dto';
import { OutcomeDto } from 'src/auth/dtos/outcome.dto';
import { RelationDto } from 'src/auth/dtos/relation.dto';
import { updateProfileDto } from 'src/auth/dtos/updateProfile.dto';
import { Achievement } from 'src/typeorm/entities/Achievement.entity';
import { HistoryEntity } from 'src/typeorm/entities/History.entity';
import { Profile } from 'src/typeorm/entities/Profile.entity';
import { Relation } from 'src/typeorm/entities/Relation.entity';
import { User } from 'src/typeorm/entities/User.entity';
import { ChatRoom } from 'src/typeorm/entities/chat-room.entity';
import {Not, Repository } from 'typeorm';
import { AchievementParams,
   HistoryParams, 
   IAuthenticate, 
   ProfileParams, 
   RelationParams, 
   UserParams } from 'utils/types';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile)private profileRepository: Repository<Profile>,
        @InjectRepository(Relation)private relationRepository: Repository<Relation>,
        @InjectRepository(HistoryEntity)private historyRepository: Repository<HistoryEntity>,
        @InjectRepository(Achievement)private achievementRepository: Repository<Achievement>,
        @InjectRepository(ChatRoom)private chatRepository: Repository<ChatRoom>,
        ) {}

  async findProfileByUsername(userName: string): Promise<UserParams | any> {
  try {
    const existingUser = await this.userRepository.findOne({
        where: {
          username: userName,
        },
        relations: ['profile',
                    'userRelations', 
                    'friendRelations', 
                    'achievements', 
                    'histories', 
                    'chatRoomUsers'
                  ],
      });
      if (existingUser){
        return existingUser;
      }
      else{
        return (null);
      }
  } catch (error) {
    return null;
  }
}

async updateProfileOutcomeByUsername(userName: string, updateUserDetails: OutcomeDto): Promise<ProfileParams> {
  try {
    const existingUser = await this.findProfileByUsername(userName);

    if (!existingUser.profile) {
      throw new Error('User profile not found');
    }

    const profileId = existingUser.profile.id;
    await this.profileRepository.update(profileId,  updateUserDetails);

    const updatedUser = await this.findProfileByUsername(userName);

    return updatedUser;
  } catch (error) {
    throw new Error('Failed to update profile outcome: ' + error.message);
  }
}


async updateProfileByUsername(userName: string, updateUserDetails: updateProfileDto): Promise<IAuthenticate> {
  try {
    const existingUser = await this.findProfileByUsername(userName);
    if (!existingUser) {
      throw new Error('User not found');
    }
    
    existingUser.firstName = updateUserDetails.firstName;
    existingUser.lastName = updateUserDetails.lastName;
    existingUser.picture = updateUserDetails.picture;
    
    const updatedUser = await this.userRepository.save(existingUser);
    const token = sign({ ...updatedUser }, 'secrete'); // Make sure to replace 'secrete' with an actual secret key
    
    return { token, user: updatedUser };
  } catch (error) {
    throw new Error('Failed to update profile: ' + error.message); // Handle and rethrow errors
  }
}


async addHistoryByUsername(userName: string, addhistoryDto: HistoryDto): Promise<HistoryParams> {
  try {
    const existingUser = await this.findProfileByUsername(userName);

    if (!existingUser) {
      throw new Error('User not found');
    }

    const newHistory = this.historyRepository.create({
      ...addhistoryDto,
      user: existingUser, // Assuming HistoryDto has a reference to the user
    });

    await this.historyRepository.save(newHistory); // Use await to make sure the save is complete

    const updatedUser = await this.findProfileByUsername(userName);

    return updatedUser;
  } catch (error) {
    throw new Error('Failed to add history: ' + error.message);
  }
}


async findAllHistoryOfUser(username: string): Promise<HistoryDto[]> {

  const histories = await this.historyRepository.find({
    where: { user: { username } },
    relations: ['userCompetitor'],
    select: ['id', 'date'], 
  });
  if (!histories || histories.length === 0) {
    return (await this.findProfileByUsername(username));
  }

  const historyDtos: HistoryDto[] = histories.map((history) => ({
    id: history.id,
    resulteOfCompetitor: history.resulteOfCompetitor,
    resulteOfUser: history.resulteOfUser,
    date: history.date,
    user: history.user,
    userCompetitor: history.userCompetitor,
  }));

  return historyDtos;
}

async addAchievementOfUser(userName: string, addAchievementOfUser: AchievementDto) : Promise<AchievementParams> {

  try {
    const existingUser = await this.findProfileByUsername(userName);

    if (!existingUser) {
      throw new Error('User not found');
    }

    const newHistory = this.achievementRepository.create({
      ...addAchievementOfUser,
      user: existingUser, 
    });

    await this.achievementRepository.save(newHistory);

    const updatedUser = await this.findProfileByUsername(userName);

    return updatedUser;
  } catch (error) {
    throw new Error('Failed to add history: ' + error.message);
  }
}

async findAllAchievementOfUser(username: string): Promise<AchievementDto[]> {
  const achievements = await this.achievementRepository.find({
    where: { user: { username } },
    relations: ['user'],
    select: ['id', 'type', 'description', 'user'], 
  });

  if (!achievements || achievements.length === 0) {
    return (await this.findProfileByUsername(username));
  }

  const achievementDtos: AchievementDto[] = achievements.map((achievement) => ({
    id: achievement.id,
    type: achievement.type,
    description: achievement.description,
    user: achievement.user
  }));
  return achievementDtos;
}

// async addFriendOfUser(userName: string, addFriend: RelationDto): Promise<RelationParams> {
//      try {
//       const existingUser = await this.userRepository.findOne({
//         where :{
//           username: userName,
//         }
//       });
//       if (!existingUser) {
//         throw new Error('User not found');
//       }
//       Relation rel = {
//         status : "frinds",
//         friend : id,
//         user  : idFriend,
//       }
//       const newHistory = this.relationRepository.create({
//         ...addFriend,
//         user: existingUser,
//       });
  
//       await this.relationRepository.save(newHistory);
  
//       const updatedUser = await this.findProfileByUsername(userName);
  
//       return updatedUser;
//     } catch (error) {
//       throw new Error('Failed to add history: ' + error.message);
//     }
// }


async sendRequist(userName: string, id: number): Promise<RelationParams> {
  try {
    const existingUser = await this.userRepository.findOne({
      where: {
        username: userName,
      },
    });
    
    if (!existingUser) {
      throw new Error('User not found');
    }
    
    const rel = {
      status: "sendRequist",
      friend: { id: id },  // Wrap friend's ID in an object
      user: { id: existingUser.id },  // Wrap user's ID in an object
    };
    
    const newRelation = this.relationRepository.create(rel);  // Use the rel object directly
    
    await this.relationRepository.save(newRelation);
    
    const updatedUser = await this.findProfileByUsername(userName);
    
    return updatedUser;
  } catch (error) {
    throw new Error('Failed to add friend: ' + error.message);
  }
}


async findAllFriendsOfUser(username: string): Promise<RelationDto[]> {

  const friends = await this.relationRepository.find({
    where: [
      { friend: { username }, status: 'friends' },
      { user: { username }, status: 'friends' }
    ],
    relations: ['user'],
  });
  // console.log(friends);

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
    where: [
      // { friend: { username }, status: 'blocked' },
      { user: { username }, status: 'blocked' } // for git only the user blocked
    ],
    relations: ['user'],
  });

  const relationDtos: RelationDto[] = friends.map((relation) => ({
    id: relation.id,
        status: relation.status,
        friend: relation.friend,
        user: relation.user,
      }));
    return relationDtos;
}

async getAllRequistsOfUser(username: string): Promise<RelationDto[]> {

  const friends = await this.relationRepository.find({
    where: { friend: { username }, status: 'sendRequist' },
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



async getAllRequistsSendFromUser(username: string): Promise<RelationDto[]> {

  const friends = await this.relationRepository.find({
    where: { user: { username }, status: 'sendRequist' },
    relations: ['user'],
  });

  const relationDtos: RelationDto[] = friends.map((relation) => ({
    id: relation.id,
        status: relation.status,
        friend: relation.friend,
        user: relation.user,
      }));
    return relationDtos;
}

// The method is not yet finished!!! not working. It's still a student, ahahahah!

async findAllSuggestOfUser(username: string): Promise<RelationDto[]> {
    const user = await this.userRepository.find();
    const potentialFriends = await this.userRepository.find({
      where: {
        username: Not(username),
        friendRelations: Not(username),
      },
    });

    // const potentia = await this.relationRepository.find({
    //   where: {
    //     friend: Not(username),
    //   },
    // });
    // const relationDtos: RelationDto[] = potentialFriends.map((friend) => ({
    //   id: friend.id,
    //   status: 'suggest',
    //   friend: friend,
    //   user: user,
    // }));
console.log(potentialFriends);
    return [];
  }

async blockUserFromFriend(username: string, relationId: number): Promise<RelationParams> {

  const existingRelation = await this.relationRepository.findOne({
    where: { id:relationId },
    relations: ['friend'],
  });

  if (!existingRelation) {
    return (await this.findProfileByUsername(username));
  }

  existingRelation.status = 'blocked';

  try {
    await this.relationRepository.save(existingRelation);
    return (await this.findProfileByUsername(username));
  } catch (error) {
    return (await this.findProfileByUsername(username));
  }
}

async sendRequisteToUser(username: string, relationId: number): Promise<RelationParams> {
  const existingRelation = await this.relationRepository.findOne({
      where: {
        id: relationId,
      },
      relations: ['friend'],
  });
  if (!existingRelation) {
    return (await this.findProfileByUsername(username));
  }
  existingRelation.status = 'sendRequist';

  try{
    await this.relationRepository.save(existingRelation);
    return (await this.findProfileByUsername(username));
  }catch(error){
    return (await this.findProfileByUsername(username));
  }
}

async unblockUser(username: string, relationId: number): Promise<RelationParams> {

  const existingRelation = await this.relationRepository.findOne({
    where: { id: relationId },
    relations: ['friend'],
  });

  if (!existingRelation) {
    return (await this.findProfileByUsername(username));
  }

  try {
    await this.relationRepository.remove(existingRelation);
    return (await this.findProfileByUsername(username));
  } catch (error) {
    return (await this.findProfileByUsername(username));
  }
}

async acceptRequest(username: string, relationId: number): Promise<RelationParams> {

  const existingRelation = await this.relationRepository.findOne({
    // where: { id: relationId },
    where: { friend: { username }, status: 'sendRequist' },
    relations: ['friend'],
  });

  if (!existingRelation) {
    return (await this.findProfileByUsername(username));
  }

  existingRelation.status = 'friends';

  try {
    await this.relationRepository.save(existingRelation);
    return (await this.findProfileByUsername(username));
  } catch (error) {
    return (await this.findProfileByUsername(username));
  }
}

async rejectRequest(username: string, relationId: number): Promise<RelationParams> {

  const existingRelation = await this.relationRepository.findOne({
    // where: { id: relationId },
    where: { friend: { username }, status: 'sendRequist' },
    relations: ['friend'],
  });

  if (!existingRelation) {
    return (await this.findProfileByUsername(username));
  }

  try {
    await this.relationRepository.remove(existingRelation);
    return (await this.findProfileByUsername(username));
  } catch (error) {
    return (await this.findProfileByUsername(username));
  }
}

async cancelRequist(username: string, relationId: number): Promise<RelationParams> {

  const existingRelation = await this.relationRepository.findOne({
    where: { user: { username }, status: 'sendRequist' },
    relations: ['user'],
  });

  if (!existingRelation) {
    return (await this.findProfileByUsername(username));
  }

  try {
    await this.relationRepository.remove(existingRelation);
    return (await this.findProfileByUsername(username));
  } catch (error) {
    return (await this.findProfileByUsername(username));
  }
}

}

