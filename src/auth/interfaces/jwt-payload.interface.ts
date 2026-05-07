export interface JwtPayload {
  sub: string;
  email: string;
  email_verified: boolean;
  iat?: number;
  exp?: number;
}
