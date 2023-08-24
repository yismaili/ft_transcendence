import { ChatRoomUser } from "src/typeorm/entities/chat-room-users.entity";
import { ChatRoom } from "src/typeorm/entities/chat-room.entity";
export class  CreateChatRoomDto extends ChatRoom {
    user: ChatRoomUser;

    constructor(user: ChatRoomUser) {
        super();
        this.user = user;
    }
}
