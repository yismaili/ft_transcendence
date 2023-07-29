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
        // return this.userRepository.find({ relations: ['profile', 'relation', 'history', 'achievemen']});
        return this.userRepository.find({ relations: ['profile', 'relation', 'HistoryEntity', 'achievement'], select: {
          relation: {
           relation_id: true,
          user: {
            firstName: true,
            lastName: true,
            email: true
          },
          }
        } });
      }

  async googleAuthenticate(user: Partial<User>): Promise<IAuthenticate> {
    const { email, firstName, lastName } = user;

    const existingUser = await this.userRepository.findOne({
      where: {
        email: user.email,
      },
    });

    if (existingUser) {
        existingUser.email = user.email || existingUser.email;
        existingUser.firstName = user.firstName || existingUser.firstName;
        existingUser.lastName = user.lastName || existingUser.lastName;
        existingUser.picture = user.picture || existingUser.picture;

        await this.userRepository.save(existingUser);

        const token = sign({ ...existingUser }, 'secrete');
        return { token, user: existingUser };

    } else {

      // user entity 
      const newUser = this.userRepository.create({
        email: user.email || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        picture: user.picture || '',
      });
      const savedUser = await this.userRepository.save(newUser);

      // Check if the 'user.Profile' object is defined and contains the required properties
      const profileData = user.profile ?? {
        score: 0,
        win: 0,
        los: 0,
      };

      // Create a new 'ProfileEntity' object using the data from the 'profileData' object
      const newProfile = this.profileRepository.create({
        score: profileData.score,
        los: profileData.los,
        win: profileData.win,
      });
      const savedProfile = await this.profileRepository.save(newProfile);
      
      // Relation entity
      const relationData = user.relation ?? {
        // user_id: 0,
        status: '',
      };

      const new_Relation = this.relationRepository.create({
        // user_id: relationData.user_id,
        status: '',
      });
      const savedRelation = await this.relationRepository.save(new_Relation);

      // achievement entity
      const achievementData = user.achievement ?? {
        type: '',
        description: '',
      };
      const new_Achievement = this.achievementRepository.create({
        // type: achievementData.type,
        // description: achievementData.description,
        type: '',
        description: '',
      });
      const savedAchievement = await this.achievementRepository.save(new_Achievement);
     
      //History Entity
      const historyData = user.HistoryEntity ??{
        competitor: null,
      };

      const new_History = this.historyRepository.create({
        competitor: historyData.competitor,
      });
      const savedHistory = await this.historyRepository.save(new_History);


      savedUser.profile = savedProfile;
      this.userRepository.save(savedUser);
      savedUser.relation = savedRelation;
      this.userRepository.save(savedUser);
      savedUser.achievement = savedAchievement;
      this.userRepository.save(savedUser);
      savedUser.HistoryEntity = savedHistory;
      this.userRepository.save(savedUser);
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

