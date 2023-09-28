import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UsingJoinColumnIsNotAllowedError } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { User } from 'src/typeorm/entities/User.entity';
import { Profile } from 'src/typeorm/entities/Profile.entity';
import { Relation } from 'src/typeorm/entities/Relation.entity';
import { HistoryEntity } from 'src/typeorm/entities/History.entity';
import { Achievement } from 'src/typeorm/entities/Achievement.entity';
import { UserDto } from './dtos/user.dto';
import { RandomService } from 'src/random/random.service';
import { UserParams } from 'utils/types';
import { authenticator } from 'otplib';
import { UserService } from 'src/user/user.service';
import { toDataURL } from 'qrcode';
import { TwoFactorAuthenticationCodeDto } from './dtos/TwoFactorAuthenticationCode.dto';


  @Injectable()
  export class AuthService {
    constructor(
      @InjectRepository(User) private userRepository: Repository<User>,
      @InjectRepository(Profile)private profileRepository: Repository<Profile>,
      @InjectRepository(Relation)private relationRepository: Repository<Relation>,
      @InjectRepository(HistoryEntity)private historyRepository: Repository<HistoryEntity>,
      @InjectRepository(Achievement)private achievementRepository: Repository<Achievement>,
      private generatenUsename:RandomService,
      private userService: UserService
      ) {}
      
async findAll() {
  const users =  this.userRepository.find({
   relations: ['profile', 
    'userRelations', 
    'friendRelations', 
    'achievements', 
    'histories'
  ]
  });
 return users;
}

async googleAuthenticate(userDetails: Partial<UserDto>): Promise<any> {

  let { email, firstName, username, lastName, picture} = userDetails;

  const existingUser = await this.userRepository.findOne({
    where: {
      email,
    },
    relations: ['profile', 'userRelations', 'friendRelations', 'achievements', 'histories'],
  });
      
  if (existingUser) {
    existingUser.firstName = firstName || existingUser.firstName;
    existingUser.lastName = lastName || existingUser.lastName;
    existingUser.username = username || existingUser.username;
    existingUser.picture = picture|| existingUser.picture;
      
    await this.userRepository.save(existingUser);
      
    const token = sign({ ...existingUser }, 'secrete');
      return { token, user: existingUser, success: true};
    } else {

    let newUsername = firstName[0] + lastName;
    const existingUsername = await this.userRepository.findOne({
       where: {
        username: newUsername,
      },
    });
    if (existingUsername){
      const randomString = this.generatenUsename.generateRandomString(2);
      newUsername = randomString + lastName; // Change variable name to 'newUsername'
    }
    username = newUsername;
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
        xp: 0,
        level: 0,
      })
   // Assign the related entities to the new user
      if (newProfile) {
        newUser.profile = newProfile;
      } 
    const savedUser = await this.userRepository.save(newUser);
    const token = sign({ ...savedUser }, 'secrete');
    return { token, user: savedUser, success: true};
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

  async generateTwoFactorAuthSecret(user: User){
    const secret = authenticator.generateSecret();
    const otpauthUrl = authenticator.keyuri(user.email, 'transcendence', secret);
    await this.userService.setTwoFactorAuthenticationSecret(secret, user.username);
    return({secret, otpauthUrl});
  }

  async generateQrCodeDataURL(otpAuthUrl: string) {
    return toDataURL(otpAuthUrl);
  }

  async isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode: TwoFactorAuthenticationCodeDto, username: string) : Promise<any>{
    try {
      const user = await this.userRepository.findOne({ where: { username: username }});
      if (user) {
        return await authenticator.verify({
          token: twoFactorAuthenticationCode.code,
          secret: user.twoFactorAuthSecret
        });
      } 
      else {
        throw new Error('User not found.');
      }
    } catch (error) {
      console.error("Error occurred:", error); 
      throw new Error(`Error two factor auth`);
    }
  }

}


