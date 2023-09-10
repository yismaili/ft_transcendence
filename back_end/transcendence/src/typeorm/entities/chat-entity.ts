import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { User } from './User.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.userChats)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column('date')
  dateToSend: Date;

  @Column('text')
  message: string;

  @ManyToOne(() => User, user => user.secondUserChats)
  @JoinColumn({ name: 'secondUser' })
  secondUser: User;


  @BeforeInsert()
  setDateOnInsert() {
    this.dateToSend = new Date();
  }

  @BeforeUpdate()
  setDateOnUpdate() {
    this.dateToSend = new Date();
  }
}
