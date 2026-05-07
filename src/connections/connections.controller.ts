import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ConnectionsService } from './connections.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ConnectionQueryDto } from './dto/connection-query.dto';
import { UpdateConnectionDto } from './dto/update-connection.dto';

@Controller('connections')
@UseGuards(JwtAuthGuard)
export class ConnectionsController {
  constructor(private readonly connectionsService: ConnectionsService) {}

  @Post(':userId')
  @HttpCode(HttpStatus.CREATED)
  async sendConnectionRequest(
    @Request() req,
    @Param('userId') receiverId: string,
  ) {
    return this.connectionsService.sendConnectionRequest(req.user.sub, receiverId);
  }

  @Get()
  async getConnections(@Request() req, @Query() query: ConnectionQueryDto) {
    return this.connectionsService.getConnections(req.user.sub, query.status);
  }

  @Put(':connectionId')
  async updateConnectionStatus(
    @Request() req,
    @Param('connectionId') connectionId: string,
    @Body() updateConnectionDto: UpdateConnectionDto,
  ) {
    return this.connectionsService.updateConnectionStatus(
      connectionId,
      req.user.sub,
      updateConnectionDto.action,
    );
  }

  @Delete(':connectionId')
  @HttpCode(HttpStatus.OK)
  async withdrawConnectionRequest(
    @Request() req,
    @Param('connectionId') connectionId: string,
  ) {
    return this.connectionsService.withdrawConnectionRequest(connectionId, req.user.sub);
  }
}
