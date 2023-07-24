import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  async googleAuthenticate(user: Partial<User>): Promise<User> {

    const newUser = this.userRepository.create({
      email: user.email || '',
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      picture: user.picture || '',
      accessToken: user.accessToken || '',
    });

    try {
      const savedUser = await this.userRepository.save(newUser);
      return savedUser;
    } catch (error) {
      // Handle any errors that might occur during saving to the database.
      console.error('Error saving user to the database:', error.message);
      throw error;
    }
}
}
// This JWT contains three parts separated by dots:

// Header: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
// Payload: eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJpYXQiOjE2MjkwNTI3NjMsImV4cCI6MTYyOTA1NjM2M30
// Signature: m5GWJk6h5vbz9opE2cZS9u8lQHlM3eUV1R-FYCw0Ugk

// The header contains the token type and the signing algorithm, the payload contains the user data (ID, username, email, etc.),
//  and the signature is used to verify the authenticity of the token.