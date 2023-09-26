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
import axios from 'axios';
import path from 'path';

import * as fs from 'fs'

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

async findProfileByUsername(userName: string): Promise<any> {
  try {
    const existingUser = await this.userRepository.findOne({
        where: {
          username: userName,
        },
        relations: ['profile']
      });
      if (!existingUser){
        throw new Error("User profile not found!");
      }
      return existingUser;
  } catch (error) {
    throw new Error("Failed to find profile");
  }
}

async uploadImage(imageData: Buffer) {
  try {
    // const apiKey = '3abb50958940a0dfbde0d032e1fb5573'; 
    // const formData = new FormData();
    // formData.append('key', apiKey);
    // formData.append('image', imageData); // This is incorrect
    // console.log(formData);


    const response = await axios.post('https://api.imgbb.com/1/upload?key=3abb50958940a0dfbde0d032e1fb5573', {

      image: imageData.toString('base64'),
    },
   { headers:{
     'Content-Type': 'multipart/form-data',
      
    }});

    console.log(response.data)
    const imageUrl = response.data.data.url;

    return imageUrl;
  } catch (error) {

    console.log('ee ', error)
    throw error.message;
  }
}

async updateProfileByUsername(userName: string, firstName, lastName, fileData): Promise<any> {
  try {
    const existingUser = await this.findProfileByUsername(userName);
    if (!existingUser) {
      throw new Error('User not found');
    }


    const f = fs.readFileSync(fileData.path)
    console.log(f.buffer)

    // return;

    const response = await this.uploadImage(f); 
    const imageUrl = response;

    existingUser.firstName = firstName;
    existingUser.lastName = lastName;
    existingUser.picture = imageUrl;

    const updatedUser = await this.userRepository.save(existingUser);
    const token = sign({ ...updatedUser }, 'secrete');

    return { token, user: updatedUser };
  } catch (error) {
    throw new Error('Failed to update profile: ' + error);
  }
}

