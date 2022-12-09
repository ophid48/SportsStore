import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpBase } from '../httpbase/http-base.service';
import { ICreateUser, IUser } from './user.interface';
import { MyCookieService } from '../cookie/my-cookie.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICreateOrder } from '../order/order.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService extends HttpBase<IUser> {
  public isOpen = false;
  public isEdit = false;

  constructor(private http: HttpClient) {
    const apiBase = 'api/v1/users';
    super(http, apiBase);
  }

  getAll(): Observable<IUser[]> {
    return super.getAll().pipe(
      map((users) => {
        users.forEach((u) => (u.password = ''));
        return users;
      })
    );
  }

  create(user: ICreateUser): Observable<IUser> {
    return this.http.post<IUser>(this.apiBase, user);
  }
}
