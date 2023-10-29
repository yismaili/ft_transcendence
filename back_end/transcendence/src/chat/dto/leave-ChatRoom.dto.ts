import { IsString } from "class-validator";

export class LeaveChatRoomDto {
    @IsString()
    username: string;
    @IsString()
    chatRoomName: string;
};