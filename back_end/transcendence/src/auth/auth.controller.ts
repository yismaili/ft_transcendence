import {Body, Controller,
    Get,
    HttpCode,
    HttpStatus, 
    Post, 
    Req, 
    Res, 
    UnauthorizedException, 
    UseGuards
   } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response} from 'express';
import { GoogleGuard } from './guard/google.guard';
import { IntraGuard } from './guard/intra.guard';
import { JwtAuthGuard } from './guard/jwt.guard';
import { JwtStrategy } from './strategy/jwt.strategy';
import { User } from 'src/typeorm/entities/User.entity';
import { UserService } from 'src/user/user.service';
import { TwoFactorAuthenticationCodeDto } from './dtos/TwoFactorAuthenticationCode.dto';
import { WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatService } from 'src/chat/chat.service';

@Controller('auth')
export class AuthController {
  @WebSocketServer() server: Server;
    constructor(private readonly authService: AuthService,  private userService: UserService, private chatService: ChatService) {} //we used this constructor for 'Dependency Injection'

    handleConnection(socket: Socket): void {
        this.chatService.handleConnection(socket);
    }
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

    const response = await this.authService.googleAuthenticate(user);
    if (response.success){
      res.cookie('userData', { response });
      return res.redirect('/auth/home');
    }
    return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Authentication failed' });
  
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

    const response = await this.authService.googleAuthenticate(user);
    
    if (response.success){
      res.cookie('userData', {response})
      return res.redirect('/auth/home');
    }
    return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Authentication failed' });
  }

  @UseGuards(JwtAuthGuard, JwtStrategy)
  @Get('profile')
  profile(@Req() req, @Res() res){
      return(res.status(HttpStatus.OK).json(req.user));
  }
 
  @Post('2fa/generate')
  @UseGuards(JwtAuthGuard, JwtStrategy)
  async register(@Req() @Req() req: any) {
      const { otpauthUrl } = await this.authService.generateTwoFactorAuthSecret(req.user.username);
      return this.authService.generateQrCodeDataURL(otpauthUrl);
  }

  @Post('2fa/turn-on')
  @UseGuards(JwtAuthGuard)
  async turnOnTwoFactorAuthentication(@Req() request: any, @Body() twoFactorAuthenticationCode: TwoFactorAuthenticationCodeDto) {
    const isCodeValid = this.authService.isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode, request.user.username);
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }
    await this.userService.turnOnTwoFactorAuthentication(request.user.username);
  }

  @Post('2fa/turn-off')
  @UseGuards(JwtAuthGuard)
  async turnOffTwoFactorAuthentication(@Req() request: any, @Body() twoFactorAuthenticationCode: TwoFactorAuthenticationCodeDto) {
    await this.userService.turnOffTwoFactorAuthentication(request.user.username);
  }

  @Post('2fa/authenticate')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async authenticate( @Req() request: any, @Body() twoFactorAuthenticationCode: TwoFactorAuthenticationCodeDto, @Res() res: Response) {
    const isCodeValid = await this.authService.isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode, request.user.username);
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }
    const user: Partial<User> = {
      email: request.user.email,
      firstName: request.user.firstName,
      lastName: request.user.lastName,
      picture: request.user.picture
    };

  const response = await this.authService.googleAuthenticate(user);
  if (response.success){
    res.cookie('userData', { response });
    return res.redirect('/auth/home');
  }
    return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Authentication failed' });
  }
}
