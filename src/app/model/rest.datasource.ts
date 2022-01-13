import {Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Product } from "./product.model";
/*import { Cart } from "./cart.model";*/
import { Order } from "./order.model";
import "rxjs/add/operator/map";

const PROTOCOL = "http";
const PORT = 3500;

@Injectable()
export class RestDataSource {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }

  getProducts(): Observable<Product | Order> {
/*    return this.sendRequest(HttpClient.get, "products");*/
    return this.http.get<Product>(this.baseUrl + "products");
  }

  saveOrder(order: Order): Observable<Order> {
 /*   return this.sendRequest(this.http.post("orders"), "orders", order);*/
    return this.http.post<Order>(this.baseUrl + "orders", order)
  }

/*  private sendRequest(verb: HttpClient,
                      url: string, body?: Product | Order): Observable<Product | Order> {
    return this.http.request(new Request({
      method: verb,
      url: this.baseUrl + url,
      body: body
    })).map(response => response.json());
  }*/
}
