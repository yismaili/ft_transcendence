import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { IAuthenticate } from './interface/role';
import { UsreEntity } from './entities/user.entity';
import { ProfileEntity } from './entities/profile.entity';
import { FriendshipEntity } from './entities/friendship.entity';

  //fetches all users from the database
  
  @Injectable()
  export class AuthService {
    constructor(
      @InjectRepository(UsreEntity) private userRepository: Repository<UsreEntity>,
      @InjectRepository(ProfileEntity)private profileRepository: Repository<ProfileEntity>,
      @InjectRepository(FriendshipEntity)private friendshipRepository: Repository<FriendshipEntity>,
      ) {}
      
      async findAll() {
        return this.userRepository.find({ relations: ['profile', 'friendships'], select: {
          friendships: {
           friendship_ID: true,
          user: {
            firstName: true,
            lastName: true,
            email: true
          },
          }
        } });
      }

  async googleAuthenticate(user: Partial<UsreEntity>): Promise<IAuthenticate> {
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
      const newUser = this.userRepository.create({
        email: user.email || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        picture: user.picture || '',
        //friendship: user.friendship,
      });

      // Check if the 'user.Profile' object is defined and contains the required properties
      const profileData = user.profile ?? {
        TotalGames: 0,
        Win: 0,
        Los: 0,
        History: '',
        Achievements: '',
        User: null,
      };

      // Create a new 'ProfileEntity' object using the data from the 'profileData' object
      const newProfile = this.profileRepository.create({
        TotalGames: profileData.TotalGames,
        Win: profileData.Win,
        Los: profileData.Los,
        History: profileData.History,
        Achievements: profileData.Achievements,
        // User: profileData.User,
      });
      
      
      const savedUser = await this.userRepository.save(newUser);
      const savedProfile = await this.profileRepository.save(newProfile);
      // Create a new 'FriendshipEntity' object with the user from the profile (if available)
      const new_friendship = this.friendshipRepository.create({
        user: null,
      });

      const savedFriendship = await this.friendshipRepository.save(new_friendship);
      savedUser.profile = savedProfile;
      savedUser.friendships = savedFriendship;
      this.userRepository.save(savedUser);
      const token = sign({ ...savedUser }, 'secrete');
      return { token, user: savedUser };
    }
  }

  async findUserById(user: Partial<UsreEntity>): Promise<Partial<UsreEntity>> {
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

