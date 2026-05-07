import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  IEmailProvider,
  SendEmailOptions,
  SendEmailResult,
} from '../interfaces/email-provider.interface';

@Injectable()
export class SendGridProvider implements IEmailProvider {
  private readonly logger = new Logger(SendGridProvider.name);
  private readonly apiKey: string;
  private readonly baseUrl = 'https://api.sendgrid.com/v3/mail/send';

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('SENDGRID_API_KEY') || '';
  }

  getName(): string {
    return 'SendGrid';
  }

  async send(options: SendEmailOptions): Promise<SendEmailResult> {
    const fromEmail = options.from?.email || this.configService.get<string>('EMAIL_FROM_ADDRESS') || 'noreply@example.com';
    const fromName = options.from?.name || this.configService.get<string>('EMAIL_FROM_NAME') || 'Brendon Network';

    const recipients = Array.isArray(options.to) ? options.to : [options.to];

    const payload = {
      personalizations: [
        {
          to: recipients.map((r) => ({ email: r.email, name: r.name })),
        },
      ],
      from: { email: fromEmail, name: fromName },
      subject: options.subject,
      content: [
        ...(options.text ? [{ type: 'text/plain', value: options.text }] : []),
        { type: 'text/html', value: options.html },
      ],
    };

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const messageId = response.headers.get('x-message-id') || undefined;
        this.logger.log(`Email sent successfully via SendGrid: ${messageId}`);
        return { success: true, messageId };
      }

      const errorBody = await response.text();
      this.logger.error(`SendGrid API error: ${response.status} - ${errorBody}`);
      return { success: false, error: `SendGrid error: ${response.status}` };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`SendGrid send failed: ${message}`);
      return { success: false, error: message };
    }
  }
}
