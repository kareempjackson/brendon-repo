import { StartupStage } from './update-profile.dto';

export class ProfileResponseDto {
  id: string;
  user_id: string;
  name: string;
  bio: string | null;
  linkedin_url: string | null;
  startup_stage: StartupStage | null;
  industry: string | null;
  avatar_url: string | null;
  is_complete: boolean;
  created_at: Date;
  updated_at: Date;
}

export class PublicProfileResponseDto {
  id: string;
  name: string;
  bio: string | null;
  linkedin_url: string | null;
  startup_stage: StartupStage | null;
  industry: string | null;
  avatar_url: string | null;
}
