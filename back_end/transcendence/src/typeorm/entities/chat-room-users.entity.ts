import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";
import { ChatRoom } from "./chat-room.entity";

@Entity()
export class ChatRoomUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  time: string;

  @Column('text')
  statusPermissions: string;

  @Column('text')
  statusUser: string;

  @ManyToOne(() => User, user => user.chatRoomUsers)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => ChatRoom, chatRoom => chatRoom.chatRoomUser)
  chatRooms: ChatRoom[];
}
