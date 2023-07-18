import { Options } from '@nestjs/common';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()//{unique: true}
  email: string;

  @Column()
  password: string;
}