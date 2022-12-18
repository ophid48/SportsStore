import { Component } from '@angular/core';
import { OrderRepository } from 'src/app/model/order/order.repository';
import { Order } from 'src/app/model/order/order.model';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../../../model/user/user.interface';
import { UserService } from '../../../model/user/user.service';
import { IOrder } from '../../../model/order/order.interface';
import { OrderService } from '../../../model/order/order.service';

@Component({
  selector: 'app-order-table',
  styleUrls: ['orderTable.component.scss'],
  templateUrl: 'orderTable.component.html',
})
export class OrderTableComponent {
  isOpen: boolean = false;
  isEdit: boolean = false;
  orders$: BehaviorSubject<IOrder[] | null> = new BehaviorSubject<
    IOrder[] | null
  >(null);
  order$: BehaviorSubject<IOrder | null> = new BehaviorSubject<IOrder | null>(
    null
  );
  constructor(private orderService: OrderService) {
    this.orderService.getAll().subscribe((res) => this.orders$.next(res));
  }

  deleteProduct(id: number) {
    this.orderService.deleteById(id).subscribe(() => {
      const oldData = this.orders$.value ?? [];

      this.orders$.next([...oldData.filter((f) => f.id !== id)]);
    });
  }

  closeEditor(order: void | IOrder) {
    if (order) {
      const oldData = this.orders$.value ?? [];
      this.orders$.next([...oldData.filter((f) => f.id !== order.id), order]);
    }

    this.order$.next(null);
    this.isEdit = false;
    this.isOpen = false;
  }

  getManager(o: IOrder) {
    const manager = o.users.filter((f) => f.role.role_name === 'Менеджер');

    return manager[0] ? manager[0].first_name + manager[0].last_name : '';
  }

  getProducts(o: IOrder) {
    return o.products.map((p) => p.product_name).toString();
  }

  getPrice(o: IOrder) {
    return o.products.reduce((accum, next) => accum + next.price, 0);
  }
}
