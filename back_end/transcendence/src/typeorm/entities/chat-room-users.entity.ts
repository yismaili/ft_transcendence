import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";
import { ChatRoom } from "./chat-room.entity";


@Entity()
export class ChatRoomUsers {
  @PrimaryGeneratedColumn()
  id: number;
  
  @ManyToOne(() => User, user => user.chatRoomUsers)
  user: User;

  @Column({ nullable: true })
  statusPermissions: string;

  @Column({ nullable: true })
  statusUser: string;
  
  @Column({ nullable: true })
  time: string;

  @ManyToOne(() => ChatRoom, chatRoom => chatRoom.chatRoomUsers)
  chatRoom: ChatRoom;
}