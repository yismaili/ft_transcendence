import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthenticateDto } from './dto/authenticate.dto';
import { IAuthenticate, Role } from './interface/role';
import { sign } from 'jsonwebtoken';
import {faker} from '@faker-js/faker';

@Injectable()
export class AuthService {
    users = [
        {
         id: faker.datatype.uuid(),
         userName:"yimaili",
         password:'pass1337',
         role:Role.Admin,
        },
        {
         id: faker.datatype.uuid(),
         userName:"A",
         password:'passA',
         role:Role.User,
        }
     ]
 
 
 
     authenticate(authenticateDto: AuthenticateDto): IAuthenticate {
         const user = this.users.find(
           (u) =>
             u.userName === authenticateDto.userName &&
             u.password === authenticateDto.password,
         );
     
         if (!user) throw new NotFoundException('Invalid credentials');
     
         const token = sign({ ...user }, 'secrete');
         return { token, user };
       }
}
