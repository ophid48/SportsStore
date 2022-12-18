import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { IProduct, IProductBase } from '../../../model/product/product.model';
import { BehaviorSubject } from 'rxjs';
import { ICategory } from '../../../model/category/category.interface';
import { ProductService } from '../../../model/product/product.service';
import { CategoryService } from '../../../model/category/category.service';
import { ICreateOrder, IOrder } from '../../../model/order/order.interface';
import { OrderService } from '../../../model/order/order.service';
import { StatusService } from '../../../model/status/status.service';
import { IStatus } from '../../../model/status/status.interface';

@Component({
  selector: 'app-order-edit',
  styleUrls: ['orderEditor.component.scss'],
  templateUrl: 'orderEditor.component.html',
})
export class OrderEditorComponent {
  @Input() isEdit: boolean = false;
  @Input() order: IOrder | null;

  @Output() closeEditor = new EventEmitter<void | IOrder>();

  public orderForm: FormGroup;

  statuses$: BehaviorSubject<IStatus[] | null> = new BehaviorSubject<
    IStatus[] | null
  >(null);
  categories$: BehaviorSubject<IStatus[] | null> = new BehaviorSubject<
    IStatus[] | null
  >(null);

  closeEdit(order?: IOrder) {
    this.closeEditor.emit(order);
  }

  constructor(
    private orderService: OrderService,
    private fb: FormBuilder,
    private statusService: StatusService
  ) {
    this.statusService.getAll().subscribe((res) => this.statuses$.next(res));
  }

  save() {
    // const data = this.productForm.value;
    // const newProduct: ICreateOrder = {
    //   product_name: data.product_name,
    //   description: data.description,
    //   price: data.price,
    //   material: data.material,
    //   size: data.size,
    //   weight: data.weight,
    //   categoryId: data.categoryId,
    // };
    //
    // if (this.isEdit && this.order) {
    //   this.orderService.putById(newProduct, this.order.id).subscribe((res) => {
    //     this.closeEdit(res);
    //   });
    // } else
    //   this.orderService.postProduct(newProduct).subscribe((res) => {
    //     this.closeEdit(res);
    //   });
  }

  ngOnInit(): void {
    console.log(this.order);
    this.orderForm = this.fb.group({
      address: new FormControl(
        { value: this.order?.address, disabled: false },
        Validators.required
      ),
      city: new FormControl(
        { value: this.order?.city, disabled: false },
        Validators.required
      ),
      country: new FormControl(
        { value: this.order?.country, disabled: false },
        Validators.required
      ),
      zip: new FormControl(
        { value: this.order?.zip, disabled: false },
        Validators.required
      ),
      desc: new FormControl(
        { value: this.order?.desc, disabled: false },
        Validators.required
      ),
      status_id: new FormControl(
        { value: this.order?.statusid, disabled: false },
        Validators.required
      ),
    });
  }

  checkValid(control: string) {
    return this.orderForm.controls[control].valid;
  }
}
