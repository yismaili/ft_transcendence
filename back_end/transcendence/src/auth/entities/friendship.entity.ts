import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UsreEntity } from './user.entity';

@Entity()
export class FriendshipEntity {
  @PrimaryGeneratedColumn()
  friendship_ID: number;

  @ManyToOne(() => UsreEntity, (user) => user.friendships)
  user: UsreEntity;
}
