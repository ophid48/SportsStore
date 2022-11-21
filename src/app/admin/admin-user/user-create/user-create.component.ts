import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUser } from '../../../model/user/user.interface';
import { UserService } from '../../../model/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent implements OnInit {
  @Input() isEdit: boolean = false;
  @Input() user: IUser;
  @Output() closeEditor = new EventEmitter<void>();

  private userForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    activateRoute: ActivatedRoute,
    public fb: FormBuilder
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
      this.userService.patchById(this.user, this.user.user_id).subscribe({
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
