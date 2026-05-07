import { Injectable, Logger } from '@nestjs/common';
import { randomBytes, createHash } from 'crypto';

export interface TokenData {
  token: string;
  hashedToken: string;
  expiresAt: Date;
}

export interface TokenValidationResult {
  valid: boolean;
  reason?: string;
}

@Injectable()
export class TokenService {
  private readonly logger = new Logger(TokenService.name);
  private readonly TOKEN_LENGTH = 32;

  /**
   * Generates a secure random token for email verification.
   * Returns both the plain token (for the email) and hashed token (for storage).
   */
  generateVerificationToken(expiryHours: number = 24): TokenData {
    const tokenBuffer = randomBytes(this.TOKEN_LENGTH);
    const token = tokenBuffer.toString('base64url');
    const hashedToken = this.hashToken(token);
    
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + expiryHours);

    this.logger.debug(`Generated verification token expiring at ${expiresAt.toISOString()}`);

    return {
      token,
      hashedToken,
      expiresAt,
    };
  }

  /**
   * Hashes a token using SHA-256 for secure storage.
   */
  hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  /**
   * Validates a token against its stored hash and expiry.
   */
  validateToken(
    providedToken: string,
    storedHashedToken: string,
    expiresAt: Date
  ): TokenValidationResult {
    const hashedProvided = this.hashToken(providedToken);

    if (hashedProvided !== storedHashedToken) {
      this.logger.debug('Token validation failed: hash mismatch');
      return { valid: false, reason: 'Invalid token' };
    }

    if (new Date() > expiresAt) {
      this.logger.debug('Token validation failed: token expired');
      return { valid: false, reason: 'Token has expired' };
    }

    this.logger.debug('Token validation successful');
    return { valid: true };
  }

  /**
   * Generates a URL-safe token ID for use in verification links.
   */
  generateTokenId(): string {
    return randomBytes(16).toString('base64url');
  }
}
