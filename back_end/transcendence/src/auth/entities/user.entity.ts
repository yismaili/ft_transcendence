import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../interface/role';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string; // Update the type of id to string

  @IsNotEmpty()
  @IsString()
  @Column({ unique: true })
  userName: string;

  @IsNotEmpty()
  @IsString()
  @Column({ unique: true })//{ unique: true }
  email: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  password: string;

  @IsNotEmpty()
  @Column()
  role: Role;
}
