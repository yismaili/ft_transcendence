import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert, BeforeUpdate } from 'typeorm';
import { User } from './User.entity';

@Entity()
export class HistoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date:Date;

  @Column()
  resulteOfUser: number;
  
  @Column()
  resulteOfCompetitor: number;
  
  @ManyToOne(() => User, user => user.histories)
  user: User;

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
