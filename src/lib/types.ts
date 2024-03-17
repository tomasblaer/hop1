export type JWTUser = {
  id?: number;
  username: string;
  companyId: number;
  admin: boolean;
  iat?: number;
};