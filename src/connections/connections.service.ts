import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConnectionStatus } from '@prisma/client';
import { ConnectionStatusFilter } from './dto/connection-query.dto';
import { ConnectionAction } from './dto/update-connection.dto';

@Injectable()
export class ConnectionsService {
  constructor(private prisma: PrismaService) {}

  async sendConnectionRequest(requesterId: string, receiverId: string) {
    if (requesterId === receiverId) {
      throw new BadRequestException('Cannot send connection request to yourself');
    }

    const receiver = await this.prisma.user.findUnique({
      where: { id: receiverId },
    });

    if (!receiver) {
      throw new NotFoundException('User not found');
    }

    const existingConnection = await this.prisma.connection.findFirst({
      where: {
        OR: [
          { requester_id: requesterId, receiver_id: receiverId },
          { requester_id: receiverId, receiver_id: requesterId },
        ],
      },
    });

    if (existingConnection) {
      if (existingConnection.status === ConnectionStatus.PENDING) {
        throw new ConflictException('Connection request already pending');
      }
      if (existingConnection.status === ConnectionStatus.ACCEPTED) {
        throw new ConflictException('Already connected with this user');
      }
      if (existingConnection.status === ConnectionStatus.REJECTED) {
        throw new ConflictException('Connection request was previously rejected');
      }
    }

    const connection = await this.prisma.connection.create({
      data: {
        requester_id: requesterId,
        receiver_id: receiverId,
        status: ConnectionStatus.PENDING,
      },
      include: {
        receiver: {
          select: {
            id: true,
            profile: {
              select: {
                headline: true,
                company: true,
              },
            },
          },
        },
      },
    });

    return {
      id: connection.id,
      receiverId: connection.receiver_id,
      status: connection.status,
      createdAt: connection.created_at,
      receiver: {
        id: connection.receiver.id,
        headline: connection.receiver.profile?.headline,
        company: connection.receiver.profile?.company,
      },
    };
  }

  async getConnections(userId: string, statusFilter?: ConnectionStatusFilter) {
    const whereClause: any = {
      OR: [
        { requester_id: userId },
        { receiver_id: userId },
      ],
    };

    if (statusFilter) {
      whereClause.status = statusFilter;
    }

    const connections = await this.prisma.connection.findMany({
      where: whereClause,
      include: {
        requester: {
          select: {
            id: true,
            email: true,
            profile: {
              select: {
                headline: true,
                company: true,
              },
            },
          },
        },
        receiver: {
          select: {
            id: true,
            email: true,
            profile: {
              select: {
                headline: true,
                company: true,
              },
            },
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return connections.map((conn) => {
      const isRequester = conn.requester_id === userId;
      const otherUser = isRequester ? conn.receiver : conn.requester;
      const showEmail = conn.status === ConnectionStatus.ACCEPTED;

      return {
        id: conn.id,
        status: conn.status,
        direction: isRequester ? 'SENT' : 'RECEIVED',
        createdAt: conn.created_at,
        updatedAt: conn.updated_at,
        user: {
          id: otherUser.id,
          email: showEmail ? otherUser.email : undefined,
          headline: otherUser.profile?.headline,
          company: otherUser.profile?.company,
        },
      };
    });
  }

  async updateConnectionStatus(
    connectionId: string,
    userId: string,
    action: ConnectionAction,
  ) {
    const connection = await this.prisma.connection.findUnique({
      where: { id: connectionId },
      include: {
        requester: {
          select: {
            id: true,
            email: true,
            profile: {
              select: {
                headline: true,
                company: true,
              },
            },
          },
        },
        receiver: {
          select: {
            id: true,
            email: true,
            profile: {
              select: {
                headline: true,
                company: true,
              },
            },
          },
        },
      },
    });

    if (!connection) {
      throw new NotFoundException('Connection request not found');
    }

    if (connection.receiver_id !== userId) {
      throw new ForbiddenException('Only the recipient can accept or reject a connection request');
    }

    if (connection.status !== ConnectionStatus.PENDING) {
      throw new BadRequestException(
        `Cannot ${action.toLowerCase()} a connection that is already ${connection.status.toLowerCase()}`,
      );
    }

    const newStatus =
      action === ConnectionAction.ACCEPT
        ? ConnectionStatus.ACCEPTED
        : ConnectionStatus.REJECTED;

    const updatedConnection = await this.prisma.connection.update({
      where: { id: connectionId },
      data: { status: newStatus },
      include: {
        requester: {
          select: {
            id: true,
            email: true,
            profile: {
              select: {
                headline: true,
                company: true,
              },
            },
          },
        },
      },
    });

    const showEmail = newStatus === ConnectionStatus.ACCEPTED;

    return {
      id: updatedConnection.id,
      status: updatedConnection.status,
      updatedAt: updatedConnection.updated_at,
      user: {
        id: updatedConnection.requester.id,
        email: showEmail ? updatedConnection.requester.email : undefined,
        headline: updatedConnection.requester.profile?.headline,
        company: updatedConnection.requester.profile?.company,
      },
    };
  }

  async withdrawConnectionRequest(connectionId: string, userId: string) {
    const connection = await this.prisma.connection.findUnique({
      where: { id: connectionId },
    });

    if (!connection) {
      throw new NotFoundException('Connection request not found');
    }

    if (connection.requester_id !== userId) {
      throw new ForbiddenException('Only the requester can withdraw a connection request');
    }

    if (connection.status !== ConnectionStatus.PENDING) {
      throw new BadRequestException(
        `Cannot withdraw a connection that is ${connection.status.toLowerCase()}`,
      );
    }

    await this.prisma.connection.delete({
      where: { id: connectionId },
    });

    return { message: 'Connection request withdrawn successfully' };
  }
}
