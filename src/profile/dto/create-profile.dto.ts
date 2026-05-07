import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsOptional,
  MaxLength,
  ArrayMinSize,
  ArrayMaxSize,
  IsEnum,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Skill, SeekingType } from '@prisma/client';

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
  @IsEnum(Skill, { each: true })
  skills: Skill[];

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @IsEnum(SeekingType, { each: true })
  seeking: SeekingType[];

  @IsOptional()
  @ValidateNested()
  @Type(() => LocationDto)
  location?: LocationDto;
}
