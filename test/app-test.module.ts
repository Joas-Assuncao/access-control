import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../src/app.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [__dirname + '/../src/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AppModule,
  ],
})
export class AppTestModule {}
