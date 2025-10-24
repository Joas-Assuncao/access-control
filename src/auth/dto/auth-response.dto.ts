import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({ description: 'Token JWT' })
  access_token: string;

  @ApiProperty({ description: 'Dados do usuário' })
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}
