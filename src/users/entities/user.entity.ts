import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity('users')
export class User {
  @ApiProperty({ description: 'ID único do usuário' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Nome completo do usuário' })
  @Column({ length: 255 })
  name: string;

  @ApiProperty({ description: 'Email do usuário' })
  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @ApiProperty({ description: 'Perfil do usuário', enum: UserRole })
  @Column({
    type: 'text',
    default: UserRole.USER,
  })
  role: UserRole;

  @ApiProperty({ description: 'Data de criação' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Data de atualização' })
  @UpdateDateColumn()
  updatedAt: Date;
}
