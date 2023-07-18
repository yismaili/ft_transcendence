import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
      ) {}

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async login(userName: string, password: string): Promise<any>{

        const user = await this.userRepository.findOne(
            {
                where:{"userName": userName}
            }
        );
        if (user?.password !== password) {
            throw new NotFoundException('Invalid credentials');
        }
        const token = sign({ ...user}, 'secrete');
        return ({token, user});
    }
    
    async createNewUser(user: Partial<User>): Promise<User> {

        const newUser = this.userRepository.create(user);
        return (this.userRepository.save(newUser));
    }
}
