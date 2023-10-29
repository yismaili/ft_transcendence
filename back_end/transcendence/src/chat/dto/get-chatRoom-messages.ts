import { IsString } from "class-validator";

export  class GetChatRoomMessages{
    @IsString()
    chatRoomName: string;
    @IsString()
    username: string;
}