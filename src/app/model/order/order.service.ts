import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpBase } from '../httpbase/http-base.service';
import { ICreateOrder, IOrder } from './order.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends HttpBase<IOrder> {
  constructor(private http: HttpClient) {
    const apiBase = 'api/v1/orders/';
    super(http, apiBase);
  }

  patchOrder(order: ICreateOrder, order_id: number): Observable<IOrder> {
    return this.http.patch<IOrder>(this.apiBase + order_id, order);
  }

  postOrder(order: ICreateOrder): Observable<IOrder> {
    return this.http.post<IOrder>(this.apiBase, order);
  }
}
