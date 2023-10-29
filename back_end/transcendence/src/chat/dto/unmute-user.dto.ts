import { IsString } from "class-validator";

export class UnmuteUserDto{
    @IsString()
    username: string;
    @IsString()
    chatRoomName: string;
}