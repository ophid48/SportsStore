import {
  AfterViewChecked,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

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
import { UserService } from '../../../model/user/user.service';
import { IUser } from '../../../model/user/user.interface';

@Component({
  selector: 'app-order-edit',
  styleUrls: ['orderEditor.component.scss'],
  templateUrl: 'orderEditor.component.html',
})
export class OrderEditorComponent implements AfterViewChecked {
  @Input() isEdit: boolean = false;
  @Input() order: IOrder | null;

  @Output() closeEditor = new EventEmitter<void | IOrder>();

  public orderForm: FormGroup;
  public userControl: FormControl = new FormControl(
    undefined,
    Validators.required
  );
  public courierControl: FormControl = new FormControl(
    undefined,
    Validators.required
  );

  statuses$: BehaviorSubject<IStatus[] | null> = new BehaviorSubject<
    IStatus[] | null
  >(null);
  categories$: BehaviorSubject<IStatus[] | null> = new BehaviorSubject<
    IStatus[] | null
  >(null);
  couriers$: BehaviorSubject<IUser[] | null> = new BehaviorSubject<
    IUser[] | null
  >(null);
  users$: BehaviorSubject<IUser[] | null> = new BehaviorSubject<IUser[] | null>(
    null
  );

  closeEdit(order?: IOrder) {
    this.closeEditor.emit(order);
  }

  constructor(
    private orderService: OrderService,
    private fb: FormBuilder,
    private statusService: StatusService,
    private userService: UserService
  ) {
    this.statusService.getAll().subscribe((res) => this.statuses$.next(res));
    this.userService.getAll().subscribe((res) => {
      console.log(res);
      this.couriers$.next(res.filter((f) => f.role.role_name === 'Курьер'));
      this.users$.next(
        res.filter((f) => ['Админ', 'Пользователь'].includes(f.role.role_name))
      );
    });
  }

  ngAfterViewChecked(): void {
    // console.log(this.orderForm.value);
  }

  save() {
    const data = this.orderForm.value;
    const owner = this.userControl.value;
    const courier = this.courierControl.value;
    const newProduct: ICreateOrder = {
      address: data.address,
      city: data.city,
      country: data.country,
      zip: data.zip,
      statusid: data.status_id,
      owner: owner,
      courier: courier,
      desc: data.desc,
    };

    if (this.isEdit && this.order) {
      this.orderService
        .patchOrder(newProduct, this.order.id)
        .subscribe((res) => {
          this.closeEdit(res);
        });
    } else
      this.orderService.postOrder(newProduct).subscribe((res) => {
        this.closeEdit(res);
      });
  }

  ngOnInit(): void {
    if (this.order) {
      console.log(this.order.users);
      const courier =
        this.order.users.filter((f) => f.role.role_name === 'Курьер').length > 0
          ? this.order.users.filter((f) => f.role.role_name === 'Курьер')[0].id
          : '';
      const owner =
        this.order.users.filter((f) =>
          ['Админ', 'Пользователь'].includes(f.role.role_name)
        ).length > 0
          ? this.order.users.filter((f) =>
              ['Админ', 'Пользователь'].includes(f.role.role_name)
            )[0].id
          : '';
      this.userControl.setValue(owner);
      this.courierControl.setValue(courier);
    }

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
      desc: new FormControl({ value: this.order?.desc, disabled: false }),
      status_id: new FormControl(
        { value: this.order?.statusid, disabled: false },
        Validators.required
      ),
    });
  }

  getUserId() {
    const test = this.order?.users.find((f) =>
      ['Админ', 'Пользователь'].includes(f.role.role_name)
    )?.id;
    return test;
  }

  public objectComparisonFunction = function (
    option: any,
    value: any
  ): boolean {
    if (value && option) return option.id === value.id;
    return false;
  };

  checkValid(control: string) {
    if (control === 'owner') return this.userControl.valid;
    if (control === 'courier') return this.courierControl.valid;
    return this.orderForm.controls[control].valid;
  }
}
