import { SkillType, SeekingTypeValue } from './create-profile.dto';

export interface ProfileResponseDto {
  id: string;
  userId: string;
  email: string;
  headline: string;
  bio: string;
  skills: SkillType[];
  seeking: SeekingTypeValue[];
  location?: {
    city?: string;
    country?: string;
  };
  photoUrl?: string;
  photoKey?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PublicProfileResponseDto {
  id: string;
  headline: string;
  bio: string;
  skills: SkillType[];
  seeking: SeekingTypeValue[];
  location?: {
    city?: string;
    country?: string;
  };
  photoUrl?: string;
  createdAt: Date;
}
