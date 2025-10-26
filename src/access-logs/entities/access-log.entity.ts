import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';

@Entity('access_logs')
export class AccessLog {
  @ApiProperty({ description: 'ID único do log' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Data e hora do acesso' })
  @CreateDateColumn()
  timestamp: Date;

  @ApiProperty({
    description: 'ID do usuário que fez login (nullable para falhas)',
  })
  @Column('uuid', { nullable: true })
  userId?: string;

  @ApiProperty({ description: 'Endereço IP do usuário' })
  @Column({ length: 45 })
  ipAddress: string;

  @ApiProperty({ description: 'User-Agent do navegador' })
  @Column({ type: 'text', nullable: true })
  userAgent?: string;

  @ApiProperty({ description: 'Status do login (success, failed)' })
  @Column({ length: 20, default: 'success' })
  status: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user?: User;
}
