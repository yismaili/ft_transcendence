import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Profile } from 'passport-google-oauth20';
import { Response} from 'express';
import { GoogleGuard } from './guard/google.guard';
import { User } from './entities/user.entity';


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

  @UseGuards(GoogleGuard)
  @Get('google/redirect')
  async googleAuthRedirect( @Req() req: any, @Res() res: Response,): Promise<Response> {
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

    req.user = undefined;
    const jwt = this.authService.googleAuthenticate(user);
    res.set('authorization', `Bearer ${jwt}`);
    return res.status(201).json({ authInfo, user });
  }

}
