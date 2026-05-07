import { IsEnum, IsOptional } from 'class-validator';

export enum ConnectionStatusFilter {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export class ConnectionQueryDto {
  @IsOptional()
  @IsEnum(ConnectionStatusFilter)
  status?: ConnectionStatusFilter;
}
