import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { AccessLogsService } from '../../src/access-logs/access-logs.service';
import { AuthService } from '../../src/auth/auth.service';
import { UsersService } from '../../src/users/users.service';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let accessLogsService: AccessLogsService;
  let jwtService: JwtService;

  const mockUser = {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    password: 'hashedPassword',
    role: 'user',
  };

  const mockUsersService = {
    findByEmail: jest.fn(),
    validatePassword: jest.fn(),
  };

  const mockAccessLogsService = {
    create: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: AccessLogsService,
          useValue: mockAccessLogsService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    accessLogsService = module.get<AccessLogsService>(AccessLogsService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user data when credentials are valid', async () => {
      mockUsersService.findByEmail.mockResolvedValue(mockUser);
      mockUsersService.validatePassword.mockResolvedValue(true);

      const result = await service.validateUser('test@example.com', 'password');

      expect(result).toEqual({
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        role: 'user',
      });
      expect(mockUsersService.findByEmail).toHaveBeenCalledWith(
        'test@example.com',
      );
      expect(mockUsersService.validatePassword).toHaveBeenCalledWith(
        'password',
        'hashedPassword',
      );
    });

    it('should return null when user is not found', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);

      const result = await service.validateUser('test@example.com', 'password');

      expect(result).toBeNull();
    });

    it('should return null when password is invalid', async () => {
      mockUsersService.findByEmail.mockResolvedValue(mockUser);
      mockUsersService.validatePassword.mockResolvedValue(false);

      const result = await service.validateUser(
        'test@example.com',
        'wrongpassword',
      );

      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return access token and user data on successful login', async () => {
      const loginDto = { email: 'test@example.com', password: 'password' };
      const ipAddress = '127.0.0.1';
      const userAgent = 'Mozilla/5.0';

      mockUsersService.findByEmail.mockResolvedValue(mockUser);
      mockUsersService.validatePassword.mockResolvedValue(true);
      mockJwtService.sign.mockReturnValue('jwt-token');
      mockAccessLogsService.create.mockResolvedValue({});

      const result = await service.login(loginDto, ipAddress, userAgent);

      expect(result).toEqual({
        access_token: 'jwt-token',
        user: {
          id: '1',
          name: 'Test User',
          email: 'test@example.com',
          role: 'user',
        },
      });
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        email: 'test@example.com',
        sub: '1',
        role: 'user',
      });
      expect(mockAccessLogsService.create).toHaveBeenCalledWith({
        userId: '1',
        ipAddress,
        userAgent,
        status: 'success',
      });
    });

    it('should throw UnauthorizedException and log failed attempt when credentials are invalid', async () => {
      const loginDto = { email: 'test@example.com', password: 'wrongpassword' };
      const ipAddress = '127.0.0.1';
      const userAgent = 'Mozilla/5.0';

      mockUsersService.findByEmail.mockResolvedValue(null);
      mockAccessLogsService.create.mockResolvedValue({});

      await expect(
        service.login(loginDto, ipAddress, userAgent),
      ).rejects.toThrow(UnauthorizedException);
      expect(mockAccessLogsService.create).toHaveBeenCalledWith({
        email: 'test@example.com',
        ipAddress,
        userAgent,
        status: 'failed',
      });
    });
  });
});
