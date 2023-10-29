import { IsString } from "class-validator";

export class JoinChatRoom {
    @IsString()
    username: string;
    @IsString()
    chatRoomName: string;
}