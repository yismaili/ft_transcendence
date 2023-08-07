import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User.entity';

@Entity()
export class Relation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @ManyToOne(() => User, user => user.relationsOne)
  friend: User;

  @ManyToOne(() => User, user => user.relationsTwo)
  user: User;
}
