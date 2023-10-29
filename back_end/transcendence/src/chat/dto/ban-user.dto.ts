import { IsString } from "class-validator";

export class BanUserDto {
    @IsString()
    username: string;
    @IsString()
    chatRoomName: string;
    @IsString()
    userGetBan: string;
};