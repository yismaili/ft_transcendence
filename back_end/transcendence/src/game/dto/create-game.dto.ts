import { IsString } from "class-validator";

export class CreateGameDto {
    @IsString()
    username: string;
    @IsString()
    friendUsername: string;
}
