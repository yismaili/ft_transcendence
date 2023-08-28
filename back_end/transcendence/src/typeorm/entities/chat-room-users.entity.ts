import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";
import { ChatRoom } from "./chat-room.entity";

@Entity()
export class ChatRoomUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  time: number;

  @Column({ nullable: true })
  statusPermissions: string;

  @Column({ nullable: true })
  statusUser: string;

  @ManyToOne(() => User, user => user.chatRoomUsers)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => ChatRoom, chatRoom => chatRoom.chatRoomUser)
  chatRooms: ChatRoom;
}
