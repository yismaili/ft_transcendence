import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { User } from './User.entity';
import { ChatRoom } from './chat-room.entity';


@Entity('Message')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.messages)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column('date')
  date: Date;

  @Column('text')
  message: string;

  @ManyToOne(() => ChatRoom, chatRoom => chatRoom.messages)
  @JoinColumn({ name: 'chatRoomId' })
  chatRoom: ChatRoom;

  @BeforeInsert()
  setDateOnInsert() {
    this.date = new Date();
  }

  @BeforeUpdate()
  setDateOnUpdate() {
    this.date = new Date();
  }
  
}

