import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsEnum,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export const VALID_SKILLS = [
  'FRONTEND_DEV',
  'BACKEND_DEV',
  'MOBILE_DEV',
  'UI_UX_DESIGN',
  'PRODUCT_MANAGEMENT',
  'MARKETING',
  'SALES',
  'FINANCE',
  'OPERATIONS',
  'DATA_SCIENCE',
  'MACHINE_LEARNING',
  'DEVOPS',
  'BLOCKCHAIN',
  'CYBERSECURITY',
  'LEGAL',
] as const;

export const VALID_SEEKING_TYPES = [
  'COFOUNDER',
  'INVESTOR',
  'MENTOR',
  'ADVISOR',
  'EMPLOYEE',
  'FREELANCER',
  'PARTNERSHIP',
  'NETWORKING',
] as const;

export type SkillType = (typeof VALID_SKILLS)[number];
export type SeekingTypeValue = (typeof VALID_SEEKING_TYPES)[number];

export class LocationDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  city?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  country?: string;
}

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  headline: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  bio: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @IsEnum(VALID_SKILLS, { each: true, message: 'Each skill must be a valid skill type' })
  skills: SkillType[];

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @IsEnum(VALID_SEEKING_TYPES, { each: true, message: 'Each seeking type must be valid' })
  seeking: SeekingTypeValue[];

  @IsOptional()
  @ValidateNested()
  @Type(() => LocationDto)
  location?: LocationDto;
}
