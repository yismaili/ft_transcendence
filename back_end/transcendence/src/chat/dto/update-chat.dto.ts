import { IsNumber, IsString } from "class-validator";

export class UpdateChatDto {
  @IsNumber()
  id: number;

  @IsString()
  message: string;

  @IsString()
  user: string;
  
  @IsString()
  secondUser: string;
}
