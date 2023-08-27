import {Controller,
    Get,
    HttpStatus, 
    Req, 
    Res, 
    UseGuards
   } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response} from 'express';
import { GoogleGuard } from './guard/google.guard';
import { IntraGuard } from './guard/intra.guard';
import { JwtAuthGuard } from './guard/jwt.guard';
import { JwtStrategy } from './strategy/jwt.strategy';
import { User } from 'src/typeorm/entities/User.entity';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {} //we used this constructor for 'Dependency Injection'

  @Get('all') // decorator is define an HTTP GET endpoint
  async findAll(): Promise<User[]> {
    const users = this.authService.findAll()
    return users;
  }

  response: any;

  @Get('home')
  googlelogin(@Res() res: Response,) {

    return res.status(HttpStatus.OK).json(this.response);
  }

  @UseGuards(GoogleGuard) // route handler add an extra layer of security and control access to certain routes
  @Get('google/callback')
  async googleAuthRedirect( @Req() req: any, @Res() res: Response){

    const user: Partial<User> = {
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        picture: req.user.picture,
      };

    this.response = await this.authService.googleAuthenticate(user);
    if (this.response.success){
      return res.redirect('/auth/home'); // Redirect to home page
    }
    return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Authentication failed' });
  
  }

  @UseGuards(IntraGuard)
  @Get('intra/callback')
  async intraAuthRedirect( @Req() req: any, @Res() res: Response,){

    const user: Partial<User> = {
      email: req.user.email,
      // username: req.user.username,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      picture: req.user.picture,
    };

    this.response = await this.authService.googleAuthenticate(user);

    if (this.response.success){
      return res.redirect('/auth/home'); // Redirect to home page
    }
    return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Authentication failed' });
  }

  @UseGuards(JwtAuthGuard, JwtStrategy)
  @Get('profile')
  profile(@Req() req, @Res() res){
      return(res.status(HttpStatus.OK).json(req.user));
  }
}
