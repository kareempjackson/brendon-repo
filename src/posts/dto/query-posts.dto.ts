import { IsString, IsEnum, IsOptional, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { PostType, PostCategory } from '../enums/post.enums';

export class QueryPostsDto {
  @IsOptional()
  @IsEnum(PostType)
  type?: PostType;

  @IsOptional()
  @IsEnum(PostCategory)
  category?: PostCategory;

  @IsOptional()
  @IsString()
  industry?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset?: number = 0;
}
