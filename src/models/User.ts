export interface User {
  id: number;
  firstName: string;
  lastName: string;
  user: string;
  password: string;
  remember?: boolean;
  isAdmin: boolean;
  jwtToken?: string;
  refreshTokens: string[];
}
