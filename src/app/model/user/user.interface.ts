export interface IUser {
  id: number;
  first_name: string;
  login: string;
  password: string;
  last_name?: string;
}

export interface IToken {
  access_token: string;
  refresh_token: string;
}

export interface ICreateUser {
  first_name: string;
  login: string;
  password: string;
  last_name?: string;
}

export class User {
  constructor(
    public first_name?: string,
    public login?: string,
    public password?: string,
    public id?: string,
    public last_name?: string
  ) {}
}
