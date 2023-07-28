import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { UsreEntity } from './user.entity';

@Entity()
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  Profile_ID: number;

  @Column({
    nullable: false,
    default: 0,
  })
  TotalGames: number;

  @Column()
  Win: number;

  @Column()
  Los: number;

  @Column({ length: 255 })
  History: string;

  @Column({ length: 255 })
  Achievements: string;

  @OneToOne(() => UsreEntity)
  @JoinColumn()
  user: UsreEntity;
}

