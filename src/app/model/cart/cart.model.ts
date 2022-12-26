import { Injectable } from '@angular/core';
import { IProduct, Product } from '../product/product.model';

@Injectable({ providedIn: 'root' })
export class Cart {
  public lines: CartLine[] = [];
  public itemCount: number = 0;
  public cartPrice: number = 0;

  addLine(product: IProduct, quantity: number = 1) {
    let line = this.lines.find((line) => line.product.id == product.id);
    if (line && line.quantity === 1 && quantity < 0)
      this.removeLine(line.product.id);
    else if (line != undefined) line.quantity += quantity;
    else this.lines.push(new CartLine(product, quantity));
    this.recalculate();
  }

  updateQuantity(product: IProduct, quantity: number) {
    let line = this.lines.find((line) => line.product.id == product.id);
    if (line != undefined) line.quantity = Number(quantity);
    this.recalculate();
  }

  removeLine(id: number) {
    let index = this.lines.findIndex((line) => line.product.id == id);
    this.lines.splice(index, 1);
    this.recalculate();
  }

  clear() {
    this.lines = [];
    this.itemCount = 0;
    this.cartPrice = 0;
  }

  private recalculate() {
    this.itemCount = 0;
    this.cartPrice = 0;
    this.lines.forEach((l) => {
      this.itemCount += l.quantity;
      this.cartPrice += l.quantity * l.product.price;
    });

    localStorage.setItem('cart', JSON.stringify(this.lines));
  }
}

export class CartLine {
  constructor(public product: IProduct, public quantity: number) {}
  get lineTotal() {
    // @ts-ignore
    return this.quantity * this.product.price;
  }
}
