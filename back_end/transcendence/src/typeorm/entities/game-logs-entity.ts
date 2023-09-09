import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert, BeforeUpdate } from 'typeorm';
import { User } from './User.entity';

@Entity()
export class GameLogsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  gameRoom: string;

  @Column({ nullable: false })
  status: string;

  @Column({ nullable: true })
  date:Date;

  
  @ManyToOne(() => User, user => user.gameLogs)
  user: User;

  @BeforeInsert()
  setDateOnInsert() {
    this.date = new Date();
  }

  @BeforeUpdate()
  setDateOnUpdate() {
    this.date = new Date();
  }
}