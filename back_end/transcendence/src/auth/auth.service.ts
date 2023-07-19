import { Injectable, NotFoundException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { User } from './entities/user.entity';
import { IAuthenticate, Role } from './interface/role';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

    async authenticate(userName: string, password: string): Promise<IAuthenticate>  {
      const user = await this.userRepository.findOne(
        {
            where:{userName: userName}
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
