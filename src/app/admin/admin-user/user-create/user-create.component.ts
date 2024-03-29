import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUser } from '../../../model/user/user.interface';
import { UserService } from '../../../model/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { CategoryService } from '../../../model/category/category.service';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../../../model/product/product.model';
import { ICategory } from '../../../model/category/category.interface';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent implements OnInit {
  @Input() isEdit: boolean = false;
  @Input() user: IUser;
  @Output() closeEditor = new EventEmitter<void>();

  categories$: BehaviorSubject<ICategory[] | null> = new BehaviorSubject<
    ICategory[] | null
  >(null);

  private userForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    activateRoute: ActivatedRoute,
    public fb: FormBuilder,
    public categoryService: CategoryService
  ) {
    if (!this.isEdit) {
      this.user = {
        user_id: 0,
        last_name: '',
        first_name: '',
        login: '',
        password: '',
      };
    }
  }

  ngOnInit(): void {}

  save(form: NgForm) {
    if (this.isEdit && this.user) {
      this.userService.patchById(this.user, this.user.id).subscribe({
        next: (res) => {
          console.log(res);
          this.closeEditor.emit();
        },
        error: (e) => console.log(e.statusText),
      });
    } else if (this.user) {
      this.userService.post(this.user).subscribe({
        next: (res) => {
          console.log(res);
          this.closeEditor.emit();
        },
        error: (e) => console.log(e.statusText),
      });
    }
  }
}
