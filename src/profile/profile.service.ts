import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from './storage.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileResponseDto, PublicProfileResponseDto } from './dto/profile-response.dto';
import { Profile, Skill, SeekingType } from '@prisma/client';

@Injectable()
export class ProfileService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storageService: StorageService,
  ) {}

  async create(userId: string, dto: CreateProfileDto): Promise<ProfileResponseDto> {
    const profile = await this.prisma.profile.create({
      data: {
        userId,
        headline: dto.headline,
        bio: dto.bio,
        skills: dto.skills as Skill[],
        seeking: dto.seeking as SeekingType[],
        city: dto.location?.city,
        country: dto.location?.country,
      },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    return this.toResponseDto(profile);
  }

  async findByUserId(userId: string): Promise<ProfileResponseDto | null> {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!profile) return null;
    return this.toResponseDto(profile);
  }

  async findById(id: string): Promise<ProfileResponseDto | null> {
    const profile = await this.prisma.profile.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!profile) return null;
    return this.toResponseDto(profile);
  }

  async update(userId: string, dto: UpdateProfileDto): Promise<ProfileResponseDto> {
    const updateData: Record<string, unknown> = {};

    if (dto.headline !== undefined) updateData.headline = dto.headline;
    if (dto.bio !== undefined) updateData.bio = dto.bio;
    if (dto.skills !== undefined) updateData.skills = dto.skills as Skill[];
    if (dto.seeking !== undefined) updateData.seeking = dto.seeking as SeekingType[];
    if (dto.location !== undefined) {
      updateData.city = dto.location.city;
      updateData.country = dto.location.country;
    }
    if (dto.photoKey !== undefined) {
      updateData.photoKey = dto.photoKey;
      updateData.photoUrl = dto.photoKey
        ? this.storageService.getPublicUrl(dto.photoKey)
        : null;
    }

    const profile = await this.prisma.profile.update({
      where: { userId },
      data: updateData,
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    return this.toResponseDto(profile);
  }

  async generatePhotoUploadUrl(userId: string): Promise<{ uploadUrl: string; photoKey: string }> {
    const photoKey = `profiles/${userId}/${Date.now()}.jpg`;
    const uploadUrl = await this.storageService.generatePresignedUploadUrl(photoKey);
    return { uploadUrl, photoKey };
  }

  toPublicProfile(profile: ProfileResponseDto): PublicProfileResponseDto {
    return {
      id: profile.id,
      headline: profile.headline,
      bio: profile.bio,
      skills: profile.skills,
      seeking: profile.seeking,
      location: profile.location,
      photoUrl: profile.photoUrl,
      createdAt: profile.createdAt,
    };
  }

  private toResponseDto(
    profile: Profile & { user: { email: string } },
  ): ProfileResponseDto {
    return {
      id: profile.id,
      userId: profile.userId,
      email: profile.user.email,
      headline: profile.headline,
      bio: profile.bio,
      skills: profile.skills,
      seeking: profile.seeking,
      location:
        profile.city || profile.country
          ? { city: profile.city ?? undefined, country: profile.country ?? undefined }
          : undefined,
      photoUrl: profile.photoUrl ?? undefined,
      photoKey: profile.photoKey ?? undefined,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    };
  }
}
