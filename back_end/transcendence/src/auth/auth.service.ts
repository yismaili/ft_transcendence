import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository  } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { User } from 'src/typeorm/entities/User.entity';
import { Profile } from 'src/typeorm/entities/Profile.entity';
import { Relation } from 'src/typeorm/entities/Relation.entity';
import { HistoryEntity } from 'src/typeorm/entities/History.entity';
import { Achievement } from 'src/typeorm/entities/Achievement.entity';
import { UserDto } from './dtos/user.dto';
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
      private userService: UserService
      ) {}

generateRandom(length: number): string {

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

async randomAvatar(): Promise<string> {
  const avatarObject = {
    avatar1: 'https://res.cloudinary.com/doymqpyfk/image/upload/v1697940567/numbuh_glitch_by_pinkandorangesunset_dfjncnp_zrfxfs.png',
    avatar2: 'https://res.cloudinary.com/doymqpyfk/image/upload/v1697940566/numbuh_1197_by_pinkandorangesunset_dfjncfj_udm2py.png',
    avatar3: 'https://res.cloudinary.com/doymqpyfk/image/upload/v1697940564/numbuh_750_by_pinkandorangesunset_dfjncfc_1_altcgc.png',
    avatar4: 'https://res.cloudinary.com/doymqpyfk/image/upload/v1697940562/numbuh_1997_by_pinkandorangesunset_dfjncfq_bydwyk.png',
    avatar5: 'https://res.cloudinary.com/doymqpyfk/image/upload/v1697940562/numbuh_1197_by_pinkandorangesunset_dfjncfj_1_kz2urp.png',
    avatar6: 'https://res.cloudinary.com/doymqpyfk/image/upload/v1697940560/numbuh_95_by_pinkandorangesunset_dfjncnj_k5na6z.png',
    avatar7: 'https://res.cloudinary.com/doymqpyfk/image/upload/v1697940560/numbuh_750_by_pinkandorangesunset_dfjncfc_gaijcu.png',
    avatar8: 'https://res.cloudinary.com/doymqpyfk/image/upload/v1697940559/numbuh_580_by_pinkandorangesunset_dfjncfg_cch46y.png',
    avatar9: 'https://res.cloudinary.com/doymqpyfk/image/upload/v1697940559/numbuh_k2_by_pinkandorangesunset_dfjncnr_zef2ii.png',
    avatar10:'https://res.cloudinary.com/doymqpyfk/image/upload/v1697940558/numbuh_7_by_pinkandorangesunset_dfjncab_qhzkzb.png'
    
  };

  const avatarKeys = Object.keys(avatarObject);
  const randomIndex = Math.floor(Math.random() * avatarKeys.length);
  const randomAvatarUrl = avatarObject[avatarKeys[randomIndex]];
  return randomAvatarUrl;
}


async googleAuthenticate(userDetails: Partial<UserDto>): Promise<any> {

  let { email, firstName, username, lastName, picture} = userDetails;

  const existingUser = await this.userRepository.findOne({
    where: {email: email},
    relations: ['profile']
  });
      
  if (existingUser) {
    if (existingUser.isTwoFactorAuthEnabled === true){
        return {user: existingUser, success: true};
    }
    const token = sign({ ...existingUser }, process.env.JWT_SECRET);
      return { token, user: existingUser, success: true};
    } else {

    let newUsername = this.generateRandom(8);
    const existingUsername = await this.userRepository.findOne({
       where: {
        username: newUsername,
      },
    });
    if (existingUsername){
      const randomString = this.generateRandom(13);
      newUsername = randomString; // Change variable name to 'newUsername'
    }
    picture = await this.randomAvatar();
    username = newUsername;
      // user entity 
    const newUser = this.userRepository.create({
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        picture: picture,
        uniquename: username
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
    const token = sign({ ...savedUser }, process.env.JWT_SECRET);
    return { token, user: savedUser, success: true};
  }
}
      
async findUserById(user: Partial<User>): Promise<Partial<any>> {
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
        const ret =  await authenticator.verify({
          token: twoFactorAuthenticationCode.code,
          secret: user.twoFactorAuthSecret
        });
        return ret;
      } 
      else {
        throw new Error('User not found.');
      }
    } catch (error) {
      console.error("Error occurred:", error); 
      throw new Error(`Error two factor auth`);
    }
  }

  async generateTocken(username: string){
    try {
      const user = await this.userRepository.findOne({ where: { username: username }});
      if (user) {
        const token = sign({ ...user }, process.env.JWT_SECRET);
        return { token, user: user, success: true};
      } 
      else {
        throw new Error('User not found.');
      }
    } catch (error) {
      throw new Error(`Error two factor auth`);
    }
  }

}