async findAllHistoryOfUser(username: string): Promise<HistoryDto[]> {
  try {
    const user = await this.userRepository.findOne({
      where: {username: username}
    });
    
    if (!user){
      throw new Error("User not found");
    }

    const histories = await this.historyRepository.find({
      where:[ {user: {id:user.id}}, {userCompetitor: {id:user.id}}],
      relations: ['user', 'userCompetitor'],
    });

    if (!histories){
      throw new Error("User histories not found");
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
  } catch (error) {
    throw new Error(`Error fetching history`);
  }
}

async searchByUsername(username: string, secondUsername: string){
  try {
    const user = await this.userRepository.findOne({
      where: {username: username}
    });
    
    const secondUser = await this.userRepository.findOne({
      where: {username: secondUsername},
      select: ['id', 'username', 'firstName', 'lastName', 'email'],
      relations: ['profile']
    });

    if (!user || !secondUser){
      throw new Error("User not found");
    }

    const relation = await this.relationRepository.findOne({
        where: [
          { friend: { id: user.id }, user: { id: secondUser.id }, status: 'friends'},
          { friend: { id: secondUser.id }, user: { id: user.id }, status: 'friends'}
        ]
    });

    if (!relation){
      throw new Error("you don't have access to user");
    }
    return secondUser;
  } catch (error) {
    throw new Error(`Error fetching history`);
  }
}

async addAchievementOfUser(userName: string, addAchievementOfUser: AchievementDto) : Promise<any> {

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

  try {
    const user = await this.userRepository.findOne({
      where: {username: username}
    });
    
    if (!user){
      throw new Error("User not found");
    }

    const achievements = await this.achievementRepository.find({
      where: { user: {id: user.id} },
      relations: ['user']
    });

    if (!achievements){
      throw new Error("User histories not found");
    }

    const achievementDtos: AchievementDto[] = achievements.map((achievement) => ({
      id: achievement.id,
      type: achievement.type,
      description: achievement.description,
      user: achievement.user
    }));
    return achievementDtos;

  } catch (error) {
    throw new Error(`Error fetching history`);
  }
}

async sendRequest(userName: string, secondUsername: string): Promise<any> {
  try {

    const existingUser = await this.userRepository.findOne({
      where: {
        username: userName,
      },
    });

    const existingSecondUser = await this.userRepository.findOne({
      where: {
        username: secondUsername,
      },
    });

    if (!existingUser || !existingSecondUser) {
      throw new Error('User not found');
    }

    // Check if a relationship already exists
    const existingRelation = await this.relationRepository.findOne({
      where: [
        { friend: { id: existingUser.id }, user: { id: existingSecondUser.id } },
        { friend: { id: existingSecondUser.id }, user: { id: existingUser.id } }
      ]
    });

    if (existingRelation || userName === secondUsername) {
      throw new Error('Relationship already exists');
    }

    // Create a new relationship record
    const newRelation = this.relationRepository.create({
      status: 'sendRequest',
      FromUser: existingUser.username,
      friend: { id: existingSecondUser.id },
      user: { id: existingUser.id }
    });

    // Save the new relationship to the database
    await this.relationRepository.save(newRelation);

    // Return the updated user profile
    return await this.findProfileByUsername(userName);
  } catch (error) {
    // Handle errors with specific error messages
    if (error.message === 'User not found') {
      throw new Error('One or both users do not exist');
    } else if (error.message === 'Relationship already exists') {
      throw new Error('A relationship between these users already exists');
    } else {
      throw new Error('Failed to add friend');
    }
  }
}

async findAllFriendsOfUser(username: string): Promise<RelationDto[]> {
  try {
    const friends = await this.relationRepository.find({
      where: [
        { user: { username: username }, status: 'friends' },
        { friend: { username: username }, status: 'friends' }
      ],
      relations: ['friend', 'user'], // Load the 'friend' and  'user' entities
    });

    if (!friends || friends.length === 0) {
      return [];
    }

    const relationDtos: RelationDto[] = friends.map((relation) => ({
      id: relation.id,
      status: relation.status,
      friend: relation.friend,
      user: relation.user,
    }));

    return relationDtos;
  } catch (error) {
    throw new Error(`Error fetching friend relationships: ${error.message}`);
  }
}


async findAllBlockedOfUser(username: string): Promise<RelationDto[]> {

  try {
    const userBlocked = await this.relationRepository.find({
      where: [{ user: { username }, status: 'blocked' , FromUser: username}],
      relations: ['friend']
    });

    if (!userBlocked) {
      throw new Error('relations not found');
    }

    const relationDtos: RelationDto[] = userBlocked.map((relation) => ({
      id: relation.id,
      status: relation.status,
      friend: relation.friend,
      user: relation.user,
    }));

    return relationDtos;
  } catch (error) {
    throw new Error(`Error fetching friend relationships`);
  }
}


async getAllRequestsOfUser(username: string): Promise<RelationDto[]> {
  try {
    const friendRequests = await this.relationRepository.find({
      where: [
       { friend: { username }, status: 'sendRequest'}
    ],
      relations: ['user']
    });
    if (!friendRequests) {
      throw new Error('friendRequests not found');
    }

    const relationDtos: RelationDto[] = friendRequests.map((relation) => ({
      id: relation.id,
      status: relation.status,
      friend: relation.friend,
      user: relation.user,
    }));

    return relationDtos;
  } catch (error) {
    throw new Error(`Error fetching friend requests`);
  }
}




async getAllRequistsSendFromUser(username: string): Promise<RelationDto[]> {
  try {
    const friendRequests = await this.relationRepository.find({
      where: [
       { user: { username }, status: 'sendRequest'}
    ],
      relations: ['friend']
    });
    if (!friendRequests) {
      throw new Error('friendRequests not found');
    }

    const relationDtos: RelationDto[] = friendRequests.map((relation) => ({
      id: relation.id,
      status: relation.status,
      friend: relation.friend,
      user: relation.user,
    }));

    return relationDtos;
  } catch (error) {
    throw new Error(`Error fetching friend requests`);
  }
}

async blockUser(username: string, secondUser: string): Promise<any> {
  try {
    const existingRelation = await this.relationRepository.findOne({
      where: [
        { user: { username }, friend: { username: secondUser }, status: Not('blocked')},
        { friend: { username }, user: { username: secondUser }, status: Not('blocked')}
      ]
    });

    if (!existingRelation || username === secondUser) {
      throw new Error("Relation not found");
    }

    existingRelation.status = 'blocked';
    existingRelation.FromUser = username;
    const updatedRelation = await this.relationRepository.save(existingRelation);
  
    return this.findProfileByUsername(secondUser);;
  } catch (error) {
    throw new Error(`Error blocking friend`);
  }
}

async unblockUser(username: string, secondUser: string): Promise<any> {
  try {
    const existingRelation = await this.relationRepository.findOne({
      where: [
        { user: { username }, friend: { username: secondUser }, status: 'blocked' },
        { user: { username: secondUser }, friend: { username }, status: 'blocked' }
      ]
    });

    if (!existingRelation) {
      throw new Error("Blocked relation not found");
    }
    if (existingRelation.FromUser != username) {
      throw new Error("You cannot");
    }
    await this.relationRepository.remove(existingRelation);
    return this.findProfileByUsername(secondUser);
  } catch (error) {
    throw new Error(`Error unblocking friend: ${error.message}`);
  }
}

async acceptRequest(username: string, secondUser: string): Promise<any> {
  try {
    // Find the friend request in either direction
    const existingRelation = await this.relationRepository.findOne({
      where: [
        { user: { username }, friend: { username: secondUser }, status: 'sendRequest' },
        { user: { username: secondUser }, friend: { username }, status: 'sendRequest' }
      ]
    });

    if (!existingRelation) {
      throw new Error("Friend request not found");
    }

    if (existingRelation.FromUser === username) {
      throw new Error("You cannot accept your own friend request");
    }

    existingRelation.status = 'friends';

    await this.relationRepository.save(existingRelation);

    const userProfile = await this.findProfileByUsername(secondUser);
    return userProfile;
  } catch (error) {
    throw new Error(`Error accepting friend request: ${error.message}`);
  }
}

async rejectRequest(username: string, secondUser: string): Promise<any> {
  try {
    const existingRelation = await this.relationRepository.findOne({
      where: [
        { user: { username }, friend: { username: secondUser }, status: 'sendRequest' },
        { user: { username: secondUser }, friend: { username }, status: 'sendRequest' }
      ]
    });

    if (!existingRelation) {
      throw new Error("Friend request not found");
    }

    if (existingRelation.FromUser === username) {
      throw new Error("You cannot reject your own friend request");
    }

    await this.relationRepository.remove(existingRelation);
    const userProfile = await this.findProfileByUsername(secondUser);
    return userProfile;
  } catch (error) {
    throw new Error(`Error rejecting friend request: ${error.message}`);
  }
}

async cancelRequist(username: string,  secondUser: string): Promise<any> {
  try {
    const existingRelation = await this.relationRepository.findOne({
      where: [
        { user: { username }, friend: { username: secondUser }, status: 'sendRequest' },
        { user: { username: secondUser }, friend: { username }, status: 'sendRequest' }
      ]
    });

    if (!existingRelation) {
      throw new Error("Friend request not found");
    }
    if (existingRelation.FromUser != username) {
      throw new Error("You cannot accept your own friend request");
    }

    await this.relationRepository.remove(existingRelation);
    const userProfile = await this.findProfileByUsername(secondUser);
    return userProfile;
  } catch (error) {
    throw new Error(`Error rejecting friend request: ${error.message}`);
  }
}

async cancelRelation(username: string,  secondUser: string): Promise<any> {
  try {
    const existingRelation = await this.relationRepository.findOne({
      where: [
        { user: { username }, friend: { username: secondUser }, status: 'friends' },
        { user: { username: secondUser }, friend: { username }, status: 'friends' }
      ]
    });

    if (!existingRelation) {
      throw new Error("Friend request not found");
    }


    await this.relationRepository.remove(existingRelation);
    const userProfile = await this.findProfileByUsername(secondUser);
    return userProfile;
  } catch (error) {
    throw new Error(`Error rejecting friend request: ${error.message}`);
  }
}

// get friend online
async getStatusOfUsers(username: string) {
  try {
    const friends = await this.relationRepository.find({
      where: [
        { 
          friend: { username: username },
          user: { status: 'online'}
        },
        { 
          user: { username: username },
          friend: { status: 'online'}
        }
      ],
      relations: ['user'],
    });
      // Map the results to create an array of RelationDto objects
    const relationDtos: RelationDto[] = friends.map((relation) => ({
      id: relation.id,
      status: relation.status,
      friend: relation.friend,
      user: relation.user,
    }));

    return relationDtos;
  } catch (error) {
    throw new Error(`Error fetching friends: ${error.message}`);
  }
}

async setTwoFactorAuthenticationSecret(secret: string, username: string) {
  try {
    const user = await this.userRepository.findOne({ where: { username: username } });

    if (user) {
      user.twoFactorAuthSecret = secret;
      await this.userRepository.save(user);
      console.log('Two-factor authentication secret set successfully.');
    } else {
      console.log('User not found.');
    }
  } catch (error) {
    throw new Error('Error setting two-factor authentication secret');
  }
}


async turnOnTwoFactorAuthentication(username: string){
  try {
    const user = await this.userRepository.findOne({ where: { username: username } });
    if (user) {
      user.isTwoFactorAuthEnabled = true;
      await this.userRepository.save(user);
    } else {
      throw new Error('User not found.');
    }
  } catch (error) {
    throw new Error(`Error two factor auth ${error}`);
  }
}

async turnOffTwoFactorAuthentication(username: string){
  try {
    const user = await this.userRepository.findOne({ where: { username: username } });

    if (user) {
      user.isTwoFactorAuthEnabled = false;
      await this.userRepository.save(user);
    } else {
      throw new Error('User not found.');
    }
  } catch (error) {
    throw new Error(`Error two factor auth ${error}`);
  }
}
// handleng connection
async setUserstatus(username:string, status:string) {
  try {
    const user = await this.userRepository.findOne({
      where: {username: username}
    });

    if (!user){
      throw new Error('User not exist');
    }

    user.status = status;
    await this.userRepository.save(user);
  } catch (error) {
    throw new Error('failed');
  }
}
}

