import { User } from 'src/typeorm/entities/User.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column()
  password: string;

  @Column()
  time: string;

  @Column()
  statusPermissions: string;

  @Column()
  statusUser: string;

  @Column()
  text: string;

  @ManyToOne(() => User, user => user.chats)
  user: User;

  @ManyToOne(() => User, user => user.messages)
  messager: User;
  property1: any;
  property2: any;
}
