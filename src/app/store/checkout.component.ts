import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderRepository } from '../model/order/order.repository';
import { Order } from '../model/order/order.model';
import { ICreateOrder } from '../model/order/order.interface';
import { IProduct } from '../model/product/product.model';
import { OrderService } from '../model/order/order.service';
import { CartLine } from '../model/cart/cart.model';

@Component({
  moduleId: module.id,
  templateUrl: 'checkout.component.html',
  styleUrls: ['checkout.component.scss'],
})
export class CheckoutComponent {
  orderSent: boolean = false;
  submitted: boolean = false;

  constructor(
    public repository: OrderRepository,
    private orderService: OrderService,
    public order: Order
  ) {}

  submitOrder(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      const data = form.value;

      const user_data = localStorage.getItem('user');
      const product_data = localStorage.getItem('cart');

      const userId: number = user_data ? JSON.parse(user_data).id : null;
      const products: number[] = product_data
        ? JSON.parse(product_data).map((p: CartLine) => p.product.id)
        : null;

      const newOrder: ICreateOrder = {
        address: data.address,
        city: data.city,
        country: data.country,
        zip: data.zip,
        statusid: 2,
        owner: userId,
        desc: data.zip,
        products: products,
      };
      console.log(newOrder);
      this.orderService.postOrder(newOrder).subscribe((order) => {
        this.order.clear();
        this.orderSent = true;
        this.submitted = false;
      });
    }
  }
}
