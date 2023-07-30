import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { Profile } from './Profile.entity';
import { Relation } from './Relation.entity';
import { Achievement } from './Achievement.entity';
import { HistoryEntity } from './History.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  picture: string;

  @OneToOne(() => Profile, profile => profile.user, { cascade: true })
  profile: Profile;

  @OneToMany(() => Relation, relation => relation.userOne)
  relationsOne: Relation[];

  @OneToMany(() => Relation, relation => relation.userTwo)
  relationsTwo: Relation[];

  @OneToMany(() => Achievement, achievement => achievement.user)
  achievements: Achievement[];

  @OneToMany(() => HistoryEntity, history => history.user)
  histories: HistoryEntity[];
}
