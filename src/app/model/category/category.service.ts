import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpBase } from '../httpbase/http-base.service';
import { ICategory } from './category.interface';
import { MyCookieService } from '../cookie/my-cookie.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends HttpBase<ICategory> {
  constructor(http: HttpClient, cookieService: MyCookieService) {
    super(http, '/api/v1/category', cookieService);
  }
}
