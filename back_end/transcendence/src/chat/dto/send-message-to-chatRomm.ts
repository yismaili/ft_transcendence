import { IsString } from "class-validator";

export class SendMessageToChatRoom {
    @IsString()
    username: string;
    @IsString()
    message: string;
    @IsString()
    chatRoomName: string;
}