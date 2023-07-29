import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Achievement {
  @PrimaryGeneratedColumn()
  achievement_id: number;

  @Column()
  type: string;

  @Column()
  description: string;
}
