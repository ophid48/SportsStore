import { Injectable } from '@angular/core';
import { HttpBase } from '../httpbase/http-base.service';
import { HttpClient } from '@angular/common/http';
import { MyCookieService } from '../cookie/my-cookie.service';
import { IProduct } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends HttpBase<IProduct> {
  constructor(http: HttpClient, cookieService: MyCookieService) {
    super(http, '/api/v1/products', cookieService);
  }
}
