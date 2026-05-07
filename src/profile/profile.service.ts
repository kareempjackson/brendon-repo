import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Skill, SeekingType } from '@prisma/client';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateProfileDto) {
    const existingProfile = await this.prisma.profile.findUnique({
      where: { userId },
    });

    if (existingProfile) {
      throw new ConflictException('Profile already exists for this user');
    }

    const profile = await this.prisma.profile.create({
      data: {
        userId,
        headline: dto.headline,
        bio: dto.bio,
        skills: dto.skills,
        seeking: dto.seeking,
        city: dto.location?.city,
        country: dto.location?.country,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    return this.formatProfileResponse(profile);
  }

  async findByUserId(userId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return this.formatProfileResponse(profile);
  }

  async findPublicById(profileId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { id: profileId },
      include: {
        user: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return this.formatPublicProfileResponse(profile);
  }

  async update(userId: string, dto: UpdateProfileDto) {
    const existingProfile = await this.prisma.profile.findUnique({
      where: { userId },
    });

    if (!existingProfile) {
      throw new NotFoundException('Profile not found');
    }

    const updateData: Record<string, unknown> = {};

    if (dto.headline !== undefined) updateData.headline = dto.headline;
    if (dto.bio !== undefined) updateData.bio = dto.bio;
    if (dto.skills !== undefined) updateData.skills = dto.skills;
    if (dto.seeking !== undefined) updateData.seeking = dto.seeking;
    if (dto.photoUrl !== undefined) updateData.photoUrl = dto.photoUrl;
    if (dto.location !== undefined) {
      updateData.city = dto.location.city ?? null;
      updateData.country = dto.location.country ?? null;
    }

    const profile = await this.prisma.profile.update({
      where: { userId },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    return this.formatProfileResponse(profile);
  }

  getAvailableSkills(): string[] {
    return Object.values(Skill);
  }

  getAvailableSeekingTypes(): string[] {
    return Object.values(SeekingType);
  }

  private formatProfileResponse(profile: {
    id: string;
    userId: string;
    headline: string;
    bio: string;
    skills: Skill[];
    seeking: SeekingType[];
    city: string | null;
    country: string | null;
    photoUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
    user: { id: string; email: string };
  }) {
    return {
      id: profile.id,
      userId: profile.userId,
      email: profile.user.email,
      headline: profile.headline,
      bio: profile.bio,
      skills: profile.skills,
      seeking: profile.seeking,
      location: profile.city || profile.country
        ? {
            city: profile.city,
            country: profile.country,
          }
        : null,
      photoUrl: profile.photoUrl,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    };
  }

  private formatPublicProfileResponse(profile: {
    id: string;
    userId: string;
    headline: string;
    bio: string;
    skills: Skill[];
    seeking: SeekingType[];
    city: string | null;
    country: string | null;
    photoUrl: string | null;
    createdAt: Date;
    user: { id: string };
  }) {
    return {
      id: profile.id,
      userId: profile.userId,
      headline: profile.headline,
      bio: profile.bio,
      skills: profile.skills,
      seeking: profile.seeking,
      location: profile.city || profile.country
        ? {
            city: profile.city,
            country: profile.country,
          }
        : null,
      photoUrl: profile.photoUrl,
      createdAt: profile.createdAt,
    };
  }
}
