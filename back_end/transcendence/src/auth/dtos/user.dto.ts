import { IsNumber, IsString } from "class-validator";

export class UserDto {
    @IsNumber()
    id: number;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    username: string;

    @IsString()
    email: string;
    
    @IsString()
    picture: string;
}