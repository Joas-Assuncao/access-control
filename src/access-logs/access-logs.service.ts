import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateAccessLogDto } from './dto/create-access-log.dto';
import { AccessLog } from './entities/access-log.entity';

@Injectable()
export class AccessLogsService {
  constructor(
    @InjectRepository(AccessLog)
    private accessLogsRepository: Repository<AccessLog>,
  ) {}

  async create(createAccessLogDto: CreateAccessLogDto): Promise<AccessLog> {
    const accessLog = this.accessLogsRepository.create(createAccessLogDto);
    return this.accessLogsRepository.save(accessLog);
  }

  async findAll(): Promise<AccessLog[]> {
    return this.accessLogsRepository.find({
      relations: ['user'],
      order: { timestamp: 'DESC' },
    });
  }

  async findByUserId(userId: string): Promise<AccessLog[]> {
    return this.accessLogsRepository.find({
      where: { userId },
      relations: ['user'],
      order: { timestamp: 'DESC' },
    });
  }
}
