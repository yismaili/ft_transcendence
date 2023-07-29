import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  profile_id: number;

  @Column()
  score: number;

  @Column()
  los: number;

  @Column()
  win: number;
}
