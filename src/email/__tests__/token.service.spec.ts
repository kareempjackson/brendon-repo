import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from '../services/token.service';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenService],
    }).compile();

    service = module.get<TokenService>(TokenService);
  });

  describe('generateVerificationToken', () => {
    it('should generate a token with all required fields', () => {
      const result = service.generateVerificationToken(24);

      expect(result.token).toBeDefined();
      expect(result.hashedToken).toBeDefined();
      expect(result.expiresAt).toBeInstanceOf(Date);
      expect(result.token).not.toBe(result.hashedToken);
    });

    it('should generate unique tokens', () => {
      const token1 = service.generateVerificationToken(24);
      const token2 = service.generateVerificationToken(24);

      expect(token1.token).not.toBe(token2.token);
      expect(token1.hashedToken).not.toBe(token2.hashedToken);
    });

    it('should set correct expiry time', () => {
      const expiryHours = 24;
      const before = new Date();
      const result = service.generateVerificationToken(expiryHours);
      const after = new Date();

      const expectedMin = new Date(before.getTime() + expiryHours * 60 * 60 * 1000);
      const expectedMax = new Date(after.getTime() + expiryHours * 60 * 60 * 1000);

      expect(result.expiresAt.getTime()).toBeGreaterThanOrEqual(expectedMin.getTime() - 1000);
      expect(result.expiresAt.getTime()).toBeLessThanOrEqual(expectedMax.getTime() + 1000);
    });
  });

  describe('hashToken', () => {
    it('should produce consistent hashes', () => {
      const token = 'test-token-123';
      const hash1 = service.hashToken(token);
      const hash2 = service.hashToken(token);

      expect(hash1).toBe(hash2);
    });

    it('should produce different hashes for different tokens', () => {
      const hash1 = service.hashToken('token1');
      const hash2 = service.hashToken('token2');

      expect(hash1).not.toBe(hash2);
    });

    it('should produce a 64-character hex string', () => {
      const hash = service.hashToken('any-token');

      expect(hash).toMatch(/^[a-f0-9]{64}$/);
    });
  });

  describe('validateToken', () => {
    it('should return valid for correct token and non-expired date', () => {
      const tokenData = service.generateVerificationToken(24);

      const result = service.validateToken(
        tokenData.token,
        tokenData.hashedToken,
        tokenData.expiresAt
      );

      expect(result.valid).toBe(true);
      expect(result.reason).toBeUndefined();
    });

    it('should return invalid for wrong token', () => {
      const tokenData = service.generateVerificationToken(24);

      const result = service.validateToken(
        'wrong-token',
        tokenData.hashedToken,
        tokenData.expiresAt
      );

      expect(result.valid).toBe(false);
      expect(result.reason).toBe('Invalid token');
    });

    it('should return invalid for expired token', () => {
      const tokenData = service.generateVerificationToken(24);
      const expiredDate = new Date(Date.now() - 1000);

      const result = service.validateToken(
        tokenData.token,
        tokenData.hashedToken,
        expiredDate
      );

      expect(result.valid).toBe(false);
      expect(result.reason).toBe('Token has expired');
    });
  });

  describe('generateTokenId', () => {
    it('should generate URL-safe token IDs', () => {
      const id = service.generateTokenId();

      expect(id).toBeDefined();
      expect(id.length).toBeGreaterThan(0);
      // base64url doesn't contain +, /, or =
      expect(id).not.toMatch(/[+/=]/);
    });

    it('should generate unique IDs', () => {
      const id1 = service.generateTokenId();
      const id2 = service.generateTokenId();

      expect(id1).not.toBe(id2);
    });
  });
});
