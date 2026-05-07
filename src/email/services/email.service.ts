import { Injectable, Inject, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  IEmailProvider,
  EMAIL_PROVIDER,
  SendEmailResult,
} from '../interfaces/email-provider.interface';
import { TokenService, TokenData } from './token.service';
import {
  generateVerificationEmailHtml,
  generateVerificationEmailText,
} from '../templates/verification-email.template';

export interface SendVerificationEmailOptions {
  email: string;
  userName: string;
  userId: string;
}

export interface VerificationEmailResult {
  success: boolean;
  tokenData?: TokenData;
  messageId?: string;
  error?: string;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly maxRetries: number;
  private readonly retryDelayMs: number;
  private readonly verificationExpiryHours: number;
  private readonly appUrl: string;

  constructor(
    @Inject(EMAIL_PROVIDER)
    private readonly emailProvider: IEmailProvider,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService
  ) {
    this.maxRetries = this.configService.get<number>('EMAIL_MAX_RETRIES') || 3;
    this.retryDelayMs = this.configService.get<number>('EMAIL_RETRY_DELAY_MS') || 1000;
    this.verificationExpiryHours = this.configService.get<number>('EMAIL_VERIFICATION_EXPIRY_HOURS') || 24;
    this.appUrl = this.configService.get<string>('APP_URL') || 'http://localhost:3000';

    this.logger.log(`Email service initialized with provider: ${this.emailProvider.getName()}`);
  }

  /**
   * Sends a verification email to a newly registered user.
   * Generates a secure token and includes retry logic for failed sends.
   */
  async sendVerificationEmail(
    options: SendVerificationEmailOptions
  ): Promise<VerificationEmailResult> {
    const { email, userName, userId } = options;

    this.logger.log(`Sending verification email to ${email}`);

    const tokenData = this.tokenService.generateVerificationToken(this.verificationExpiryHours);
    const verificationUrl = this.buildVerificationUrl(tokenData.token, userId);

    const html = generateVerificationEmailHtml({
      userName,
      verificationUrl,
      expiryHours: this.verificationExpiryHours,
    });

    const text = generateVerificationEmailText({
      userName,
      verificationUrl,
      expiryHours: this.verificationExpiryHours,
    });

    const result = await this.sendWithRetry({
      to: { email, name: userName },
      subject: '🚀 Verify your email - Brendon Network',
      html,
      text,
    });

    if (result.success) {
      this.logger.log(`Verification email sent successfully to ${email}`);
      return {
        success: true,
        tokenData,
        messageId: result.messageId,
      };
    }

    this.logger.error(`Failed to send verification email to ${email}: ${result.error}`);
    return {
      success: false,
      error: result.error,
    };
  }

  /**
   * Validates a verification token.
   */
  validateVerificationToken(
    token: string,
    storedHashedToken: string,
    expiresAt: Date
  ): { valid: boolean; reason?: string } {
    return this.tokenService.validateToken(token, storedHashedToken, expiresAt);
  }

  /**
   * Hashes a token for storage comparison.
   */
  hashToken(token: string): string {
    return this.tokenService.hashToken(token);
  }

  private buildVerificationUrl(token: string, userId: string): string {
    const baseUrl = this.appUrl.replace(/\/$/, '');
    return `${baseUrl}/auth/verify-email?token=${encodeURIComponent(token)}&userId=${encodeURIComponent(userId)}`;
  }

  private async sendWithRetry(
    options: Parameters<IEmailProvider['send']>[0]
  ): Promise<SendEmailResult> {
    let lastError: string | undefined;

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      this.logger.debug(`Email send attempt ${attempt}/${this.maxRetries}`);

      const result = await this.emailProvider.send(options);

      if (result.success) {
        return result;
      }

      lastError = result.error;
      this.logger.warn(`Email send attempt ${attempt} failed: ${result.error}`);

      if (attempt < this.maxRetries) {
        const delay = this.retryDelayMs * Math.pow(2, attempt - 1); // Exponential backoff
        this.logger.debug(`Waiting ${delay}ms before retry...`);
        await this.sleep(delay);
      }
    }

    return {
      success: false,
      error: `Failed after ${this.maxRetries} attempts. Last error: ${lastError}`,
    };
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
