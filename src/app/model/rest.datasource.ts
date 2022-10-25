import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product/product.model';
import { Order } from './order/order.model';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { IToken } from './user/user.interface';

const PROTOCOL = 'http';
const PORT = 3500;

@Injectable()
export class RestDataSource {
  baseUrl: string;
  baseUrlv2: string;
  auth_token: any;

  access_token: string | null = null;
  refresh_token: string | null = null;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.baseUrlv2 = `/api/v1/`;
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }

  authenticate(user: string, pass: string): Observable<boolean> {
    return this.http
      .post<any>(this.baseUrl + 'login', {
        name: user,
        password: pass,
      })
      .pipe(
        map((response) => {
          this.auth_token = response.success ? response.token : null;
          return response.success;
        })
      );
  }

  login(login: string, pass: string): Observable<boolean> {
    return this.http
      .post<IToken>(
        this.baseUrlv2 + 'login',
        {
          login: login,
          password: pass,
        },
        this.getOptions()
      )
      .pipe(
        map((response) => {
          if (response.access_token && response.refresh_token) {
            this.cookieService.set(
              'token',
              `{"access_token": "${response.access_token}","refresh_token": "${response.refresh_token}"}`
            );
            this.access_token = response.access_token;
            this.refresh_token = response.refresh_token;
            console.log(this.cookieService.get('token'));
            return true;
          }
          return false;
        })
      );
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrlv2 + 'products');
  }

  saveOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.baseUrl + 'orders', order);
  }

  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(
      this.baseUrl + 'products',
      product,
      this.getOptions()
    );
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(
      `${this.baseUrl}products/${product.id}`,
      product,
      this.getOptions()
    );
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(
      `${this.baseUrl}products/${id}`,
      this.getOptions()
    );
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl + 'orders', this.getOptions());
  }

  deleteOrder(id: number): Observable<Order> {
    return this.http.delete<Order>(
      `${this.baseUrl}orders/${id}`,
      this.getOptions()
    );
  }

  updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(
      `${this.baseUrl}orders/${order.id}`,
      order,
      this.getOptions()
    );
  }

  private getOptions() {
    console.log('"Authorization": ', `Bearer <${this.access_token}>`);
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer <${this.access_token}>`,
      }),
    };
  }
}
