import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileResponseDto, PublicProfileResponseDto } from './dto/profile-response.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createProfile(
    @Request() req: { user: { userId: string } },
    @Body() createProfileDto: CreateProfileDto,
  ): Promise<ProfileResponseDto> {
    const existingProfile = await this.profileService.findByUserId(req.user.userId);
    if (existingProfile) {
      throw new ConflictException('Profile already exists for this user');
    }
    return this.profileService.create(req.user.userId, createProfileDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getOwnProfile(
    @Request() req: { user: { userId: string } },
  ): Promise<ProfileResponseDto> {
    const profile = await this.profileService.findByUserId(req.user.userId);
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return profile;
  }

  @Get('me/upload-url')
  @UseGuards(JwtAuthGuard)
  async getPhotoUploadUrl(
    @Request() req: { user: { userId: string } },
  ): Promise<{ uploadUrl: string; photoKey: string }> {
    return this.profileService.generatePhotoUploadUrl(req.user.userId);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @Request() req: { user: { userId: string } },
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<ProfileResponseDto> {
    const profile = await this.profileService.findByUserId(req.user.userId);
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return this.profileService.update(req.user.userId, updateProfileDto);
  }

  @Get(':id')
  async getPublicProfile(@Param('id') id: string): Promise<PublicProfileResponseDto> {
    const profile = await this.profileService.findById(id);
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return this.profileService.toPublicProfile(profile);
  }
}
