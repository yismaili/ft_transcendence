import { Injectable, NotFoundException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { User } from './entities/user.entity';
import { IAuthenticate, Role } from './interface/role';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordHashingService } from 'src/password-hashing/password-hashing.service';

@Injectable() // decorator marks the AuthService class as an injectable service that maning alows other classes to inject and use this service using dependency injection.
export class AuthService {
  constructor(
    private readonly passwordHashingService: PasswordHashingService,
    @InjectRepository(User) //  decorator The userRepository instance is used to interact with the User entity in the database
    private userRepository: Repository<User>, //class receives an instance of the Repository<User> for the User entity as a parameter
  ) {}
  //fetches all users from the database
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  // authenticating a user
  async authenticate(userName: string, password: string): Promise<IAuthenticate>  {
    const user = await this.userRepository.findOne(
      {
        where:{userName: userName}
      }
    );
    const dehashpassword = await this.passwordHashingService.verifyPassword(user?.password, password);
  if (!dehashpassword) {
      throw new NotFoundException('Invalid credentials');
  }
  // generates a JWT token using jsonwebtoken
  const token = sign({ ...user}, 'secrete');// operator (...) to create a new object containing all the properties of the user object
  // object with the token and the user information
  return ({token, user});
}

async createNewUser(user: Partial<User>): Promise<User> {
  const hashedPassword = await this.passwordHashingService.hashPassword(user.password);

  const newUser = this.userRepository.create({
    userName: user.userName,
    email: user.email,
    password: hashedPassword,
    role: user.role,
    firstName: user.firstName || '', // Set a default empty string if firstName is not provided
    lastName: user.lastName || '',   // Set a default empty string if lastName is not provided
    picture: user.picture || '',     // Set a default empty string if picture is not provided
    accessToken: user.accessToken || '', // Set a default empty string if accessToken is not provided
  });

  return this.userRepository.save(newUser);
}

  
  // async googleAuthenticate(req) {
  //   if (!req.user) {
  //     return 'No user from google'
  //   }
  //   return {
  //     message: 'User information from google',
  //     user: req.user
  //   }
  // }

  async googleAuthenticate(req: any) {
    if (!req.user) {
      return 'No user from google';
    }
  
    // Create a new User entity instance and populate it with the user data from Google OAuth.
    const user = new User();
    user.userName = req.user.userName || ''; // Set a default empty string if userName is not provided
    user.email = req.user.email || '';       // Set a default empty string if email is not provided
    user.password = req.user.password || ''; // Set a default empty string if password is not provided
    user.role = req.user.role;
    user.firstName = req.user.firstName || ''; // Set a default empty string if firstName is not provided
    user.lastName = req.user.lastName || '';   // Set a default empty string if lastName is not provided
    user.picture = req.user.picture || '';     // Set a default empty string if picture is not provided
    user.accessToken = req.user.accessToken || ''; // Set a default empty string if accessToken is not provided
  
    // Save the user data to the database using the User repository.
    const savedUser = this.userRepository.create(user);
    return this.userRepository.save(savedUser);
  }
  
}

// This JWT contains three parts separated by dots:

// Header: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
// Payload: eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJpYXQiOjE2MjkwNTI3NjMsImV4cCI6MTYyOTA1NjM2M30
// Signature: m5GWJk6h5vbz9opE2cZS9u8lQHlM3eUV1R-FYCw0Ugk

// The header contains the token type and the signing algorithm, the payload contains the user data (ID, username, email, etc.),
//  and the signature is used to verify the authenticity of the token.