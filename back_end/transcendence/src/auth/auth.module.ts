import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { GoogleStrategy } from './strategy/google.strategy';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { FortyTwoStrategy } from './strategy/intra.strategy';

//responsible for defining the components related to authentication and user management
@Module({
  // forFeature() method is used to specify which entities 
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({}), PassportModule.register({ defaultStrategy: '42' }),], // makes the User entity available for use within the AuthModule
  controllers: [AuthController],// The controllers property
  providers: [AuthService, GoogleStrategy, ConfigService, FortyTwoStrategy]
}) // decorator is define a module 
export class AuthModule {}
