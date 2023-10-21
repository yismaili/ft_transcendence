import { Injectable } from '@nestjs/common';

@Injectable()// is a decorator an be automatically instantiated and injected as a dependency into other classes (such as controllers, other services, or modules) that declare a dependency on it
export class AppService { //define a class that can be exported from a TypeScript module and used in other modules
  getHello(): any {
    return 'Hello welcome to ping pong game!';
  }
}
