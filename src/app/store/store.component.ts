import { Component } from "@angular/core";
import { Product } from "../model/product/product.model";
import { ProductRepository } from "../model/product/product.repository";
import { Cart } from "../model/cart/cart.model";
import {Router} from "@angular/router";

@Component({
  selector: "store",
  moduleId: module.id,
  templateUrl: "store.component.html"
})
export class StoreComponent {
  public selectedCategory = null;
  public productsPerPage = 4;
  public selectedPage = 1;

  constructor(private repository: ProductRepository,
              private cart: Cart,
              private router: Router) { }

  get products(): Product[] {
    // @ts-ignore
    let pageIndex = (this.selectedPage - 1) * this.productsPerPage;
    // @ts-ignore
    return this.repository.getProducts(this.selectedCategory)
      .slice(pageIndex, pageIndex + this.productsPerPage);
  }

  get categories(): string[] {
    return this.repository.getCategories();
  }

  changeCategory(newCategory?: string){
    // @ts-ignore
    this.selectedCategory = newCategory;
  }

  changePage(newPage: number){
    this.selectedPage = newPage;
  }

  changePageSize(newSize: number){
    this.productsPerPage = Number(newSize);
    this.changePage(1);
  }

  get pageCount(): number {

    return Math.ceil(this.repository
      // @ts-ignore
      .getProducts(this.selectedCategory).length / this.productsPerPage)
  }

  addProductToCart(product: Product){
    this.cart.addLine(product);
/*    this.router.navigateByUrl("/cart")/!*.then(r => alert(r))*!/;*/
  }
/*  get pageNumbers(): number[] {

    return Array(Math.ceil(this.repository
      // @ts-ignore
      .getProducts(this.selectedCategory).length / this.productsPerPage))
        .fill(0).map((x, i) => i + 1);
  }*/
}
