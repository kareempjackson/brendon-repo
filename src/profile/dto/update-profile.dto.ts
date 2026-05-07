import {
  IsString,
  MaxLength,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsEnum,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { VALID_SKILLS, VALID_SEEKING_TYPES, SkillType, SeekingTypeValue, LocationDto } from './create-profile.dto';

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
  @IsEnum(VALID_SKILLS, { each: true, message: 'Each skill must be a valid skill type' })
  skills?: SkillType[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @IsEnum(VALID_SEEKING_TYPES, { each: true, message: 'Each seeking type must be valid' })
  seeking?: SeekingTypeValue[];

  @IsOptional()
  @ValidateNested()
  @Type(() => LocationDto)
  location?: LocationDto;

  @IsOptional()
  @IsString()
  photoKey?: string;
}
