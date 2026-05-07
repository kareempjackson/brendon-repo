import {
  Controller,
  Get,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EntrepreneursService } from './entrepreneurs.service';
import { DiscoverEntrepreneursDto } from './dto/discover-entrepreneurs.dto';

@Controller('entrepreneurs')
export class EntrepreneursController {
  constructor(private readonly entrepreneursService: EntrepreneursService) {}

  /**
   * Discover entrepreneurs with filtering and pagination.
   * Excludes current user and users already connected with.
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  async discoverEntrepreneurs(
    @Request() req: { user: { userId: string } },
    @Query() query: DiscoverEntrepreneursDto,
  ) {
    const currentUserId = req.user.userId;
    return this.entrepreneursService.discoverEntrepreneurs(currentUserId, query);
  }
}
