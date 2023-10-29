import { IsString } from "class-validator";

export class TwoFactorAuthenticationCodeDto{
    @IsString()
    code: string;
    @IsString()
    username: string;
}