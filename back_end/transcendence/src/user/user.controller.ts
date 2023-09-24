import {Body, Controller, Delete, ForbiddenException, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AchievementDto } from 'src/auth/dtos/achievement.dto';
import { HistoryDto } from 'src/auth/dtos/history.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { RelationDto } from 'src/auth/dtos/relation.dto';
import { updateProfileDto } from 'src/auth/dtos/updateProfile.dto';
import { IAuthenticate } from './utils/types';

@Controller('users')
export class UserController {
    constructor(private userService: UserService)
    {}

    @UseGuards(JwtAuthGuard, JwtStrategy)
    @Get('profile/:username')
    async getDetailsProfile(@Req() req, @Param('username') username: string): Promise<any> {
        const authorization = req.user;
        if (authorization.username == username){
            return this.userService.findProfileByUsername(username);
        }
         else{
            throw new ForbiddenException();
        }
    }

    // @UseGuards(JwtAuthGuard, JwtStrategy)
    // @Put('profile/:username/updateOutcome')
    // async updateProfileOutcome(@Req() req, @Param('username') username: string, @Body() updateProfileDto:OutcomeDto) : Promise<ProfileParams>{
    //     const authorization = req.user;
    //     if (authorization.username == username){
    //         return this.userService.updateProfileOutcomeByUsername(username, updateProfileDto); 
    //     }
    //     else{
    //         throw new ForbiddenException();
    //     }
    // }

    @UseGuards(JwtAuthGuard, JwtStrategy)
    @Put('profile/:username/updateProfile')
    async updateProfileDetails(@Req() req, @Param('username') username: string, @Body() updateProfileDto: updateProfileDto) : Promise<IAuthenticate>{
        const authorization = req.user;
        if (authorization.username == username){
            return this.userService.updateProfileByUsername(username, updateProfileDto); 
        }
        else{
            throw new ForbiddenException();
        }
    }

    // @UseGuards(JwtAuthGuard, JwtStrategy)
    // @Post('profile/:username/history')
    // async addHistory(@Req() req, @Param('username') username: string, @Body() historyDto:HistoryDto): Promise<HistoryParams>{
    //     const authorization = req.user;
    //     if (authorization.username == username){
    //         return this.userService.addHistoryByUsername(username, historyDto); 
    //     }
    //     else{
    //         throw new ForbiddenException();
    //     }
    // }

    @UseGuards(JwtAuthGuard, JwtStrategy)
    @Get('profile/:username/history')
    async getFriendsOfUser(@Req() req, @Param('username') username: string): Promise<HistoryDto[]>{
        const authorization = req.user;
        if (authorization.username == username){
            return this.userService.findAllHistoryOfUser(username); 
        }
        else{
            throw new ForbiddenException();
        }
    }
    
    // @UseGuards(JwtAuthGuard, JwtStrategy)
    // @Post('profile/:username/achievements')
    // async addAchievementOfUser(@Req() req, @Param('username') username: string, @Body() achievementDto:AchievementDto): Promise<AchievementParams>{
    //     const authorization = req.user;
    //     if(authorization.username == username){
    //         return this.userService.addAchievementOfUser(username, achievementDto);
    //     }
    //     else{
    //         throw new ForbiddenException();
    //     }
    // }

    @UseGuards(JwtAuthGuard, JwtStrategy)
    @Get('profile/:username/achievements')
    async getachievementOfUser(@Req() req, @Param('username') username: string): Promise<AchievementDto[]>{
        const authorization = req.user;
        if (authorization.username == username){
            return this.userService.findAllAchievementOfUser(username); 
        }
        else{
            throw new ForbiddenException();
        }
    }
   
    @UseGuards(JwtAuthGuard, JwtStrategy)
    @Post('profile/:username/sendRequest/:secondUsername')
    async sendRequest(@Req() req, @Param('username') username: string, @Param('secondUsername') secondUsername: string): Promise<any>{
        const authorization = req.user;
        if(authorization.username == username){
            return this.userService.sendRequest(username, secondUsername);
        }
        else{
            throw new ForbiddenException();
        }
    }

