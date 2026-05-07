import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { QueryPostsDto } from './dto/query-posts.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreatePostDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        bio: true,
        headline: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isProfileComplete = !!(user.firstName && user.lastName && user.bio && user.headline);
    if (!isProfileComplete) {
      throw new BadRequestException(
        'Profile must be complete before creating posts. Please fill in firstName, lastName, bio, and headline.',
      );
    }

    const post = await this.prisma.post.create({
      data: {
        title: dto.title,
        description: dto.description,
        type: dto.type,
        category: dto.category,
        industry: dto.industry,
        location: dto.location,
        authorId: userId,
      },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            headline: true,
            avatarUrl: true,
          },
        },
      },
    });

    return post;
  }

  async findAll(query: QueryPostsDto) {
    const { type, category, industry, location, limit = 20, offset = 0 } = query;

    const where: any = {
      deletedAt: null,
    };

    if (type) where.type = type;
    if (category) where.category = category;
    if (industry) where.industry = { contains: industry, mode: 'insensitive' };
    if (location) where.location = { contains: location, mode: 'insensitive' };

    const [posts, total] = await Promise.all([
      this.prisma.post.findMany({
        where,
        include: {
          author: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              headline: true,
              avatarUrl: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      this.prisma.post.count({ where }),
    ]);

    return {
      data: posts,
      meta: {
        total,
        limit,
        offset,
        hasMore: offset + posts.length < total,
      },
    };
  }

  async findOne(id: string) {
    const post = await this.prisma.post.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            headline: true,
            bio: true,
            avatarUrl: true,
            linkedinUrl: true,
            twitterUrl: true,
            websiteUrl: true,
            createdAt: true,
          },
        },
      },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async update(id: string, userId: string, dto: UpdatePostDto) {
    const post = await this.prisma.post.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.authorId !== userId) {
      throw new ForbiddenException('You can only update your own posts');
    }

    const updatedPost = await this.prisma.post.update({
      where: { id },
      data: {
        ...(dto.title && { title: dto.title }),
        ...(dto.description && { description: dto.description }),
        ...(dto.type && { type: dto.type }),
        ...(dto.category && { category: dto.category }),
        ...(dto.industry !== undefined && { industry: dto.industry }),
        ...(dto.location !== undefined && { location: dto.location }),
      },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            headline: true,
            avatarUrl: true,
          },
        },
      },
    });

    return updatedPost;
  }

  async remove(id: string, userId: string) {
    const post = await this.prisma.post.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.authorId !== userId) {
      throw new ForbiddenException('You can only delete your own posts');
    }

    await this.prisma.post.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return { message: 'Post deleted successfully' };
  }
}
