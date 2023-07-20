import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()// decorator to define controller class 
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // route decorator define HTTP GET, create a route that listens for incoming HTTP GET 
  getHello(): string {
    return this.appService.getHello();
  }
}
