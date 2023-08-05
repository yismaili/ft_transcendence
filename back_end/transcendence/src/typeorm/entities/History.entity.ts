import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert, BeforeUpdate } from 'typeorm';
import { User } from './User.entity';

@Entity()
export class HistoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.histories)
  user: User;
  
  @Column()
  date:Date

  @ManyToOne(() => User, user => user.histories)
  userCompetitor: User;

  @BeforeInsert()
  setDateOnInsert() {
    this.date = new Date();
  }

  @BeforeUpdate()
  setDateOnUpdate() {
    this.date = new Date();
  }
}
