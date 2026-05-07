import { Module, DynamicModule, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EMAIL_PROVIDER } from './interfaces/email-provider.interface';
import { EmailService } from './services/email.service';
import { TokenService } from './services/token.service';
import { SendGridProvider } from './providers/sendgrid.provider';
import { AwsSesProvider } from './providers/aws-ses.provider';
import { ConsoleEmailProvider } from './providers/console.provider';

export type EmailProviderType = 'sendgrid' | 'aws-ses' | 'console';

export interface EmailModuleOptions {
  provider?: EmailProviderType;
}

@Module({})
export class EmailModule {
  static forRoot(options?: EmailModuleOptions): DynamicModule {
    const providerFactory: Provider = {
      provide: EMAIL_PROVIDER,
      useFactory: (configService: ConfigService) => {
        const providerType =
          options?.provider ||
          configService.get<EmailProviderType>('EMAIL_PROVIDER') ||
          'console';

        switch (providerType) {
          case 'sendgrid':
            return new SendGridProvider(configService);
          case 'aws-ses':
            return new AwsSesProvider(configService);
          case 'console':
          default:
            return new ConsoleEmailProvider();
        }
      },
      inject: [ConfigService],
    };

    return {
      module: EmailModule,
      imports: [ConfigModule],
      providers: [providerFactory, EmailService, TokenService],
      exports: [EmailService, TokenService],
      global: true,
    };
  }

  static forRootAsync(): DynamicModule {
    return this.forRoot();
  }
}
