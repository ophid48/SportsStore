import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { IToken } from '../user/user.interface';

@Injectable({
  providedIn: 'root',
})
export class MyCookieService {
  constructor(private cookieService: CookieService) {}

  getCookieByName(name: string): IToken {
    return JSON.parse(this.cookieService.get(name));
  }

  clearCookies() {
    this.cookieService.deleteAll();
  }
}
