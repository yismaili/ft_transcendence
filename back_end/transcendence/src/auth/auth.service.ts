import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { User } from 'src/typeorm/entities/User.entity';
import { Profile } from 'src/typeorm/entities/Profile.entity';
import { Relation } from 'src/typeorm/entities/Relation.entity';
import { HistoryEntity } from 'src/typeorm/entities/History.entity';
import { Achievement } from 'src/typeorm/entities/Achievement.entity';
import { UserDto } from './dtos/user.dto';
import { IAuthenticate, UserParams } from 'utils/types';
import { RandomService } from 'src/random/random.service';

  @Injectable()
  export class AuthService {
    constructor(
      @InjectRepository(User) private userRepository: Repository<User>,
      @InjectRepository(Profile)private profileRepository: Repository<Profile>,
      @InjectRepository(Relation)private relationRepository: Repository<Relation>,
      @InjectRepository(HistoryEntity)private historyRepository: Repository<HistoryEntity>,
      @InjectRepository(Achievement)private achievementRepository: Repository<Achievement>,
      private generatenUsename:RandomService,
      ) {}
      
      async findAll() {
       const users =  this.userRepository.find({
          relations: ['profile', 'relationsOne', 'relationsTwo', 'achievements', 'histories']
        });
        return users;
      }

async googleAuthenticate(userDetails: Partial<UserDto>): Promise<IAuthenticate> {
  let { email, firstName, username, lastName, picture } = userDetails;

  const existingUser = await this.userRepository.findOne({
    where: {
      email,
    },
    relations: ['profile', 'relationsOne', 'relationsTwo', 'achievements', 'histories'],
  });
      
  if (existingUser) {
    existingUser.firstName = firstName || existingUser.firstName;
    existingUser.lastName = lastName || existingUser.lastName;
    existingUser.username = username || existingUser.username;
    existingUser.picture = picture|| existingUser.picture;
      
    await this.userRepository.save(existingUser);
      
    const token = sign({ ...existingUser }, 'secrete');
      return { token, user: existingUser };
    } else {

    if (username === undefined) {
      let newUsername = firstName[0] + lastName;
      const existingUsername = await this.userRepository.findOne({
        where: {
          username: newUsername,
        },
      });
      
      if (existingUsername) {
        const randomString = this.generatenUsename.generateRandomString(3);
        newUsername = lastName + randomString; // Change variable name to 'newUsername'
      }
      username = newUsername;
      // console.log(newUsername);
    }
      // user entity 
    const newUser = this.userRepository.create({
        firstName,
        lastName,
        username,
        email,
        picture,
    });
      
  // Create a new 'Profile' entity if profile data is provided
    const newProfile = this.profileRepository.create({
        score: 0,
        win: 0,
        los:  0,
      })
      
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
        userCompetitor: null,
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
    generateRandomString(arg0: number) {
      throw new Error('Method not implemented.');
    }

async updateProfile(userDetails: UserDto){
  
}
      
async findUserById(user: Partial<User>): Promise<Partial<UserParams>> {
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

