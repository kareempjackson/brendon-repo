import {
  IsString,
  IsArray,
  IsOptional,
  MaxLength,
  ArrayMinSize,
  ArrayMaxSize,
  IsEnum,
  ValidateNested,
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Skill, SeekingType } from '@prisma/client';
import { LocationDto } from './create-profile.dto';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  headline?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  bio?: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @IsEnum(Skill, { each: true })
  skills?: Skill[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @IsEnum(SeekingType, { each: true })
  seeking?: SeekingType[];

  @IsOptional()
  @ValidateNested()
  @Type(() => LocationDto)
  location?: LocationDto;

  @IsOptional()
  @IsUrl()
  photoUrl?: string;
}
