import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ChatRoomUsers } from "./chat-room-users.entity";


@Entity()
export class ChatRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  text: string;

  @OneToMany(() => ChatRoomUsers, chatRoomUser => chatRoomUser.chatRoom)
  chatRoomUsers: ChatRoomUsers[];
}


