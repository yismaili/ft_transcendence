import {Body, Controller, ForbiddenException, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/auth/dtos/user.dto';
import { ProfileDto } from 'src/auth/dtos/profile.dto';
import { AchievementDto } from 'src/auth/dtos/achievement.dto';
import { HistoryDto } from 'src/auth/dtos/history.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { RelationDto } from 'src/auth/dtos/relation.dto';

@Controller('users')
export class UserController {
    constructor(private userService: UserService){}
    
    @Get(':username')
    async getDetailsUser(@Param('username') username: string){
       return this.userService.findProfileByUsername(username);
    }

    @UseGuards(JwtAuthGuard, JwtStrategy)
    @Get('profile/:username')
    async getDetailsProfile(@Req() req, @Param('username') username: string): Promise<UserDto| string> {
        const authorization = req.user;
        if (authorization.username == username){
            return this.userService.findProfileByUsername(username);
        }
        else{
            throw new ForbiddenException();

        }
    }

    @UseGuards(JwtAuthGuard, JwtStrategy)
    @Put('profile/:username/updateProfile')
    async updateProfileDetails(@Req() req, @Param('username') username: string, @Body() updateProfileDto:ProfileDto){
        const authorization = req.user;
        if (authorization.username == username){
            return this.userService.updateProfileByUsername(username, updateProfileDto); 
        }
        else{
            throw new ForbiddenException();

        }
    }

    @UseGuards(JwtAuthGuard, JwtStrategy)
    @Post('profile/:username/history')
    async addHistory(@Req() req, @Param('username') username: string, @Body() historyDto:HistoryDto){
        const authorization = req.user;
        if (authorization.username == username){
            return this.userService.addHistoryByUsername(username, historyDto); 
        }
        else{
            throw new ForbiddenException();

        }
    }

    @UseGuards(JwtAuthGuard, JwtStrategy)
    @Get('profile/:username/history')
    async getFriendsOfUser(@Req() req, @Param('username') username: string){
        const authorization = req.user;
        if (authorization.username == username){
            return this.userService.findAllHistoryOfUser(username); 
        }
        else{
            throw new ForbiddenException();

        }
    }
    
    @UseGuards(JwtAuthGuard, JwtStrategy)
    @Post('profile/:username/achievements')
    async addAchievementOfUser(@Req() req, @Param('username') username: string, @Body() achievementDto:AchievementDto){
        const authorization = req.user;
        if(authorization.username == username){
            return this.userService.addAchievementOfUser(username, achievementDto);
        }
        else{
            throw new ForbiddenException();
        }
    }

    @UseGuards(JwtAuthGuard, JwtStrategy)
    @Get('profile/:username/achievements')
    async getachievementOfUser(@Req() req, @Param('username') username: string){
        const authorization = req.user;
        if (authorization.username == username){
            return this.userService.findAllAchievementOfUser(username); 
        }
        else{
            throw new ForbiddenException();

        }
    }

    @UseGuards(JwtAuthGuard, JwtStrategy)
    @Post('profile/:username/friends')
    async addFriendOfUser(@Req() req, @Param('username') username: string, @Body() relationDto:RelationDto){
        const authorization = req.user;
        if(authorization.username == username){
            return this.userService.addFriendOfUser(username, relationDto);
        }
        else{
            throw new ForbiddenException();
        }
    }

    @UseGuards(JwtAuthGuard, JwtStrategy)
    @Get('profile/:username/friends')
    async getFriendOfUser(@Req() req, @Param('username') username: string){
        const authorization = req.user;
        if (authorization.username == username){
            return this.userService.findAllFriendsOfUser(username); 
        }
        else{
            throw new ForbiddenException();

        }
    }

    @UseGuards(JwtAuthGuard, JwtStrategy)
    @Get('profile/:username/blocked')
    async getBlockedOfUser(@Req() req, @Param('username') username: string){
        const authorization = req.user;
        if (authorization.username == username){
            return this.userService.findAllBlockedOfUser(username); 
        }
        else{
            throw new ForbiddenException();

        }
    }

    @UseGuards(JwtAuthGuard, JwtStrategy)
    @Get('profile/:username/requists')
    async getSuggestOfUser(@Req() req, @Param('username') username: string){
        const authorization = req.user;
        if (authorization.username == username){
            return this.userService.findAllSendRequistOfUser(username); 
        }
        else{
            throw new ForbiddenException();

        }
    }
}
