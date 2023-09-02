export interface CreateUser {
  name: string;
  email: string;
  password: string;
  admin: boolean;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface LoggedUserResponse {
  id: string;
  name: string;
  email: string;
  admin: boolean;
}
