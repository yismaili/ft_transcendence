import { IsString } from "class-validator";

export class AcceptRequestDto{
    @IsString()
    username: string;
    @IsString()
    userCompetitor: string;
}