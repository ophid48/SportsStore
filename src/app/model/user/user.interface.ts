export interface IUser {
  id: number;
  first_name: string;
  login: string;
  password: string;

  number: string;
  email: string;
  address: string;
  role: {
    id: string;
    role_name: string;
  };
  last_name?: string;
  avatar?: string;
  wallpaper?: string;
}

export interface IToken {
  access_token: string;
  refresh_token: string;
}

export interface ICreateUser {
  first_name: string;
  login: string;
  password: string;

  number: string;
  email: string;
  address: string;
  role_id: number;
  last_name?: string;
  avatar?: string;
  wallpaper?: string;
}

export class User {
  constructor(
    public first_name?: string,
    public login?: string,
    public password?: string,
    public user_id?: string,
    public last_name?: string
  ) {}
}
