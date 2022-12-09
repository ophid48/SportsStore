import { Component } from '@angular/core';
import { ProductRepository } from '../../../model/product/product.repository';
import { IProduct, Product } from '../../../model/product/product.model';
import { BehaviorSubject } from 'rxjs';
import { ProductService } from '../../../model/product/product.service';
import { IUser } from '../../../model/user/user.interface';
import { UserService } from '../../../model/user/user.service';

@Component({
  selector: 'app-user-table',
  styleUrls: ['userTable.component.scss'],
  templateUrl: 'userTable.component.html',
})
export class UserTableComponent {
  isOpen: boolean = false;
  isEdit: boolean = false;
  users$: BehaviorSubject<IUser[] | null> = new BehaviorSubject<IUser[] | null>(
    null
  );
  user$: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(
    null
  );
  constructor(private userService: UserService) {
    this.userService.getAll().subscribe((res) => this.users$.next(res));
  }

  deleteProduct(id: number) {
    this.userService.deleteById(id).subscribe(() => {
      const oldData = this.users$.value ?? [];

      this.users$.next([...oldData.filter((f) => f.id !== id)]);
    });
  }

  closeEditor(product: void | IUser) {
    if (product) {
      const oldData = this.users$.value ?? [];
      this.users$.next([
        ...oldData.filter((f) => f.id !== product.id),
        product,
      ]);
    }

    this.user$.next(null);
    this.isEdit = false;
    this.isOpen = false;
  }
}
