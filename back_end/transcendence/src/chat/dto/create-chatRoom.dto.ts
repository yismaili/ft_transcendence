import { User } from "src/typeorm/entities/User.entity";

export class  CreateChatRoomDto {
    user: string;
    name: string;
    picture: any;
    status: string;
    password: string;
    statusPermissions: string;
    time: string;
    statusUser: string;
}
