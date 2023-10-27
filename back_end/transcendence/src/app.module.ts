import { Module } from '@nestjs/common'; // NestJS common utilities and decorators.
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { HistoryEntity } from './typeorm/entities/History.entity';
import { Achievement } from './typeorm/entities/Achievement.entity';
import { Relation } from './typeorm/entities/Relation.entity';
import { Profile } from './typeorm/entities/Profile.entity';
import { User } from './typeorm/entities/User.entity';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { ChatRoom } from './typeorm/entities/chat-room.entity';
import { ChatRoomUser } from './typeorm/entities/chat-room-users.entity';
import { Message } from './typeorm/entities/message-entity';
import { Chat } from './typeorm/entities/chat-entity';
import { GameModule } from './game/game.module';
import { UserStatusModule } from './user-status/user-status.module';


// The @Module() decorator marks the AppModule class as a module in NestJS
// The imports property specifies the modules that this module depends on
// The AppModule serves as the entry point and the root module of your application

@Module({ // decorator It is used to define a module in a NestJS application
  imports: [ //import the TypeOrmModule and configure it for connecting to a PostgreSQL database.
    TypeOrmModule.forRoot({ // NestJS module for integrating with TypeORM, an Object-Relational Mapping (ORM) library
      type: 'postgres',
      host: process.env.HOST,
      port: 5432,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [User, Profile, Relation, Achievement, HistoryEntity, ChatRoom, ChatRoomUser, Message, Chat],
      autoLoadEntities: true, // automatically load entity files
      synchronize: true, // automatically synchronize the database schema with the entities. // Set to false in production
    }), 
    AuthModule, // responsible for handling authentication logic
    PassportModule, 
    UserModule, 
    ChatModule, GameModule, UserStatusModule,
  ],
  controllers: [AppController], // Controllers  handle incoming requests and define the routes and endpoints for the application
  providers: [AppService], // Providers are responsible for providing business logic and functionality to the application.
})
export class AppModule { // class that represents the main module of application
}

