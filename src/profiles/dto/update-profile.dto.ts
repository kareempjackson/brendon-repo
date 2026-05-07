import { IsString, IsOptional, MaxLength, IsUrl, IsEnum, IsNotEmpty } from 'class-validator';

export enum StartupStage {
  IDEA = 'IDEA',
  MVP = 'MVP',
  EARLY_TRACTION = 'EARLY_TRACTION',
  GROWTH = 'GROWTH',
  SCALE = 'SCALE',
}

export class UpdateProfileDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(500, { message: 'Bio must be at most 500 characters' })
  bio?: string;

  @IsOptional()
  @IsUrl({}, { message: 'LinkedIn URL must be a valid URL' })
  linkedin_url?: string;

  @IsOptional()
  @IsEnum(StartupStage, { message: 'Startup stage must be a valid value: IDEA, MVP, EARLY_TRACTION, GROWTH, SCALE' })
  startup_stage?: StartupStage;

  @IsOptional()
  @IsString()
  industry?: string;

  @IsOptional()
  @IsString()
  avatar_url?: string;
}
