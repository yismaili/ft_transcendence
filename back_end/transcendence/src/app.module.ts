import { Module } from '@nestjs/common'; // NestJS common utilities and decorators.
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { User } from './auth/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStategy } from './auth/jwt.strategy';

// The @Module() decorator marks the AppModule class as a module in NestJS
// The imports property specifies the modules that this module depends on
// The AppModule serves as the entry point and the root module of your application


@Module({ // decorator It is used to define a module in a NestJS application
  imports: [ //import the TypeOrmModule and configure it for connecting to a PostgreSQL database.
    TypeOrmModule.forRoot({ // NestJS module for integrating with TypeORM, an Object-Relational Mapping (ORM) library
      type: 'postgres',
      host: 'postgres_db',
      port: 5432,
      username: 'postgres',
      password: 'pass1337',
      database: 'transcendence',
      entities: [User],
      autoLoadEntities: true, // automatically load entity files
      synchronize: true, // automatically synchronize the database schema with the entities. // Set to false in production
    }), 
    AuthModule, // responsible for handling authentication logic
    PassportModule,//NestJS module for integrating Passport.js, an authentication middleware for Node.js
    JwtModule.register({secret: 'secrete', signOptions: {expiresIn: '1h'}}),//NestJS module for handling JSON Web Tokens (JWT) and token-based authentication
  ],
  controllers: [AppController], // Controllers  handle incoming requests and define the routes and endpoints for the application
  providers: [AppService, JwtStategy], // Providers are responsible for providing business logic and functionality to the application.
})
export class AppModule { // class that represents the main module of application

}
