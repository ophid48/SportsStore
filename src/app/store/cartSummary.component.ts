import {Component} from "@angular/core";
import {Cart} from "../model/cart/cart.model";

@Component({
  selector: "card-summary",
  moduleId: module.id,
  templateUrl: "cartSummary.component.html"
})
export class CartSummaryComponent {

  constructor(public cart: Cart) {}
}
