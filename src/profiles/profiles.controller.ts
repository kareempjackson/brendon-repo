import { Controller, Get, Put, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileResponseDto, PublicProfileResponseDto } from './dto/profile-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller()
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile/me')
  async getMyProfile(@Request() req: any): Promise<ProfileResponseDto> {
    return this.profilesService.getMyProfile(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile/me')
  async updateMyProfile(
    @Request() req: any,
    @Body() dto: UpdateProfileDto,
  ): Promise<ProfileResponseDto> {
    return this.profilesService.updateMyProfile(req.user.sub, dto);
  }

  @Get('profiles/:id')
  async getPublicProfile(@Param('id') id: string): Promise<PublicProfileResponseDto> {
    return this.profilesService.getPublicProfile(id);
  }
}
