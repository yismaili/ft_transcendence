import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  score: number;

  @Column({ nullable: true })
  los: number;

  @Column({ nullable: true })
  win: number;

  @Column({ nullable: true })
  xp: number;
  
  @Column({ nullable: true })
  level: number;
  
  @OneToOne(() => User, user => user.profile)
  @JoinColumn()
  user: User;
}
