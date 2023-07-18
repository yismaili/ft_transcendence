import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateDto } from './dto/authenticate.dto';
import { JwtAuthGuard } from './jwt.guard';
import { Roles } from './roles/roles.decorator';
import { RoleGuard } from './role/role.guard';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // @Post()
    // login(@Res() res, @Body() authenticateDto: AuthenticateDto){
    //   try{
    //     const respone = this.authService.authenticate(authenticateDto);
    //     return res.status(HttpStatus.OK).json({respone});
    //   }  catch (error){
    //     return res.status(error.status).json(error.respone);
    //   }
    // }

    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)//it prevent you from entering to link if not logged
    @Get()
    profile(@Req() req, @Res() res){ // return informatin of user
        return res.status(HttpStatus.OK).json(req.user);
    }
}
