import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { AppTestModule } from './app-test.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppTestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/auth/login (POST) - should return 401 for invalid credentials', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'invalid@example.com',
        password: 'wrongpassword',
      })
      .expect(401);
  });

  it('/users (POST) - should create a new user', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      })
      .expect(201);
  });

  it('/users (GET) - should return 401 without authentication', () => {
    return request(app.getHttpServer()).get('/users').expect(401);
  });
});
