import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  private readonly BCRYPT_ROUNDS = 12;
  private readonly VERIFICATION_TOKEN_EXPIRY_HOURS = 24;
  private readonly PASSWORD_RESET_EXPIRY_HOURS = 1;

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ message: string; userId: string }> {
    const { email, password } = registerDto;
    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await this.prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      throw new ConflictException('An account with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, this.BCRYPT_ROUNDS);
    const verificationToken = this.generateSecureToken();
    const verificationExpiry = new Date();
    verificationExpiry.setHours(verificationExpiry.getHours() + this.VERIFICATION_TOKEN_EXPIRY_HOURS);

    const user = await this.prisma.user.create({
      data: {
        email: normalizedEmail,
        password: hashedPassword,
        emailVerificationToken: verificationToken,
        emailVerificationExpiry: verificationExpiry,
      },
    });

    await this.emailService.sendVerificationEmail(normalizedEmail, verificationToken);

    return {
      message: 'Registration successful. Please check your email to verify your account.',
      userId: user.id,
    };
  }

  async verifyEmail(token: string): Promise<{ message: string }> {
    const user = await this.prisma.user.findUnique({
      where: { emailVerificationToken: token },
    });

    if (!user) {
      throw new BadRequestException('Invalid verification token');
    }

    if (user.emailVerificationExpiry && user.emailVerificationExpiry < new Date()) {
      throw new BadRequestException('Verification token has expired. Please request a new one.');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        emailVerificationToken: null,
        emailVerificationExpiry: null,
      },
    });

    return { message: 'Email verified successfully. You can now log in.' };
  }

  async resendVerificationEmail(email: string): Promise<{ message: string }> {
    const normalizedEmail = email.toLowerCase().trim();
    
    const user = await this.prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return { message: 'If an account exists with this email, a verification link will be sent.' };
    }

    if (user.emailVerified) {
      throw new BadRequestException('Email is already verified');
    }

    const verificationToken = this.generateSecureToken();
    const verificationExpiry = new Date();
    verificationExpiry.setHours(verificationExpiry.getHours() + this.VERIFICATION_TOKEN_EXPIRY_HOURS);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerificationToken: verificationToken,
        emailVerificationExpiry: verificationExpiry,
      },
    });

    await this.emailService.sendVerificationEmail(normalizedEmail, verificationToken);

    return { message: 'If an account exists with this email, a verification link will be sent.' };
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string; user: { id: string; email: string; emailVerified: boolean } }> {
    const { email, password } = loginDto;
    const normalizedEmail = email.toLowerCase().trim();

    const user = await this.prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (user.status !== 'ACTIVE') {
      throw new UnauthorizedException('Your account has been suspended. Please contact support.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      email_verified: user.emailVerified,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        emailVerified: user.emailVerified,
      },
    };
  }

  async logout(token: string, userId: string): Promise<{ message: string }> {
    const decoded = this.jwtService.decode(token) as JwtPayload;
    
    if (!decoded || !decoded.exp) {
      throw new BadRequestException('Invalid token');
    }

    const expiresAt = new Date(decoded.exp * 1000);

    await this.prisma.invalidatedToken.create({
      data: {
        token,
        userId,
        expiresAt,
      },
    });

    return { message: 'Logged out successfully' };
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    const normalizedEmail = email.toLowerCase().trim();
    
    const user = await this.prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return { message: 'If an account exists with this email, a password reset link will be sent.' };
    }

    const resetToken = this.generateSecureToken();
    const resetExpiry = new Date();
    resetExpiry.setHours(resetExpiry.getHours() + this.PASSWORD_RESET_EXPIRY_HOURS);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetToken: resetToken,
        passwordResetExpiry: resetExpiry,
      },
    });

    await this.emailService.sendPasswordResetEmail(normalizedEmail, resetToken);

    return { message: 'If an account exists with this email, a password reset link will be sent.' };
  }

  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    const user = await this.prisma.user.findUnique({
      where: { passwordResetToken: token },
    });

    if (!user) {
      throw new BadRequestException('Invalid or expired password reset token');
    }

    if (user.passwordResetExpiry && user.passwordResetExpiry < new Date()) {
      throw new BadRequestException('Password reset token has expired. Please request a new one.');
    }

    const hashedPassword = await bcrypt.hash(newPassword, this.BCRYPT_ROUNDS);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpiry: null,
      },
    });

    await this.prisma.invalidatedToken.deleteMany({
      where: { userId: user.id },
    });

    return { message: 'Password reset successfully. You can now log in with your new password.' };
  }

  async cleanupExpiredTokens(): Promise<void> {
    await this.prisma.invalidatedToken.deleteMany({
      where: {
        expiresAt: { lt: new Date() },
      },
    });
  }

  private generateSecureToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }
}
