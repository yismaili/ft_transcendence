import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { Profile } from './Profile.entity';
import { Relation } from './Relation.entity';
import { Achievement } from './Achievement.entity';
import { HistoryEntity } from './History.entity';
import { ChatRoomUser } from './chat-room-users.entity';
import { Chat } from './chat-entity';
import { Message } from './message-entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  uniquename: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  picture: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  twoFactorAuthSecret: string;

  @Column({ default: false })
  isTwoFactorAuthEnabled: boolean;

  @OneToOne(() => Profile, profile => profile.user, { cascade: true })
  profile: Profile;

  @OneToMany(() => Relation, relation => relation.user)
  userRelations: Relation[];

  @OneToMany(() => Relation, relation => relation.friend)
  friendRelations: Relation[];

  @OneToMany(() => Achievement, achievement => achievement.user)
  achievements: Achievement[];

  @OneToMany(() => HistoryEntity, history => history.user)
  histories: HistoryEntity[];
  
  @OneToMany(() => ChatRoomUser, chatRoomUser => chatRoomUser.user)
  chatRoomUsers: ChatRoomUser[];

  @OneToMany(() => Chat, chat => chat.user)
  userChats: Chat[];

  @OneToMany(() => Chat, chat => chat.secondUser)
  secondUserChats: Chat[];

  @OneToMany(() => Message, message => message.user)
  messages: Message[];
}
