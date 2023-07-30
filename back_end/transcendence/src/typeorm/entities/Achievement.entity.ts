import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User.entity';

@Entity()
export class Achievement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column('text', { nullable: true })
  description: string;

  @ManyToOne(() => User, user => user.achievements)
  user: User;
}
