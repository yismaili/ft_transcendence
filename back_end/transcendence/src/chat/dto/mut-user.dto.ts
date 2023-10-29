import { IsNumber, IsString } from "class-validator";

export class MuteUserDto {
    @IsNumber()
    time:number;

    @IsString()
    username: string;

    @IsString()
    chatRoomName: string;

    @IsString()
    userGetmute: string;

    @IsString()
    userstatus: string;
};