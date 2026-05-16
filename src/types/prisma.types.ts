import { User, Profile, Connection, ConnectionStatus } from '@prisma/client';

/** User with their profile included */
export type UserWithProfile = User & {
  profile: Profile | null;
};

/** Profile with user data included */
export type ProfileWithUser = Profile & {
  user: User;
};

/** Connection with both users included */
export type ConnectionWithUsers = Connection & {
  requester: User;
  recipient: User;
};

/** Connection with full profiles */
export type ConnectionWithProfiles = Connection & {
  requester: UserWithProfile;
  recipient: UserWithProfile;
};

/** Filters for searching profiles */
export interface ProfileSearchFilters {
  skills?: string[];
  seeking?: string[];
  location?: string;
}

/** Re-export enums for convenience */
export { ConnectionStatus };
