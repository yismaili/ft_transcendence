import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { IAuthenticate } from './interface/role';

@Injectable() // decorator marks the AuthService class as an injectable service that maning alows other classes to inject and use this service using dependency injection.
export class AuthService {
  constructor(
    @InjectRepository(User) //  decorator The userRepository instance is used to interact with the User entity in the database
    private userRepository: Repository<User>, //class receives an instance of the Repository<User> for the User entity as a parameter
  ) {}

  //fetches all users from the database
  async findAll():  Promise<User[]> {
    return this.userRepository.find();
  }

  async googleAuthenticate(user: Partial<User>): Promise<IAuthenticate> {
    const { email, firstName, lastName } = user; // Destructure the properties from the 'user' object

    // Check if the user already exists based on the email, firstName, and lastName
    const existingUser = await this.userRepository.findOne({
      where: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });

    if (existingUser) {
      // If the user already exists, update the existing user's data instead of creating a new one
      existingUser.email = user.email || existingUser.email;
      existingUser.firstName = user.firstName || existingUser.firstName;
      existingUser.lastName = user.lastName || existingUser.lastName;
      existingUser.picture = user.picture || existingUser.picture;
      existingUser.accessToken = user.accessToken || existingUser.accessToken;

      const savedUser = await this.userRepository.save(existingUser);
      // Generate the JWT token using the 'sign' function and the 'savedUser' object
      const token = sign({ ...savedUser }, 'secrete');
      // Return the token and the 'savedUser' object in the 'IAuthenticate' format
      return { token, user: savedUser };
    } else {
      // If the user does not exist, create a new user
      const newUser = this.userRepository.create({
        email: user.email || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        picture: user.picture || '',
        accessToken: user.accessToken || '',
      });

      const savedUser = await this.userRepository.save(newUser);
      // Generate the JWT token using the 'sign' function and the 'savedUser' object
      const token = sign({ ...savedUser }, 'secrete');
      // Return the token and the 'savedUser' object in the 'IAuthenticate' format
      return { token, user: savedUser };
    }
  }

  async findUserById(user: Partial<User>): Promise<Partial<User>> {
    // Use the userRepository to find the user by ID
    try {
      const existingUser = await this.userRepository.findOne({
        where: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
      return existingUser
    } catch (error) {
      // Handle any errors that may occur during the database query
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

