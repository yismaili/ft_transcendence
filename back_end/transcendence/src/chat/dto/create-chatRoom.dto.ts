import { IsDate, IsString, MaxLength, MinLength } from "class-validator";

export class  CreateChatRoomDto {
    @IsString()
    user: string;

    @IsString()
    name: string;

    picture: any;

    @IsString()
    status: string;

    @IsString()
    password: string;
    
    @IsString()
    statusPermissions: string;

    @IsDate()
    time: string;

    @IsString()
    statusUser: string;
}
