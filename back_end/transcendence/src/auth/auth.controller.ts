import {Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Profile } from 'passport-google-oauth20';
import { Response} from 'express';
import { GoogleGuard } from './guard/google.guard';
import { User } from './entities/user.entity';
import { IntraGuard } from './guard/intra.guard';


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
  @Get('google/redirect')
  async googleAuthRedirect( @Req() req: any, @Res() res: Response,){
    const { user, authInfo, }:{
      user: Profile;
      authInfo: {
        accessToken: string;
        refreshToken: string;
        expires_in: number;
      };
    } = req;

    if (!user) {
      res.redirect('/');
      return;
    }
    const respone = await this.authService.googleAuthenticate(user);
    return res.status(HttpStatus.OK).json(respone);
  }

  @UseGuards(IntraGuard) // route handler add an extra layer of security and control access to certain routes
  @Get('intra')
  async intraAuthRedirect( @Req() req: any, @Res() res: Response,){
    const { user, authInfo, }:{
      user: Profile;
      authInfo: {
        accessToken: string;
        refreshToken: string;
        expires_in: number;
      };
    } = req;

    if (!user) {
      res.redirect('/');
      return;
    }
    console.log(user);
    const respone = await this.authService.googleAuthenticate(user);
    return res.status(HttpStatus.OK).json(respone);
  }
}
