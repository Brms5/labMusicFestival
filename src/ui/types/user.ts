export interface LoggedUser {
  id: string;
  exp: number;
  iat: number;
  name: string;
  email: string;
  admin: boolean;
}