    @UseGuards(JwtAuthGuard, JwtStrategy)
    @Get('profile/:username/friends')
    async getFriendOfUser(@Req() req, @Param('username') username: string): Promise<RelationDto[]>{
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
    async getBlockedOfUser(@Req() req, @Param('username') username: string): Promise<RelationDto[]>{
        const authorization = req.user;
        if (authorization.username == username){
            return this.userService.findAllBlockedOfUser(username); 
        }
        else{
            throw new ForbiddenException();

        }
    }

    @UseGuards(JwtAuthGuard, JwtStrategy)
    @Get('profile/:username/requests')
    async getAllRequestsOfUser(@Req() req, @Param('username') username: string): Promise<RelationDto[]>{
        const authorization = req.user;
        if (authorization.username == username){
            return this.userService.getAllRequestsOfUser(username); 
        }
        else{
            throw new ForbiddenException();
        }
    }

    @UseGuards(JwtAuthGuard, JwtStrategy)
    @Get('profile/:username/requistsSend')
    async getAllRequistsSendFromUser(@Req() req, @Param('username') username: string): Promise<RelationDto[]>{
        const authorization = req.user;
        if (authorization.username == username){
            return this.userService.getAllRequistsSendFromUser(username); 
        }
        else{
            throw new ForbiddenException();
        }
    }

    @UseGuards(JwtAuthGuard, JwtStrategy)
    @Put('profile/:username/block/:secondUser')
    async UpdateStatusOfUser(@Req() req, @Param('username') username: string, @Param('secondUser') secondUser: string): Promise<any>{
        const authorization = req.user;
        if (authorization.username == username){
            return this.userService.blockUser(username, secondUser); 
        }
        else{
            throw new ForbiddenException();
        }
    }

    @UseGuards(JwtAuthGuard, JwtStrategy)
    @Put('profile/:username/unblock/:secondUser')
    async unblockUser(@Req() req, @Param('username') username: string, @Param('secondUser') secondUser: string): Promise<any>{
        const authorization = req.user;
        if (authorization.username == username){
            return this.userService.unblockUser(username, secondUser); 
        }
        else{
            throw new ForbiddenException();
        }
    }
    
    @UseGuards(JwtAuthGuard, JwtStrategy)
    @Put('profile/:username/acceptRequest/:secondUser')
    async acceptRequist(@Req() req, @Param('username') username: string, @Param('secondUser') secondUser: string): Promise<any>{
        const authorization = req.user;
        if (authorization.username == username){
            return this.userService.acceptRequest(username, secondUser); 
        }
        else{
            throw new ForbiddenException();
        }
    }

    @UseGuards(JwtAuthGuard, JwtStrategy)
    @Delete('profile/:username/rejectRequest/:secondUser')
    async rejectRequist(@Req() req, @Param('username') username: string, @Param('secondUser') secondUser: string): Promise<any>{
        const authorization = req.user;
        if (authorization.username == username){
            return this.userService.rejectRequest(username, secondUser); 
        }
        else{
            throw new ForbiddenException();
        }
    }

    @UseGuards(JwtAuthGuard, JwtStrategy)
    @Delete('profile/:username/cancelRequest/:secondUser')
    async cancelRequist(@Req() req, @Param('username') username: string, @Param('secondUser') secondUser: string): Promise<any>{
        const authorization = req.user;
        if (authorization.username == username){
            return this.userService.cancelRequist(username, secondUser); 
        }
        else{
            throw new ForbiddenException();
        }
    }

    @UseGuards(JwtAuthGuard, JwtStrategy)
    @Delete('profile/:username/cancelRelation/:secondUser')
    async cancelRelation(@Req() req, @Param('username') username: string, @Param('secondUser') secondUser: string): Promise<any>{
        const authorization = req.user;
        if (authorization.username == username){
            return this.userService.cancelRelation(username, secondUser); 
        }
        else{
            throw new ForbiddenException();
        }
    }

    @UseGuards(JwtAuthGuard, JwtStrategy)
    @Get('profile/:username/online')
    async getSatatusOfUser(@Req() req, @Param('username') username: string): Promise<RelationDto[]>{
        const authorization = req.user;
        if (authorization.username == username){
            return this.userService.getStatusOfUsers(username); 
        }
        else{
            throw new ForbiddenException();
        }
    }
    // @UseGuards(JwtAuthGuard, JwtStrategy)
    // @Get('profile/:username/suggest')
    // async suggestOfUser(@Req() req, @Param('username') username: string, @Param('relationId') relationId: number): Promise<RelationDto[]>{
    //     const authorization = req.user;
    //     if (authorization.username == username){
    //         return this.userService.findAllSuggestOfUser(username); 
    //     }
    //     else{
    //         throw new ForbiddenException();
    //     }
    // }
}
