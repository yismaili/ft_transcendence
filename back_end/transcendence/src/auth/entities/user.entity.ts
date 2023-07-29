import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { FriendshipEntity } from './friendship.entity';

@Entity()
export class UsreEntity {
  @PrimaryGeneratedColumn()
  userID: number;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50 })
  lastName: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 255 })
  picture: string;

  @OneToOne(() => ProfileEntity)
  @JoinColumn()
  profile: ProfileEntity;
  
  @ManyToOne(() => FriendshipEntity, (friendship) => friendship.user)
  friendships: FriendshipEntity;

}