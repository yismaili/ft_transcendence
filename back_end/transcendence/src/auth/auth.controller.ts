import {Body, Controller,
    Get,
    HttpStatus, 
    Post, 
    Req, 
    Res, 
    UnauthorizedException, 
    UseGuards
   } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGoogleGuard } from './guard/google.guard';
import { AuthIntraGuard } from './guard/intra.guard';
import { JwtAuthGuard } from './guard/jwt.guard';
import { User } from 'src/typeorm/entities/User.entity';
import { UserService } from 'src/user/user.service';
import { TwoFactorAuthenticationCodeDto } from './dtos/TwoFactorAuthenticationCode.dto';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Response } from 'express';


@Controller('auth')
export class AuthController {
  @WebSocketServer() server: Server;
    constructor(private readonly authService: AuthService,  private userService: UserService) {} //we used this constructor for 'Dependency Injection'

  response: any;
  @Get('home')
  googlelogin(@Res() res: Response,) {

    return res.status(HttpStatus.OK).json(this.response);
  }

  @UseGuards(AuthGoogleGuard)
  @Get('google/callback')
  async googleAuthRedirect( @Req() req: any, @Res() res: Response){

    const user: Partial<User> = {
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        picture: req.user.picture,
      };

    const response = await this.authService.googleAuthenticate(user);
    if (response.success){
      res.cookie('userData', { response });
      return res.redirect('/auth/home');
    }
    return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Authentication failed' });
  
  }

  @UseGuards(AuthIntraGuard)
  @Get('intra/callback')
  async intraAuthRedirect( @Req() req: any, @Res() res: Response,){

    const user: Partial<User> = {
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      picture: req.user.picture,
    };

    const response = await this.authService.googleAuthenticate(user);
    
    if (response.success){
      res.cookie('userData', {response})
      return res.redirect('/auth/home');
    }
    return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Authentication failed' });
  }

  @Post('2fa/generate')
  @UseGuards(JwtAuthGuard)
  async register(@Req() req: any) {
      const { otpauthUrl } = await this.authService.generateTwoFactorAuthSecret(req.user);
      return this.authService.generateQrCodeDataURL(otpauthUrl);
  }

  @Post('2fa/turn-on')
  @UseGuards(JwtAuthGuard)
  async turnOnTwoFactorAuthentication(@Req() request: any, @Body() twoFactorAuthenticationCode: TwoFactorAuthenticationCodeDto) {
    const isCodeValid = await this.authService.isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode, request.user.username);
    if (isCodeValid === false) {
      throw new UnauthorizedException('Wrong authentication code');
    }
    await this.userService.turnOnTwoFactorAuthentication(request.user.username);
  }

  @Post('2fa/turn-off')
  @UseGuards(JwtAuthGuard)
  async turnOffTwoFactorAuthentication(@Req() request: any, @Body() twoFactorAuthenticationCode: TwoFactorAuthenticationCodeDto) {
    const isCodeValid = await this.authService.isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode, request.user.username);
    if (isCodeValid === false) {
      throw new UnauthorizedException('Wrong authentication code');
    }
    await this.userService.turnOffTwoFactorAuthentication(request.user.username);
  }

  @Post('2fa/authenticate')
  async authenticate(@Body() twoFactorAuthenticationCode: TwoFactorAuthenticationCodeDto) {
    const isCodeValid = await this.authService.isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode, twoFactorAuthenticationCode.username);
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }
    const response = await this.authService.generateTocken(twoFactorAuthenticationCode.username);
    return response;
  }
}
