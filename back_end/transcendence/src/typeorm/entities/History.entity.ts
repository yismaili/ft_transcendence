import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany, ManyToOne } from 'typeorm';
import { User } from './User.entity';

@Entity()
export class HistoryEntity {
  @PrimaryGeneratedColumn()
  history_id: number;

  @ManyToOne(() => User, (user: User) => user.user_id)
  competitor: number;

}
