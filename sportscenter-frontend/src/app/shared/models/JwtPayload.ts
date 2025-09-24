export interface JwtPayload {
  id: number;
  sub: string;
  iat: number;
  exp: number;
  roles?: string[]; // tableau de rôles si tu stockes plusieurs rôles
  role?: string;    // ou string unique si tu stockes un seul rôle
}
