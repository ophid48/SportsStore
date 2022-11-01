import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpBase } from '../httpbase/http-base.service';
import { MyCookieService } from '../cookie/my-cookie.service';
import { IOrder } from './order.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends HttpBase<IOrder> {
  constructor(http: HttpClient, cookieService: MyCookieService) {
    const apiBase = 'api/v1/orders/';
    super(http, apiBase, cookieService);
  }
}
