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
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly uploadService: UploadService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createProfile(
    @Request() req: { user: { userId: string } },
    @Body() createProfileDto: CreateProfileDto,
  ) {
    const profile = await this.profileService.create(
      req.user.userId,
      createProfileDto,
    );
    return {
      success: true,
      data: profile,
    };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getOwnProfile(@Request() req: { user: { userId: string } }) {
    const profile = await this.profileService.findByUserId(req.user.userId);
    return {
      success: true,
      data: profile,
    };
  }

  @Get('upload-url')
  @UseGuards(JwtAuthGuard)
  async getUploadUrl(@Request() req: { user: { userId: string } }) {
    const uploadData = await this.uploadService.generatePresignedUrl(
      req.user.userId,
    );
    return {
      success: true,
      data: uploadData,
    };
  }

  @Get('skills')
  getAvailableSkills() {
    return {
      success: true,
      data: this.profileService.getAvailableSkills(),
    };
  }

  @Get('seeking-types')
  getAvailableSeekingTypes() {
    return {
      success: true,
      data: this.profileService.getAvailableSeekingTypes(),
    };
  }

  @Get(':id')
  async getPublicProfile(@Param('id') id: string) {
    const profile = await this.profileService.findPublicById(id);
    return {
      success: true,
      data: profile,
    };
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @Request() req: { user: { userId: string } },
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    const profile = await this.profileService.update(
      req.user.userId,
      updateProfileDto,
    );
    return {
      success: true,
      data: profile,
    };
  }
}
