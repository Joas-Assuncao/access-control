import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AdminGuard } from '../auth/guards/admin.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AccessLogsService } from './access-logs.service';

@ApiTags('access-logs')
@Controller('access-logs')
@UseGuards(JwtAuthGuard, AdminGuard)
@ApiBearerAuth()
export class AccessLogsController {
  constructor(private readonly accessLogsService: AccessLogsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os logs de acesso (apenas admin)' })
  @ApiResponse({
    status: 200,
    description: 'Logs de acesso retornados com sucesso',
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso negado - apenas admins' })
  async findAll() {
    return this.accessLogsService.findAll();
  }
}
