import {Injectable} from "@angular/core";
import {Cart} from "./cart.model";


@Injectable()
export class Order {
  public id: number | null | undefined;
  public name: string | null | undefined;
  public address: string | null | undefined;
  public city: string | null | undefined;
  public state: string | null | undefined;
  public zip: string | null | undefined;
  public country: string | null | undefined;
  public shipped: boolean | null | undefined = false;

  constructor(public cart: Cart) {
  }

  clear() {
    this.id = null;
    this.name = this.address = this.city = null;
    this.state = this.zip = this.country = null;
    this.shipped = false;
    this.cart.clear();
  }

}
