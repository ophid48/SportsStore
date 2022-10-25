import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpBase } from '../httpbase/http-base.service';
import { IUser } from './user.interface';
import { MyCookieService } from '../cookie/my-cookie.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends HttpBase<IUser> {
  constructor(http: HttpClient, cookieService: MyCookieService) {
    const apiBase = 'api/v1/users/';
    super(http, apiBase, cookieService);
  }
}
