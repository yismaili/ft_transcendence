import { Controller, HttpStatus, Post, Req, Res, UseGuards, Body, HttpCode, Get} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }
    
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: Record<string, any>){
        return (this.userService.login(loginDto.userName, loginDto.password))
    }

    @Post('signIn')
    async signIn(@Body() newUser): Promise<User> {
        return (this.userService.createNewUser(newUser));
    }
}
