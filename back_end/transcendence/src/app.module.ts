import { Module } from '@nestjs/common'; // NestJS common utilities and decorators.
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import {UsreEntity } from './auth/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { ProfileEntity } from './auth/entities/profile.entity';
import { FriendshipEntity } from './auth/entities/friendship.entity';

// The @Module() decorator marks the AppModule class as a module in NestJS
// The imports property specifies the modules that this module depends on
// The AppModule serves as the entry point and the root module of your application

@Module({ // decorator It is used to define a module in a NestJS application
  imports: [ //import the TypeOrmModule and configure it for connecting to a PostgreSQL database.
    TypeOrmModule.forRoot({ // NestJS module for integrating with TypeORM, an Object-Relational Mapping (ORM) library
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'pass1337',
      database: 'transcendence',
      entities: [ProfileEntity, UsreEntity, FriendshipEntity],
      autoLoadEntities: true, // automatically load entity files
      synchronize: true, // automatically synchronize the database schema with the entities. // Set to false in production
    }), 
    AuthModule, // responsible for handling authentication logic
    PassportModule,//NestJS module for integrating Passport.js, an authentication middleware for Node.j
  ],
  controllers: [AppController], // Controllers  handle incoming requests and define the routes and endpoints for the application
  providers: [AppService], // Providers are responsible for providing business logic and functionality to the application.
})
export class AppModule { // class that represents the main module of application

}
