import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto, StartupStage } from './dto/update-profile.dto';
import { ProfileResponseDto, PublicProfileResponseDto } from './dto/profile-response.dto';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  async getMyProfile(userId: string): Promise<ProfileResponseDto> {
    let profile = await this.prisma.profile.findUnique({
      where: { user_id: userId },
    });

    if (!profile) {
      profile = await this.prisma.profile.create({
        data: {
          user_id: userId,
          name: '',
          is_complete: false,
        },
      });
    }

    return this.toProfileResponse(profile);
  }

  async updateMyProfile(userId: string, dto: UpdateProfileDto): Promise<ProfileResponseDto> {
    let profile = await this.prisma.profile.findUnique({
      where: { user_id: userId },
    });

    const isComplete = this.calculateIsComplete(dto);

    if (!profile) {
      profile = await this.prisma.profile.create({
        data: {
          user_id: userId,
          name: dto.name,
          bio: dto.bio ?? null,
          linkedin_url: dto.linkedin_url ?? null,
          startup_stage: dto.startup_stage ?? null,
          industry: dto.industry ?? null,
          avatar_url: dto.avatar_url ?? null,
          is_complete: isComplete,
        },
      });
    } else {
      profile = await this.prisma.profile.update({
        where: { user_id: userId },
        data: {
          name: dto.name,
          bio: dto.bio ?? null,
          linkedin_url: dto.linkedin_url ?? null,
          startup_stage: dto.startup_stage ?? null,
          industry: dto.industry ?? null,
          avatar_url: dto.avatar_url ?? null,
          is_complete: isComplete,
        },
      });
    }

    return this.toProfileResponse(profile);
  }

  async getPublicProfile(profileId: string): Promise<PublicProfileResponseDto> {
    const profile = await this.prisma.profile.findUnique({
      where: { id: profileId },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    if (!profile.is_complete) {
      throw new ForbiddenException('This profile is not publicly available');
    }

    return this.toPublicProfileResponse(profile);
  }

  private calculateIsComplete(dto: UpdateProfileDto): boolean {
    return !!(
      dto.name &&
      dto.name.trim() !== '' &&
      dto.bio &&
      dto.bio.trim() !== '' &&
      dto.startup_stage &&
      dto.industry &&
      dto.industry.trim() !== ''
    );
  }

  private toProfileResponse(profile: any): ProfileResponseDto {
    return {
      id: profile.id,
      user_id: profile.user_id,
      name: profile.name,
      bio: profile.bio,
      linkedin_url: profile.linkedin_url,
      startup_stage: profile.startup_stage as StartupStage | null,
      industry: profile.industry,
      avatar_url: profile.avatar_url,
      is_complete: profile.is_complete,
      created_at: profile.created_at,
      updated_at: profile.updated_at,
    };
  }

  private toPublicProfileResponse(profile: any): PublicProfileResponseDto {
    return {
      id: profile.id,
      name: profile.name,
      bio: profile.bio,
      linkedin_url: profile.linkedin_url,
      startup_stage: profile.startup_stage as StartupStage | null,
      industry: profile.industry,
      avatar_url: profile.avatar_url,
    };
  }
}
