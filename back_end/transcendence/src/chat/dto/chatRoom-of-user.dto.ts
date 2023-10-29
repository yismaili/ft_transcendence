import { IsString } from "class-validator";

export class ChatRoomOfUserDto{
    @IsString()
    username; string;
}