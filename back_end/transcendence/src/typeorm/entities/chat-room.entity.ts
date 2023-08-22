import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ChatRoomUser } from "./chat-room-users.entity";
import { Message } from "./message-entity";

@Entity()
export class ChatRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  status: string;

  @Column('text')
  password: string;

  @OneToMany(() => Message, message => message.chatRoom)
  messages: Message[];

  @ManyToOne(() => ChatRoomUser, chatRoomUser => chatRoomUser.chatRooms)
  @JoinColumn({ name: 'chatRoomUserId' })
  chatRoomUser: ChatRoomUser;
}
