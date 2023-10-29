import { IsString } from "class-validator";

export class MessageChatDto {
    @IsString()
    message: string;
    @IsString()
    user: string;
    @IsString()
    secondUser: string;
}
