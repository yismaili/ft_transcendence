import { Body, Controller, Param, ParseIntPipe, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/auth/dtos/user.dto';
import { ProfileDto } from 'src/auth/dtos/profile.dto';
import { AchievementDto } from 'src/auth/dtos/achievement.dto';
import { HistoryDto } from 'src/auth/dtos/history.dto';
import { RelationDto } from 'src/auth/dtos/relation.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}
    
    @Put('update/user/:id')
    async updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UserDto,){
        this.userService.updateUser(id, updateUserDto);
    }

    @Put('update/profile/:id')
    async updateProfile(@Param('id', ParseIntPipe) id: number, @Body() updateProfilerDto: ProfileDto,){
        this.userService.updateProfile(id, updateProfilerDto);
    }

    @Put('update/Achievement/:id')
    async updateAchievement(@Param('id', ParseIntPipe) id: number, @Body() updateAchievementDto: AchievementDto,){
        this.userService.updateProfile(id, updateAchievementDto);
    }

    @Put('update/history/:id')
    async updateHistory(@Param('id', ParseIntPipe) id: number, @Body() updateHistoryDto: HistoryDto,){
        this.userService.updateProfile(id, updateHistoryDto);
    }

    @Put('update/relation/:id')
    async updateRelation(@Param('id', ParseIntPipe) id: number, @Body() updateRolationDto: RelationDto,){
        this.userService.updateProfile(id, updateRolationDto);
    }
    
}
