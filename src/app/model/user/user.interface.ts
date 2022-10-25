export interface IUser {
  id: string;
  first_name: string;
  login: string;
  password: string;
  last_name?: string;
}

export interface IToken {
  access_token: string;
  refresh_token: string;
}
