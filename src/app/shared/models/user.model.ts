export interface User {
    id: string;
    firstName: string;
    lastName: string;
}

export interface LoginUser {
    login: string;
    password: string;
    token?: string;
}

