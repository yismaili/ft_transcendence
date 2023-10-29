import { IsString } from "class-validator";

export class KickUserDto {
    @IsString()
    username: string;
    @IsString()
    chatRoomName: string;
    @IsString()
    userGetkick: string;
    @IsString()
    userstatus: string;
};