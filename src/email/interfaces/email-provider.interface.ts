/**
 * Abstract interface for email providers.
 * Allows swapping between SendGrid, AWS SES, or other providers.
 */
export interface EmailRecipient {
  email: string;
  name?: string;
}

export interface EmailAttachment {
  filename: string;
  content: string | Buffer;
  contentType?: string;
}

export interface SendEmailOptions {
  to: EmailRecipient | EmailRecipient[];
  subject: string;
  html: string;
  text?: string;
  from?: EmailRecipient;
  replyTo?: EmailRecipient;
  attachments?: EmailAttachment[];
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface IEmailProvider {
  send(options: SendEmailOptions): Promise<SendEmailResult>;
  getName(): string;
}

export const EMAIL_PROVIDER = Symbol('EMAIL_PROVIDER');
