import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { Profile } from './Profile.entity';
import { Relation } from './Relation.entity';
import { Achievement } from './Achievement.entity';
import { HistoryEntity } from './History.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  picture: string;

  @ManyToOne(() => Relation)
  @JoinColumn({ name: 'Relation' })
  relation: Relation;

  @ManyToOne(() => Profile)
  @JoinColumn({ name: 'Profile' })
  profile: Profile;

  @ManyToOne(() => Achievement)
  @JoinColumn({ name: 'Achievement' })
  achievement: Achievement;

  @OneToMany(() => HistoryEntity, (he: HistoryEntity)=> he.competitor)
  @JoinColumn({ name: 'HistoryEntity' })
  HistoryEntity: HistoryEntity;



}
