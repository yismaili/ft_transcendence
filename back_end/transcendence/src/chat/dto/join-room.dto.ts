import { IsString } from "class-validator";

export class JoinRoom {
    @IsString()
    username: string;
    @IsString()
    chatRoomName: string;
    @IsString()
    password: string;
}