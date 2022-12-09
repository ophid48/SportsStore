import { Injectable } from '@angular/core';
import { HttpBase } from '../httpbase/http-base.service';
import { HttpClient } from '@angular/common/http';
import { IProduct, IProductBase } from './product.model';

export class ProductService extends HttpBase<IProduct> {
  constructor(
    private readonly http: HttpClient,
    private readonly path = '/api/v1/products'
  ) {
    super(http, path);
  }

  postProduct(product: IProductBase) {
    return this.http.post<IProduct>(this.path, product);
  }
}
