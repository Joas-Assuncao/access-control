import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAccessLogDto {
  @ApiProperty({
    description: 'ID do usuário (opcional para tentativas falhadas)',
  })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiProperty({ description: 'Email do usuário (para tentativas falhadas)' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ description: 'Endereço IP' })
  @IsString()
  ipAddress: string;

  @ApiProperty({ description: 'User-Agent do navegador' })
  @IsOptional()
  @IsString()
  userAgent?: string;

  @ApiProperty({ description: 'Status do login' })
  @IsString()
  status: string;
}
