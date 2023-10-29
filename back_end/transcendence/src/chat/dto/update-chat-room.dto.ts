import { IsString } from "class-validator";

export class updateChatRoom{
    @IsString()
    roomId: string;
    @IsString()
    username: string;
    @IsString()
    chatRoomName: string;
    @IsString()
    status: string;
    @IsString()
    picture: any;
    @IsString()
    password: string;
}