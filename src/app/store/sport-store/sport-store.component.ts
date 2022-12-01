import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../model/category/category.service';
import { BehaviorSubject } from 'rxjs';
import { ICategory } from '../../model/category/category.interface';
import { ProductService } from '../../model/product/product.service';
import { IProduct } from '../../model/product/product.model';
import { CartService } from '../../model/cart/cart.service';
import { Cart } from '../../model/cart/cart.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sport-store',
  templateUrl: './sport-store.component.html',
  styleUrls: ['./sport-store.component.scss'],
})
export class SportStoreComponent implements OnInit {
  searchText = '';

  categories$: BehaviorSubject<ICategory[] | null> = new BehaviorSubject<
    ICategory[] | null
  >(null);

  selectCategory$: BehaviorSubject<number | null> = new BehaviorSubject<
    number | null
  >(null);

  products$: BehaviorSubject<IProduct[] | null> = new BehaviorSubject<
    IProduct[] | null
  >(null);
  filteredProducts$: BehaviorSubject<IProduct[] | null> = new BehaviorSubject<
    IProduct[] | null
  >(null);

  cartProducts$: BehaviorSubject<IProduct[] | null> = new BehaviorSubject<
    IProduct[] | null
  >(null);
  to: number;
  from: number;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    public cartService: CartService,
    private cart: Cart,
    public router: Router
  ) {
    this.categoryService
      .getAll()
      .subscribe((res) => this.categories$.next(res));
    this.productService
      .getJoinedProduct()
      .subscribe((res) => this.products$.next(res));
    this.cartService.cartProducts$.subscribe((res) =>
      this.cartProducts$.next(res)
    );
  }

  selectCategory(id: number) {
    this.selectCategory$.next(id);
  }

  getProducts() {}

  ngOnInit(): void {}

  addToCart(product: IProduct, quantity: number = 1) {
    const oldData = this.cartService.cartProducts$.value ?? [];

    this.cart.addLine(product, quantity);

    this.cartService.cartProducts$.next([...oldData, product]);
  }

  removeFromCart(product: IProduct) {
    this.cart.removeLine(product.id);
  }

  log(cart: IProduct[]) {
    console.log(cart);
  }

  checkCart(id: number) {
    return this.cart.lines.find((f) => f.product.id === id);
    // return cart.length > 0 && cart.find((f) => f.id === id);
  }

  filterByCategory(category: ICategory) {
    console.log(this.selectCategory$.value || this.searchText !== '');
    let oldData: any[];
    if (this.selectCategory$.value) {
      oldData = this.products$.value ?? [];
      if (this.searchText !== '') {
        if (this.from && this.to) {
          oldData = oldData.filter((f) => {
            return (
              f.category.category_name === category.category_name &&
              f.product_name
                .toLowerCase()
                .includes(this.searchText.toLowerCase()) &&
              f.price > this.from &&
              f.price < this.to
            );
          });
        } else {
          oldData = oldData.filter((f) => {
            return (
              f.category.category_name === category.category_name &&
              f.product_name
                .toLowerCase()
                .includes(this.searchText.toLowerCase())
            );
          });
        }
      } else {
        oldData = (this.products$.value ?? []).filter((f) => {
          return f.category.category_name === category.category_name;
        });
      }
    } else {
      oldData = (this.products$.value ?? []).filter((f) => {
        return f.category.category_name === category.category_name;
      });
    }

    this.selectCategory$.next(category.id);

    this.filteredProducts$.next([...oldData]);
  }

  changeHandlerEvent() {
    let oldData: any[] = [];

    if (this.selectCategory$.value && this.searchText !== '') {
      oldData = this.filteredProducts$.value ?? [];
    } else {
      oldData = this.products$.value ?? [];
    }

    // this.selectCategory$.value || this.searchText !== ''
    //   ? this.filteredProducts$.value ?? []
    //   : this.products$.value ?? [];
    this.filteredProducts$.next(
      oldData?.filter((f) =>
        f.product_name.toLowerCase().includes(this.searchText.toLowerCase())
      )
    );
  }

  setPrice() {
    let oldData = this.products$.value ?? [];

    if (this.selectCategory$.value)
      oldData = oldData.filter(
        (f) => f.categoryId === this.selectCategory$.value
      );

    if (this.searchText)
      oldData = oldData.filter((f) =>
        f.product_name.toLowerCase().includes(this.searchText.toLowerCase())
      );

    oldData = oldData.filter((f) => {
      console.log(f, f.price > this.from && f.price < this.to);
      return f.price >= this.from && f.price <= this.to;
    });

    this.filteredProducts$.next(oldData);
  }

  getCount(id: number) {
    const q = this.cart.lines.find((f) => f.product.id === id)?.quantity;
    return q && q > 0 ? q : '';
  }
}
