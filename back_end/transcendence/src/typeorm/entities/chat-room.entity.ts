import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ChatRoomUser } from "./chat-room-users.entity";
import { Message } from "./message-entity";

@Entity()
export class ChatRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  RoomId: string;
 
  @Column()
  name: string;
 
  @Column()
  status: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  picture: string;

  @OneToMany(() => Message, message => message.chatRoom)
  messages: Message[];

  @OneToMany(() => ChatRoomUser, chatRoomUser => chatRoomUser.chatRooms)
  @JoinColumn({ name: 'chatRoomUserId' })
  chatRoomUser: ChatRoomUser;
}
