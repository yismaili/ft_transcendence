import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() { // asynchronous function, the entry point of the application.
   // Load environment variables from .env file
  dotenv.config();
  const app = await NestFactory.create(AppModule); // class is responsible for creating the application instance.
  // keyword can use await to wait for promises to resolve
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });  
  await app.listen(3001); // the listen method is called on the app instance to start the server and make it listen on port 3000
}
bootstrap();
