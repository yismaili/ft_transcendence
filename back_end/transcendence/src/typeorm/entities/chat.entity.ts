import { User } from 'src/typeorm/entities/User.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  status: string;

  @Column({ default: '' })
  password: string;

  @Column({ default: '' })
  time: string;

  @Column({ default: '' })
  statusPermissions: string;

  @Column({ default: '' })
  statusUser: string;

  @Column({ default: '' })
  text: string;

  @ManyToOne(() => User, user => user.chats)
  user: User;

  @ManyToOne(() => User, user => user.secondUser)
  secondUser: User;
}
