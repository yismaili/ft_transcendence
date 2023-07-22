import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt.guard';
import { Roles } from './roles/roles.decorator';
import { RoleGuard } from './role/role.guard';
import { Auth } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { Profile } from 'passport-google-oauth20';
import { Response} from 'express';
import { GoogleGuard } from './guard/google.guard';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {} //we used this constructor for 'Dependency Injection'

    @Get('all') // decorator is define an HTTP GET endpoint
    async findAll(): Promise<Auth[]> {
        return this.authService.findAll();
    }

    @Post('login')
    //@Res() res: decorator is nject the response object into the method. It allows you to access the HTTP response and send data back to the client.
    //@Body() authenticateDto: decorator that indicates the authenticateDto object should be extracted from the request body
    //Record<string, any>, which means it is an object with string keys and any value type. It allows the method to handle a dynamic object with various properties, as the type any allows any type of value for the properties.
    async login(@Res() res, @Body() authenticateDto: Record<string, any>){
      try{
        const respone = await this.authService.authenticate(authenticateDto.userName,authenticateDto.password);
        // This sets the HTTP status of the response to 200 (OK)
        // and send JSON data as the response body
        return res.status(HttpStatus.OK).json(respone);
      }  catch (error){
        return res.status(error.status).json(error.respone);
      }
    }

    @Post('signIn')
    async signIn(@Body() newUser): Promise<Auth> {
        return (this.authService.createNewUser(newUser));
    }

    @Roles('admin') // custom decorator to specify the required role for accessing the route or endpoint
    @UseGuards(JwtAuthGuard, RoleGuard) // decorator is apply two guards to the profile method.
    // JwtAuthGuard: is costum guard responsible for authenticating requests using JWT (JSON Web Tokens)
    // RoleGuard  responsible for authorization based on user roles
    @Get('profile')
    profile(@Req() req, @Res() res){ // return informatin of user
        return res.status(HttpStatus.OK).json(req.user);
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
