import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User.entity';


@Entity()
export class Relation {
  @PrimaryGeneratedColumn()
  relation_id: number;

//   @Column()
//   user_id: number;

  @Column()
  status: string;

  @ManyToOne(() => User, user => user.relation)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

