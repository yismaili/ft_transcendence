import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { GoogleStrategy } from './strategy/google.strategy';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './guard/jwt.guard';
import { IntraStrategy } from './strategy/intra.strategy';

//responsible for defining the components related to authentication and user management
@Module({
  // forFeature() method is used to specify which entities 
  imports: [
    TypeOrmModule.forFeature([User]), 
    PassportModule.register({ defaultStrategy: '42' }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    //NestJS module for handling JSON Web Tokens (JWT) and token-based authentication
    JwtModule.register({ secret: 'secrete', signOptions: { expiresIn: '1h' } }),
  ], // makes the User entity available for use within the AuthModule
  controllers: [AuthController],// The controllers property
  providers: [AuthService, GoogleStrategy, ConfigService, IntraStrategy, JwtAuthGuard]
}) // decorator is define a module 
export class AuthModule {}
