import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() { //the entry point of the app.
   // Load env variables from .env file
  dotenv.config();
  const app = await NestFactory.create(AppModule); //creating app instance.

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });  
  await app.listen(3001); //listen on port 3000
}
bootstrap();
