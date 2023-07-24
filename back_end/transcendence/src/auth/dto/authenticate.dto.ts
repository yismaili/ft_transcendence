import { IsNotEmpty, IsString } from "class-validator";
//DTOs are used to define the shape of the data sent over the network, typically during API requests
//login or sign-in process.
// Data Transfer Objects (DTOs)
export class AuthenticateDto{
    @IsNotEmpty()
    @IsString()
    readonly userName: string;

    @IsNotEmpty()
    @IsString()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    readonly password:string;
}