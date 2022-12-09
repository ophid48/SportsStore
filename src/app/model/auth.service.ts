import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestDataSource } from './rest.datasource';
import { UserService } from './user/user.service';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(
    private datasource: RestDataSource,
    private userService: UserService
  ) {}

  authenticate(username: string, password: string): Observable<boolean> {
    return this.datasource.login(username, password).pipe(
      map((res) => {
        console.log(res);
        return res;
      })
    );
    // return this.datasource.authenticate(username, password);
  }

  get authenticated(): boolean {
    // return !!this.cookieService.getCookieByName('token');
    return !!this.datasource.access_token;
  }

  clear() {
    this.datasource.access_token = null;
  }
}
