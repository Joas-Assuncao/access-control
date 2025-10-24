import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AccessLogsModule } from './access-logs/access-logs.module';
import { User } from './users/entities/user.entity';
import { AccessLog } from './access-logs/entities/access-log.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT) || 5432,
      username: process.env.DATABASE_USERNAME || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'postgres',
      database: process.env.DATABASE_NAME || 'access_control',
      entities: [User, AccessLog],
      migrations: ['src/database/migrations/*.ts'],
      synchronize: false, // Usar migrations em produção
      logging: process.env.NODE_ENV === 'development',
    }),
    AuthModule,
    UsersModule,
    AccessLogsModule,
  ],
})
export class AppModule {}
