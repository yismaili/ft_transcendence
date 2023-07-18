import { IsNotEmpty, IsString } from "class-validator";
import { Role } from "../interface/role";

export class AuthenticateDto{
    
    @IsNotEmpty()
    @IsString()
    readonly id: string;

    @IsNotEmpty()
    @IsString()
    readonly userUUID : string;

    @IsNotEmpty()
    @IsString()
    readonly userName: string;

    @IsNotEmpty()
    @IsString()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    readonly password:string;

    @IsNotEmpty()
    @IsString()
    readonly role:Role;
}