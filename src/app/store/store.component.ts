import { Component } from "@angular/core";
import { Product } from "../model/product.model";
import { ProductRepository } from "../model/product.repository";

@Component({
  selector: "store",
  moduleId: module.id,
  templateUrl: "store.component.html"
})
export class StoreComponent {
  public selectedCategory = null;

  constructor(private repository: ProductRepository) { }

  get products(): Product[] {
    // @ts-ignore
    return this.repository.getProducts(this.selectedCategory);
  }

  get categories(): string[] {
    return this.repository.getCategories();
  }

  changeCategory(newCategory?: string){
    // @ts-ignore
    this.selectedCategory = newCategory;
  }
}
