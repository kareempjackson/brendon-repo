import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { EmailService } from '../services/email.service';
import { TokenService } from '../services/token.service';
import { EMAIL_PROVIDER, IEmailProvider } from '../interfaces/email-provider.interface';

describe('EmailService', () => {
  let service: EmailService;
  let mockProvider: jest.Mocked<IEmailProvider>;
  let tokenService: TokenService;

  beforeEach(async () => {
    mockProvider = {
      send: jest.fn(),
      getName: jest.fn().mockReturnValue('MockProvider'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        TokenService,
        {
          provide: EMAIL_PROVIDER,
          useValue: mockProvider,
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              const config: Record<string, unknown> = {
                EMAIL_MAX_RETRIES: 3,
                EMAIL_RETRY_DELAY_MS: 100,
                EMAIL_VERIFICATION_EXPIRY_HOURS: 24,
                APP_URL: 'http://localhost:3000',
              };
              return config[key];
            }),
          },
        },
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
    tokenService = module.get<TokenService>(TokenService);
  });

  describe('sendVerificationEmail', () => {
    it('should send verification email successfully', async () => {
      mockProvider.send.mockResolvedValue({ success: true, messageId: 'msg-123' });

      const result = await service.sendVerificationEmail({
        email: 'test@example.com',
        userName: 'Test User',
        userId: 'user-123',
      });

      expect(result.success).toBe(true);
      expect(result.tokenData).toBeDefined();
      expect(result.tokenData?.token).toBeDefined();
      expect(result.tokenData?.hashedToken).toBeDefined();
      expect(result.tokenData?.expiresAt).toBeInstanceOf(Date);
      expect(result.messageId).toBe('msg-123');
      expect(mockProvider.send).toHaveBeenCalledTimes(1);
    });

    it('should retry on failure and eventually succeed', async () => {
      mockProvider.send
        .mockResolvedValueOnce({ success: false, error: 'Temporary error' })
        .mockResolvedValueOnce({ success: true, messageId: 'msg-456' });

      const result = await service.sendVerificationEmail({
        email: 'test@example.com',
        userName: 'Test User',
        userId: 'user-123',
      });

      expect(result.success).toBe(true);
      expect(mockProvider.send).toHaveBeenCalledTimes(2);
    });

    it('should fail after max retries', async () => {
      mockProvider.send.mockResolvedValue({ success: false, error: 'Persistent error' });

      const result = await service.sendVerificationEmail({
        email: 'test@example.com',
        userName: 'Test User',
        userId: 'user-123',
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain('Failed after 3 attempts');
      expect(mockProvider.send).toHaveBeenCalledTimes(3);
    });
  });

  describe('validateVerificationToken', () => {
    it('should validate a valid token', () => {
      const tokenData = tokenService.generateVerificationToken(24);
      
      const result = service.validateVerificationToken(
        tokenData.token,
        tokenData.hashedToken,
        tokenData.expiresAt
      );

      expect(result.valid).toBe(true);
    });

    it('should reject an invalid token', () => {
      const tokenData = tokenService.generateVerificationToken(24);
      
      const result = service.validateVerificationToken(
        'invalid-token',
        tokenData.hashedToken,
        tokenData.expiresAt
      );

      expect(result.valid).toBe(false);
      expect(result.reason).toBe('Invalid token');
    });

    it('should reject an expired token', () => {
      const tokenData = tokenService.generateVerificationToken(24);
      const expiredDate = new Date(Date.now() - 1000);
      
      const result = service.validateVerificationToken(
        tokenData.token,
        tokenData.hashedToken,
        expiredDate
      );

      expect(result.valid).toBe(false);
      expect(result.reason).toBe('Token has expired');
    });
  });
});
