import { Controller, HttpStatus, Post, Req, Res, UseGuards, Body, HttpCode, Get} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Roles } from 'src/auth/roles/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';

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

    @Post()
    async signIn(@Body() newUser): Promise<User> {
        return (this.userService.createNewUser(newUser));
    }
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Get('profile')
    profile(@Req() req, @Res() res){
        return(res.status(HttpStatus.OK).json(req.user));
    }
}
