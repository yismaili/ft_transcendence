import { User } from "src/typeorm/entities/User.entity";

export class MessageChatDto {
    id: number;
    text: string;
    username: string;
    secondUsername: string;
}
