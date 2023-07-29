import {Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response} from 'express';
import { GoogleGuard } from './guard/google.guard';
import { IntraGuard } from './guard/intra.guard';
import { JwtAuthGuard } from './guard/jwt.guard';
import { JwtStrategy } from './strategy/jwt.strategy';
import { Profile } from 'passport-google-oauth20';
import { User } from 'src/typeorm/entities/User.entity';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {} //we used this constructor for 'Dependency Injection'

  @Get('all') // decorator is define an HTTP GET endpoint
    async findAll(): Promise<User[]> {
        return this.authService.findAll();
  }

  @UseGuards(GoogleGuard)
  @Get('login')
  googlelogin(): void {
      return;
  }

  @UseGuards(GoogleGuard) // route handler add an extra layer of security and control access to certain routes
  @Get('google/callback')
  async googleAuthRedirect( @Req() req: any, @Res() res: Response,){
    const user: Partial<User> = {
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      picture: req.user.picture,
    };
    // console.log(user);
    const respone = await this.authService.googleAuthenticate(user);
    return res.status(HttpStatus.OK).json(respone);
  }

  @UseGuards(IntraGuard)
  @Get('intra/callback')
  async intraAuthRedirect( @Req() req: any, @Res() res: Response,){
    const user: Partial<User> = {
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      picture: req.user.picture,
    };
    const respone = await this.authService.googleAuthenticate(user);
    return res.status(HttpStatus.OK).json(respone);
  }
    
  @UseGuards(JwtAuthGuard, JwtStrategy)
  @Get('profile')
  profile(@Req() req, @Res() res){
      return(res.status(HttpStatus.OK).json(req.user));
  }
}
