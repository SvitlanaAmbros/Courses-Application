export interface UserName {
  firstName: string;
  lastName: string;
}

export interface LoginUser {
    id?: string;
    login: string;
    password: string;
    token?: string;
    name?: UserName;
}

export interface AuthResponse {
  token: string;
}

