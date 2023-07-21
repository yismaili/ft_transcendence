import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PasswordHashingService } from 'src/password-hashing/password-hashing.service';
//responsible for defining the components related to authentication and user management
@Module({
  // forFeature() method is used to specify which entities 
  imports: [TypeOrmModule.forFeature([User])], // makes the User entity available for use within the AuthModule
  controllers: [AuthController],// The controllers property
  providers: [AuthService, PasswordHashingService]
}) // decorator is define a module 
export class AuthModule {}
