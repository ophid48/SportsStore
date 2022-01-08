import { NgModule } from "@angular/core";
import { ProductRepository } from "./product.repository";
import { StaticDataSource } from "./static.datasourse";
import { Cart } from "./cart.model";

@NgModule({
  providers: [ProductRepository, StaticDataSource, Cart]
})
export class ModelModule { }
