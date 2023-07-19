import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';
import { Roles } from './roles/roles.decorator';
import { RoleGuard } from './role/role.guard';
import { Auth } from 'typeorm';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get()
    async findAll(): Promise<Auth[]> {
        return this.authService.findAll();
    }

    @Post('login')
    async login(@Res() res, @Body() authenticateDto: Record<string, any>){
      try{
        const respone = await this.authService.authenticate(authenticateDto.userName,authenticateDto.password);
        return res.status(HttpStatus.OK).json(respone);
      }  catch (error){
        return res.status(error.status).json(error.respone);
      }
    }

    @Post('signIn')
    async signIn(@Body() newUser): Promise<Auth> {
        return (this.authService.createNewUser(newUser));
    }

    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)//it prevent you from entering to link if not logged
    @Get('profile')
    profile(@Req() req, @Res() res){ // return informatin of user
        return res.status(HttpStatus.OK).json(req.user);
    }
}
