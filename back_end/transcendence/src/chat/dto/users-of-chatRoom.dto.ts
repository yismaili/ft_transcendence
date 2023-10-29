import { IsString } from "class-validator";

export class UsersOfChatRoom{
    @IsString()
    username: string;
    @IsString()
    chatRoomName: string;
}