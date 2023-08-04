import {Body, Controller, ForbiddenException, Get, Param, Put, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/auth/dtos/user.dto';
import { ProfileDto } from 'src/auth/dtos/profile.dto';
import { AchievementDto } from 'src/auth/dtos/achievement.dto';
import { HistoryDto } from 'src/auth/dtos/history.dto';
import { RelationDto } from 'src/auth/dtos/relation.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';

@Controller('users')
export class UserController {
    constructor(private userService: UserService){}
    
    @Get(':username')
    async getDetailsUser(@Param('username') username: string){
       return this.userService.findUserByUsername(username);
    }

    @UseGuards(JwtAuthGuard, JwtStrategy)
    @Get('profile/:username')
    async getDetailsProfile(@Req() req, @Param('username') username: string): Promise<UserDto| string> {
        const authorization = req.user;
        if (authorization.username == username){
            return this.userService.findUserByUsername(username);
        }
        else{
            throw new ForbiddenException();

        }
    }
    
    @UseGuards(JwtAuthGuard, JwtStrategy)
    @Put('profile/:username/update')
    async updateUser(@Req() req, @Param('username') username: string, @Body() updateUserDto:ProfileDto){
        const authorization = req.user;
        if (authorization.username == username){
            return this.userService.updateByUsername(username, updateUserDto); 
        }
        else{
            throw new ForbiddenException();

        }
    }

    // @Put('update/profile/:id')
    // async updateProfile(@Param('id', ParseIntPipe) id: number, @Body() updateProfilerDto: ProfileDto,){
    //     this.userService.updateProfile(id, updateProfilerDto);
    // }

    // @Put('update/Achievement/:id')
    // async updateAchievement(@Param('id', ParseIntPipe) id: number, @Body() updateAchievementDto: AchievementDto,){
    //     this.userService.updateAchievement(id, updateAchievementDto);
    // }

    // @Put('update/history/:id')
    // async updateHistory(@Param('id', ParseIntPipe) id: number, @Body() updateHistoryDto: HistoryDto,){
    //     this.userService.updateHistory(id, updateHistoryDto);
    // }

    // @Put('update/relation/:id')
    // async updateRelation(@Param('id', ParseIntPipe) id: number, @Body() updateRolationDto: RelationDto,){
    //     this.userService.updateRelation(id, updateRolationDto);
    // }
    
}
