export interface Sesion {
    payload: string;
    createdAt: Date | null;
    refreshAt: Date | null;
    expiresAt: Date | null;
  }