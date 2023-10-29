import { IsString } from "class-validator";

export class JoinUsertoChatRoom {
    @IsString()
    adminUsername: string;
    @IsString()
    chatRoomName: string;
    @IsString()
    username: string;
    @IsString()
    statusPermissions: string;
}