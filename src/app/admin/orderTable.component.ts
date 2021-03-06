import { Component } from "@angular/core";
import {OrderRepository} from "../model/order.repository";
import {Order} from "../model/order.model";

@Component({
  templateUrl: 'orderTable.component.html'
})
export class OrderTableComponent {
  includeShipped: boolean = false;

  constructor(private repository: OrderRepository) {
  }

  getOrders(): Order[] {
    return this.repository.getOrders()
      .filter(o => this.includeShipped || !o.shipped);
  }

  markShipped(order: Order) {
    order.shipped = !order.shipped;
    this.repository.updateOrder(order);
  }

  delete(id: number| null) {
    this.repository.deleteOrder(id!);
  }
}
