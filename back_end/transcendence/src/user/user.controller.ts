import {Body, Controller, Delete, ForbiddenException, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/auth/dtos/user.dto';
import { AchievementDto } from 'src/auth/dtos/achievement.dto';
import { HistoryDto } from 'src/auth/dtos/history.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { RelationDto } from 'src/auth/dtos/relation.dto';
import { OutcomeDto} from 'src/auth/dtos/outcome.dto';
import { updateProfileDto } from 'src/auth/dtos/updateProfile.dto';
import { AchievementParams, HistoryParams, IAuthenticate, ProfileParams, RelationParams, UserParams } from 'utils/types';

@Controller('users')
export class UserController {
    constructor(private userService: UserService){}
    
    @Get(':username')
    async getDetailsUser(@Param('username') username: string): Promise<UserParams>{
       return this.userService.findProfileByUsername(username);
    }

    @UseGuards(JwtAuthGuard, JwtStrategy)
    @Get('profile/:username')
    async getDetailsProfile(@Req() req, @Param('username') username: string): Promise<UserParams> {
        const authorization = req.user;
        if (authorization.username == username){
            return this.userService.findProfileByUsername(username);
        }
        else{
            throw new ForbiddenException();
        }
    }

    @UseGuards(JwtAuthGuard, JwtStrategy)
    @Put('profile/:username/updateOutcome')
    async updateProfileOutcome(@Req() req, @Param('username') username: string, @Body() updateProfileDto:OutcomeDto) : Promise<ProfileParams>{
        const authorization = req.user;
        if (authorization.username == username){
            return this.userService.updateProfileOutcomeByUsername(username, updateProfileDto); 
        }
        else{
            throw new ForbiddenException();
        }
    }

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

    @UseGuards(JwtAuthGuard, JwtStrategy)
    @Post('profile/:username/history')
    async addHistory(@Req() req, @Param('username') username: string, @Body() historyDto:HistoryDto): Promise<HistoryParams>{
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
    async getFriendsOfUser(@Req() req, @Param('username') username: string): Promise<HistoryDto[]>{
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
    async addAchievementOfUser(@Req() req, @Param('username') username: string, @Body() achievementDto:AchievementDto): Promise<AchievementParams>{
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
    @Post('profile/:username/sendRequist/:id')
    async sendRequist(@Req() req, @Param('username') username: string, @Param('id') idOfuser: number): Promise<RelationParams>{
        const authorization = req.user;
        if(authorization.username == username){
            return this.userService.sendRequist(username, idOfuser);
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
    @Get('profile/:username/requists')
    async getAllRequistsOfUser(@Req() req, @Param('username') username: string): Promise<RelationDto[]>{
        const authorization = req.user;
        if (authorization.username == username){
            return this.userService.getAllRequistsOfUser(username); 
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
    @Put('profile/:username/block/:relationId')
    async UpdateStatusOfUser(@Req() req, @Param('username') username: string, @Param('relationId') relationId: number): Promise<RelationParams>{
        const authorization = req.user;
        if (authorization.username == username){
            return this.userService.blockUserFromFriend(username, relationId); 
        }
        else{
            throw new ForbiddenException();
        }
    }

    @UseGuards(JwtAuthGuard, JwtStrategy)
    @Put('profile/:username/unblock/:relationId')
    async unblockUser(@Req() req, @Param('username') username: string, @Param('relationId') relationId: number): Promise<RelationParams>{
        const authorization = req.user;
        if (authorization.username == username){
            return this.userService.unblockUser(username, relationId); 
        }
        else{
            throw new ForbiddenException();
        }
    }
    
    @UseGuards(JwtAuthGuard, JwtStrategy)
    @Put('profile/:username/acceptRequist/:relationId')
    async acceptRequist(@Req() req, @Param('username') username: string, @Param('relationId') relationId: number): Promise<RelationParams>{
        const authorization = req.user;
        if (authorization.username == username){
            return this.userService.acceptRequest(username, relationId); 
        }
        else{
            throw new ForbiddenException();
        }
    }

    @UseGuards(JwtAuthGuard, JwtStrategy)
    @Delete('profile/:username/rejectRequist/:relationId')
    async rejectRequist(@Req() req, @Param('username') username: string, @Param('relationId') relationId: number): Promise<RelationParams>{
        const authorization = req.user;
        if (authorization.username == username){
            return this.userService.rejectRequest(username, relationId); 
        }
        else{
            throw new ForbiddenException();
        }
    }

    @UseGuards(JwtAuthGuard, JwtStrategy)
    @Delete('profile/:username/cancelRequist/:relationId')
    async cancelRequist(@Req() req, @Param('username') username: string, @Param('relationId') relationId: number): Promise<RelationParams>{
        const authorization = req.user;
        if (authorization.username == username){
            return this.userService.cancelRequist(username, relationId); 
        }
        else{
            throw new ForbiddenException();
        }
    }

    @UseGuards(JwtAuthGuard, JwtStrategy)
    @Get('profile/:username/status')
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
