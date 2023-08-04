import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleStrategy } from './strategy/google.strategy';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './guard/jwt.guard';
import { IntraStrategy } from './strategy/intra.strategy';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User.entity';
import { Profile } from 'src/typeorm/entities/Profile.entity';
import { Relation } from 'src/typeorm/entities/Relation.entity';
import { Achievement } from 'src/typeorm/entities/Achievement.entity';
import { HistoryEntity } from 'src/typeorm/entities/History.entity';
import { RandomService } from 'src/random/random.service';

//responsible for defining the components related to authentication and user management
@Module({
  // forFeature() method is used to specify which entities 
  imports: [
    TypeOrmModule.forFeature([User, Profile, Relation, Achievement, HistoryEntity]), 
    PassportModule.register({ defaultStrategy: '42' }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    //NestJS module for handling JSON Web Tokens (JWT) and token-based authentication
    JwtModule.register({ secret: 'secrete', signOptions: { expiresIn: '1h' } }),
  ], // makes the User entity available for use within the AuthModule
  controllers: [AuthController],// The controllers property
  providers: [AuthService, GoogleStrategy, ConfigService, IntraStrategy, JwtAuthGuard, Repository, RandomService]
}) // decorator is define a module 
export class AuthModule {}
