import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ 
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'postgres_db',
    port: 5432,
    username: 'postgres',
    password: 'pass1337',
    database: 'transcendence',
    autoLoadEntities: true,
    synchronize: true,//in tisting in prodection fales
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
