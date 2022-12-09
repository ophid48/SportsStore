import { Component, OnInit } from '@angular/core';
import { ProductRepository } from '../../../model/product/product.repository';
import { IProduct, Product } from '../../../model/product/product.model';
import { BehaviorSubject } from 'rxjs';
import { ProductService } from '../../../model/product/product.service';

@Component({
  selector: 'app-product-table',
  styleUrls: ['productTable.component.scss'],
  templateUrl: 'productTable.component.html',
})
export class ProductTableComponent implements OnInit {
  isOpen: boolean = false;
  isEdit: boolean = false;
  products$: BehaviorSubject<IProduct[] | null> = new BehaviorSubject<
    IProduct[] | null
  >(null);
  product$: BehaviorSubject<IProduct | null> =
    new BehaviorSubject<IProduct | null>(null);
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService
      .getJoinedProduct()
      .subscribe((res) => this.products$.next(res));
  }

  deleteProduct(id: number) {
    this.productService.deleteById(id).subscribe(() => {
      const oldData = this.products$.value ?? [];

      this.products$.next([...oldData.filter((f) => f.id !== id)]);
    });
  }

  closeEditor(product: void | IProduct) {
    if (product) {
      const oldData = this.products$.value ?? [];
      this.products$.next([
        ...oldData.filter((f) => f.id !== product.id),
        product,
      ]);
    }

    this.product$.next(null);
    this.isEdit = false;
    this.isOpen = false;
  }
}
