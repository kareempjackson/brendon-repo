import { Injectable, Logger } from '@nestjs/common';
import {
  IEmailProvider,
  SendEmailOptions,
  SendEmailResult,
} from '../interfaces/email-provider.interface';
import { randomUUID } from 'crypto';

/**
 * Console email provider for development/testing.
 * Logs emails to console instead of sending them.
 */
@Injectable()
export class ConsoleEmailProvider implements IEmailProvider {
  private readonly logger = new Logger(ConsoleEmailProvider.name);

  getName(): string {
    return 'Console (Development)';
  }

  async send(options: SendEmailOptions): Promise<SendEmailResult> {
    const recipients = Array.isArray(options.to) ? options.to : [options.to];
    const messageId = randomUUID();

    this.logger.log('═'.repeat(60));
    this.logger.log('📧 EMAIL SENT (Console Provider)');
    this.logger.log('═'.repeat(60));
    this.logger.log(`Message ID: ${messageId}`);
    this.logger.log(`To: ${recipients.map((r) => r.email).join(', ')}`);
    this.logger.log(`Subject: ${options.subject}`);
    this.logger.log('─'.repeat(60));
    this.logger.log('HTML Content:');
    this.logger.log(options.html);
    if (options.text) {
      this.logger.log('─'.repeat(60));
      this.logger.log('Text Content:');
      this.logger.log(options.text);
    }
    this.logger.log('═'.repeat(60));

    return { success: true, messageId };
  }
}
