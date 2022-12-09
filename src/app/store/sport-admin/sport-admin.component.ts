import { Component, OnInit } from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../../model/product/product.model';
import { ProductService } from '../../model/product/product.service';

@Component({
  selector: 'app-sport-admin',
  templateUrl: './sport-admin.component.html',
  styleUrls: ['./sport-admin.component.scss'],
})
export class SportAdminComponent implements OnInit {
  mode: 'Product' | 'Order' | 'User' = 'Product';

  ngOnInit(): void {}
}
