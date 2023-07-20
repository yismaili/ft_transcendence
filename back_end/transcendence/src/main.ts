import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() { // asynchronous function, the entry point of the application.
  const app = await NestFactory.create(AppModule); // class is responsible for creating the application instance.
  // keyword can use await to wait for promises to resolve
  await app.listen(3000); // the listen method is called on the app instance to start the server and make it listen on port 3000
}
bootstrap();
