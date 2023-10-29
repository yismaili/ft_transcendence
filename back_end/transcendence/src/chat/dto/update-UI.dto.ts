import { IsString } from "class-validator";

export class UpdateUIDto{
    @IsString()
    message: string;
}