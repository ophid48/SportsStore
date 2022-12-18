import { Injectable } from '@angular/core';
import { ICreateUser, IUser } from './user/user.interface';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpAuthService {
  public user: IUser;
  apiBase = '/api/v1/users/login/';

  constructor(private readonly http: HttpClient) {
    const data = window.localStorage.getItem('user');
    if (!data) return;

    const parsedData = JSON.parse(data);
    if (parsedData) this.user = parsedData;
  }

  login(login: string, pass: string): Observable<boolean> {
    return this.http
      .post<{
        login: string;
        password: string;
        user: IUser;
      }>(this.apiBase, {
        login: login,
        password: pass,
      })
      .pipe(
        map((res) => {
          if (res && res.user) {
            window.localStorage.setItem('user', JSON.stringify(res.user));
            this.user = res.user;
          }
          return !!res;
        })
      );
  }

  register(newUser: ICreateUser): Observable<boolean> {
    return this.http.post<IUser>('/api/v1/users/', newUser).pipe(
      map((res) => {
        if (res) {
          this.user = res;
          window.localStorage.setItem('user', res.toString());
        }
        return !!res;
      })
    );
  }
}
