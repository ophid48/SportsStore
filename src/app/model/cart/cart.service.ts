import { Injectable } from '@angular/core';
import { IProduct } from '../product/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartProducts$: BehaviorSubject<IProduct[] | null> =
    new BehaviorSubject<IProduct[] | null>(null);

  constructor() {}
}
