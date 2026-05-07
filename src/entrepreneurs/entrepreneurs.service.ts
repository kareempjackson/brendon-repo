import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DiscoverEntrepreneursDto } from './dto/discover-entrepreneurs.dto';
import { Prisma } from '@prisma/client';

export interface EntrepreneurProfile {
  id: string;
  user_id: string;
  full_name: string | null;
  headline: string | null;
  bio: string | null;
  location: string | null;
  skills: string[];
  interests: string[];
  seeking: string[];
  offering: string[];
  avatar_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  website_url: string | null;
  is_complete: boolean;
  created_at: Date;
  updated_at: Date;
  connection_status: 'pending' | 'accepted' | null;
}

export interface PaginatedEntrepreneurs {
  data: EntrepreneurProfile[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

@Injectable()
export class EntrepreneursService {
  constructor(private readonly prisma: PrismaService) {}

  async discoverEntrepreneurs(
    currentUserId: string,
    dto: DiscoverEntrepreneursDto,
  ): Promise<PaginatedEntrepreneurs> {
    const page = dto.page || 1;
    const limit = dto.limit || 20;
    const offset = (page - 1) * limit;

    // Get IDs of users already connected with (pending or accepted)
    const connectedUserIds = await this.getConnectedUserIds(currentUserId);
    const excludedUserIds = [currentUserId, ...connectedUserIds];

    // Build WHERE conditions for the main query
    const whereConditions: string[] = [
      `p.user_id NOT IN (${excludedUserIds.map((id) => `'${id}'`).join(', ')})`,
      `p.is_complete = true`,
    ];

    const params: any[] = [];
    let paramIndex = 1;

    // Filter by skills using GIN index (ANY matching skill)
    if (dto.skills && dto.skills.length > 0) {
      const skillsArray = Array.isArray(dto.skills) ? dto.skills : [dto.skills];
      whereConditions.push(`p.skills && $${paramIndex}::text[]`);
      params.push(skillsArray);
      paramIndex++;
    }

    // Filter by seeking - match profiles whose 'offering' contains what the user seeks
    if (dto.seeking && dto.seeking.length > 0) {
      const seekingArray = Array.isArray(dto.seeking) ? dto.seeking : [dto.seeking];
      whereConditions.push(`p.offering && $${paramIndex}::text[]`);
      params.push(seekingArray);
      paramIndex++;
    }

    // Filter by location (case-insensitive text search)
    if (dto.location) {
      whereConditions.push(`p.location ILIKE $${paramIndex}`);
      params.push(`%${dto.location}%`);
      paramIndex++;
    }

    const whereClause = whereConditions.join(' AND ');

    // Count total matching profiles
    const countQuery = `
      SELECT COUNT(*)::int as total
      FROM profiles p
      WHERE ${whereClause}
    `;

    const countResult = await this.prisma.$queryRawUnsafe<[{ total: number }]>(
      countQuery,
      ...params,
    );
    const total = countResult[0]?.total || 0;

    // Fetch profiles with connection status
    const profilesQuery = `
      SELECT 
        p.id,
        p.user_id,
        p.full_name,
        p.headline,
        p.bio,
        p.location,
        p.skills,
        p.interests,
        p.seeking,
        p.offering,
        p.avatar_url,
        p.linkedin_url,
        p.twitter_url,
        p.website_url,
        p.is_complete,
        p.created_at,
        p.updated_at,
        (
          SELECT c.status
          FROM connections c
          WHERE (
            (c.requester_id = '${currentUserId}' AND c.addressee_id = p.user_id)
            OR (c.addressee_id = '${currentUserId}' AND c.requester_id = p.user_id)
          )
          AND c.status IN ('pending', 'accepted')
          LIMIT 1
        ) as connection_status
      FROM profiles p
      WHERE ${whereClause}
      ORDER BY p.created_at DESC
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    const profiles = await this.prisma.$queryRawUnsafe<EntrepreneurProfile[]>(
      profilesQuery,
      ...params,
    );

    return {
      data: profiles.map((profile) => ({
        ...profile,
        connection_status: profile.connection_status || null,
      })),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  private async getConnectedUserIds(currentUserId: string): Promise<string[]> {
    const connections = await this.prisma.$queryRaw<
      { requester_id: string; addressee_id: string }[]
    >`
      SELECT requester_id, addressee_id
      FROM connections
      WHERE (requester_id = ${currentUserId} OR addressee_id = ${currentUserId})
        AND status IN ('pending', 'accepted')
    `;

    const connectedIds = new Set<string>();
    for (const conn of connections) {
      if (conn.requester_id !== currentUserId) {
        connectedIds.add(conn.requester_id);
      }
      if (conn.addressee_id !== currentUserId) {
        connectedIds.add(conn.addressee_id);
      }
    }

    return Array.from(connectedIds);
  }
}
