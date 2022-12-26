import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../model/order/order.service';
import { IOrder } from '../../../model/order/order.interface';
import { IUser } from '../../../model/user/user.interface';

@Component({
  selector: 'app-account-orders',
  templateUrl: './account-orders.component.html',
  styleUrls: ['./account-orders.component.scss'],
})
export class AccountOrdersComponent implements OnInit {
  orders: IOrder[];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    const user_data = localStorage.getItem('user');
    const user: IUser = JSON.parse(user_data!);
    this.orderService.getAll().subscribe((res) => {
      this.orders = res.filter((f) => f.users.some((u) => u.id === user.id));
    });
  }

  get Orders() {
    return this.orders;
  }

  getTotalPrice(order: IOrder) {
    const prices = order.products.map((p) => p.price);
    return (
      prices
        .reduce(function (sum, elem) {
          return sum + elem;
        }, 0)
        .toFixed(2) + ' ₽'
    );
  }

  getUser(o: IOrder) {
    const user_data: IUser = o.users.filter(
      (f) => f.role.role_name !== 'Курьер'
    )[0];

    return user_data;
  }
}
