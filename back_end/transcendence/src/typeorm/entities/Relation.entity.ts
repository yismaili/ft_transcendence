import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User.entity';

@Entity()
export class Relation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column()
   FromUser: string;

  @ManyToOne(() => User, user => user.friendRelations)
  friend: User;

  @ManyToOne(() => User, user => user.userRelations)
  user: User;
}
