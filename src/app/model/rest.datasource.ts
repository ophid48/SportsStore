import {Injectable} from "@angular/core";
import {HttpClient, HttpRequest} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Product } from "./product.model";
/*import { Cart } from "./cart.model";*/
import { Order } from "./order.model";
import "rxjs/add/operator/map";
import {from as observableFrom, observable} from "rxjs";
import * as url from "url";
import {map} from "rxjs/operators";

const PROTOCOL = "http";
const PORT = 3500;

@Injectable()
export class RestDataSource {
  baseUrl: string;
  auth_token: any;

  constructor(private http: HttpClient) {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }

  authenticate(user: string, pass: string): Observable<boolean> {
    return this.http.post<any>(this.baseUrl + "login", {
      name: user, password: pass
    }).pipe(map(response => {
      this.auth_token = response.success ? response.token : null;
      return response.success;
    }))
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + "products");
  }

  saveOrder(order: Order): Observable<Order>{
    return this.http.post<Order>(this.baseUrl + "orders", order)
  }
}
