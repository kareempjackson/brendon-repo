import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly appUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.appUrl = this.configService.get<string>('APP_URL', 'http://localhost:3000');
  }

  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const verificationUrl = `${this.appUrl}/verify-email?token=${token}`;
    
    // In production, integrate with an email service like SendGrid, AWS SES, etc.
    // For now, log the verification link for development
    this.logger.log(`[DEV] Verification email for ${email}`);
    this.logger.log(`[DEV] Verification URL: ${verificationUrl}`);
    
    // TODO: Implement actual email sending
    // Example with nodemailer or external service:
    // await this.mailer.sendMail({
    //   to: email,
    //   subject: 'Verify your email address',
    //   html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`,
    // });
  }

  async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    const resetUrl = `${this.appUrl}/reset-password?token=${token}`;
    
    // In production, integrate with an email service
    this.logger.log(`[DEV] Password reset email for ${email}`);
    this.logger.log(`[DEV] Reset URL: ${resetUrl}`);
    
    // TODO: Implement actual email sending
  }

  async sendWelcomeEmail(email: string, name?: string): Promise<void> {
    this.logger.log(`[DEV] Welcome email for ${email}`);
    
    // TODO: Implement actual email sending
  }
}
