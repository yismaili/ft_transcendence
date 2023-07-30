import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { IAuthenticate } from './interface/role';
import { User } from 'src/typeorm/entities/User.entity';
import { Profile } from 'src/typeorm/entities/Profile.entity';
import { Relation } from 'src/typeorm/entities/Relation.entity';
import { HistoryEntity } from 'src/typeorm/entities/History.entity';
import { Achievement } from 'src/typeorm/entities/Achievement.entity';

  @Injectable()
  export class AuthService {
    constructor(
      @InjectRepository(User) private userRepository: Repository<User>,
      @InjectRepository(Profile)private profileRepository: Repository<Profile>,
      @InjectRepository(Relation)private relationRepository: Repository<Relation>,
      @InjectRepository(HistoryEntity)private historyRepository: Repository<HistoryEntity>,
      @InjectRepository(Achievement)private achievementRepository: Repository<Achievement>,
      ) {}
      
      async findAll() {
        return this.userRepository.find({
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
              userOne:{

              }
            },
            relationsTwo: {
              id: true,
              status: true,
              userOne: {
                
              }
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
      }

async googleAuthenticate(user: Partial<User>): Promise<IAuthenticate> {
  const { email, firstName, lastName, picture, profile } = user;
      
  const existingUser = await this.userRepository.findOne({
    where: {
      email,
    },
    relations: ['profile', 'relationsOne', 'relationsTwo', 'achievements', 'histories'],
  });
      
  if (existingUser) {
    existingUser.firstName = firstName || existingUser.firstName;
    existingUser.lastName = lastName || existingUser.lastName;
    existingUser.picture = picture || existingUser.picture;
      
    // Update the existing user's profile if profile data is provided
    if (profile) {
        existingUser.profile.score = profile.score || existingUser.profile.score;
        existingUser.profile.win = profile.win || existingUser.profile.win;
        existingUser.profile.los = profile.los || existingUser.profile.los;
    }
      
    await this.userRepository.save(existingUser);
      
    const token = sign({ ...existingUser }, 'secrete');
      return { token, user: existingUser };
    } else {
      // user entity 
      const newUser = this.userRepository.create({
        email,
        firstName,
        lastName,
        picture,
    });
      
  // Create a new 'Profile' entity if profile data is provided
    const newProfile = profile
      ? this.profileRepository.create({
          score: profile.score || 0,
          win: profile.win || 0,
          los: profile.los || 0,
      })
      : null;
      
  // Create a new 'Relation' entity
    const newRelation = this.relationRepository.create({
        status: '',
    });
      
  // Create a new 'Achievement' entity
      const newAchievement = this.achievementRepository.create({
          type: '',
          description: '',
      });
      
  // Create a new 'History' entity
      const newHistory = this.historyRepository.create({
        competitorId: null,
      });
      
  // Assign the related entities to the new user
      if (newProfile) {
        newUser.profile = newProfile;
      }
      newUser.relationsOne = [newRelation];
      newUser.relationsTwo = [];
      newUser.achievements = [newAchievement];
      newUser.histories = [newHistory];
      
      const savedUser = await this.userRepository.save(newUser);
      const token = sign({ ...savedUser }, 'secrete');
    return { token, user: savedUser };
  }
}
      
async findUserById(user: Partial<User>): Promise<Partial<User>> {
  try {
    const existingUser = await this.userRepository.findOne({
      where: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      });
      return existingUser;
    } catch (error) {
      return null;
    }
  }
}


// This JWT contains three parts separated by dots:

// Header: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
// Payload: eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJpYXQiOjE2MjkwNTI3NjMsImV4cCI6MTYyOTA1NjM2M30
// Signature: m5GWJk6h5vbz9opE2cZS9u8lQHlM3eUV1R-FYCw0Ugk

// The header contains the token type and the signing algorithm, the payload contains the user data (ID, username, email, etc.),
//  and the signature is used to verify the authenticity of the token.

