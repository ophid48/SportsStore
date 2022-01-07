import { Injectable } from "@angular/core";
import { Product } from "./product.model";
import { StaticDataSource } from "./static.datasourse";

@Injectable()
export class ProductRepository {
  private products: Product[] = [];
  private categories: (string)[] = [];

  constructor(private dataSource: StaticDataSource) {
    dataSource.getProducts().subscribe(data => {
      this.products = data;
      // @ts-ignore
      this.categories = data.map(p => p.category)
        .filter((c, index, array) => array.indexOf(c) == index).sort();
    });
  }
//  : string = null было
  // @ts-ignore
  getProducts(category: string = null): Product[] {
    return this.products
      .filter(p => category == null || category == p.category);
  }

  getProduct(id: number): Product {
    return <Product>this.products.find(p => p.id == id);
  }

  getCategories(): (string )[] {
    // @ts-ignore
    return this.categories;
  }
}
