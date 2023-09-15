import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  score: number = 90;

  @Column({ nullable: true })
  los: number = 95;

  @Column({ nullable: true })
  win: number = 40;

  @Column({ nullable: true })
  xp: number = 50;

  @Column({ nullable: true })
  level: number;
  
  @OneToOne(() => User, user => user.profile)
  @JoinColumn()
  user: User;
}
